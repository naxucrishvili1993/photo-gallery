export interface ICache {
	topic: string;
	value: IPhoto[];
}

export interface IPhoto {
	id: string;
	likes: number;
	views: number;
	downloads: number;
	alt_description: string;
	width: number;
	height: number;
	urls: {
		raw: string;
		full: string;
	};
}
