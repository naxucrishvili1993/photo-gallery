import React, { ReactNode, createContext, useEffect, useState } from "react";
import { IPhoto } from "../utils/interfaces";
import { getPopularPhotos } from "../services/apiPhotos";
import { extractFields } from "../utils/helpers";

interface IContext {
	history: string[];
	setHistory: React.Dispatch<React.SetStateAction<string[]>>;
	images: IPhoto[];
	setImages: React.Dispatch<React.SetStateAction<IPhoto[]>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IContext>({
	history: [],
	setHistory: () => [],
	images: [],
	setImages: () => [],
	isLoading: false,
	setIsLoading: () => false,
});

interface IProps {
	children: ReactNode;
}

function AppProvider({ children }: IProps) {
	const [images, setImages] = useState<IPhoto[]>([]);
	const [history, setHistory] = useState<string[]>([
		"Car",
		"Cars",
		"Home",
		"House",
	]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getPhotos() {
			const photos = extractFields(await getPopularPhotos());
			setImages(photos);
		}
		getPhotos();
	}, []);

	return (
		<AppContext.Provider
			value={{
				history,
				setHistory,
				images,
				setImages,
				isLoading,
				setIsLoading,
			}}>
			{children}
		</AppContext.Provider>
	);
}

export { AppProvider };
