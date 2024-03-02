import { RefObject } from "react";
import { ICache, IPhoto } from "./interfaces";

export function extractFields(images: IPhoto[]) {
	const newArr = images.map((image: IPhoto) => {
		const {
			id,
			likes,
			views,
			alt_description,
			width,
			downloads,
			height,
			urls: { raw, full },
		} = image;
		return {
			id,
			likes,
			views,
			alt_description,
			width,
			downloads,
			height,
			urls: { raw, full },
		};
	});
	return newArr;
}
export function getImagesFromCache(topic: string) {
	const cache: ICache[] | null = JSON.parse(
		localStorage.getItem("cache") || '""'
	);
	if (cache) {
		return cache.filter((item: ICache) => item.topic === topic)[0];
	}

	return false;
}

/**
 * ეს ფუნქცია ამოწმებს localStorage-ში თუ არის ამ თემასთან დაკავშირებული ფოტოები
 * თუ არ არის ამატებს.
 */
export function updateStorage({
	topic,
	images,
}: {
	topic: string;
	images: IPhoto[];
}) {
	const cache: ICache[] | null = JSON.parse(
		localStorage.getItem("cache") || '""'
	);
	if (cache) {
		const currentTopic = cache.filter((item) => item.topic === topic);
		if (!currentTopic.length) {
			const newCache = [...cache, { topic, value: images }];
			localStorage.setItem("cache", JSON.stringify(newCache));
		}
	} else {
		localStorage.setItem("cache", JSON.stringify([{ topic, value: images }]));
	}
}

export function handleScrollForSimulation(
	cb: () => void,
	isLoading: boolean,
	countRef: React.MutableRefObject<number>,
	elementRef: RefObject<HTMLUListElement> | null = null
) {
	if (!elementRef) {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		const bottom = scrollTop + clientHeight;
		if (bottom >= scrollHeight - 20 && !isLoading) {
			countRef.current++;
			if (countRef.current <= 1) {
				return cb();
			}
		}
		return;
	}

	const element = elementRef.current;
	if (!element) return;
	const { scrollTop, clientHeight, scrollHeight } = element;
	const bottom = scrollTop + clientHeight;
	if (bottom >= scrollHeight - 5 && !isLoading) {
		countRef.current++;
		if (countRef.current <= 1) {
			return cb();
		}
	}
	return;
}

export function simulateFetch({
	setState,
	cb,
	ref,
}: {
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	cb: () => void;
	ref: React.MutableRefObject<number>;
}) {
	setState(true);
	setTimeout(() => {
		cb();
		setState(false);
		ref.current = 0;
	}, 1000);
}

export const capitalizeFirstLetter = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
