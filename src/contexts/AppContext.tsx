import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
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

const AppContext = createContext<IContext>({
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
	const [history, setHistory] = useState<string[]>([]);
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

function useApp() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("AppContext was used outside of AppProvider!");
	}
	return context;
}

export { AppProvider, useApp };
