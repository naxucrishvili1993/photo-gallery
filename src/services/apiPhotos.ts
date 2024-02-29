import { FETCH_URL, UNSPLASH_ACCESS_KEY } from "../utils/constants";
import {
	extractFields,
	getImagesFromCache,
	updateStorage,
} from "../utils/helpers";
import { ICache, IPhoto } from "../utils/interfaces";

export async function apiPhotos({ topic }: { topic: string }) {
	const data: ICache | boolean = getImagesFromCache(topic);
	if (!data) {
		const res = await fetch(
			`${FETCH_URL}?query=${topic}&count=20&client_id=${UNSPLASH_ACCESS_KEY}`
		);
		const images: IPhoto[] = extractFields(await res.json());
		updateStorage({ topic, images });

		return images;
	}
	return data.value;
}

export async function getPopularPhotos() {
	const res = await fetch(
		`${FETCH_URL}?count=20&order_by=popular&client_id=${UNSPLASH_ACCESS_KEY}`
	);
	const images: IPhoto[] = await res.json();

	return images;
}
