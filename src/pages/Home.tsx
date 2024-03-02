import Header from "../components/Header";
import { IPhoto } from "../utils/interfaces";
import styled from "styled-components";
import Image from "../components/Image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Spinner from "../ui/Spinner";
import { handleScrollForSimulation, simulateFetch } from "../utils/helpers";
import { useApp } from "../hooks/useApp";

const StyledHome = styled.div`
	background-color: #ccd3ca;
	padding: 1rem 0;
	min-height: calc(100dvh - 63.97px);
`;

const ImageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: center;
`;

export default function Home() {
	// API-დან მიღებული ფოტოები ინახება images ცვლადში.
	const { images, setImages, isLoading: isLoadingApi } = useApp();
	const [isLoading, setIsLoading] = useState(false);
	// პირველივე "დამატების" მომენტის რერენდერის გარეშე დასაჭერად
	const countRef = useRef(0);

	useEffect(() => {
		window.addEventListener("scroll", () =>
			scrollListener({ isLoading, setIsLoading, setImages, countRef })
		);
		return () =>
			window.removeEventListener("scroll", () =>
				scrollListener({ isLoading, setIsLoading, setImages, countRef })
			);
	}, []);
	return (
		<>
			<Header />
			<StyledHome>
				{isLoadingApi ? (
					<Spinner />
				) : (
					<ImageContainer>
						{images.length > 0 ? (
							images.map((image: IPhoto, idx: number) => (
								<Image
									srcRaw={image.urls.raw}
									srcFull={image.urls.full}
									key={idx}
									alt={image.alt_description}
									width={image.width}
									height={image.height}
									downloads={image.downloads}
									views={image.views}
									likes={image.likes}
								/>
							))
						) : (
							<p>No images found...</p>
						)}
					</ImageContainer>
				)}
				{images.length > 0 && isLoading && <Spinner />}
			</StyledHome>
		</>
	);
}

interface IListener {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setImages: React.Dispatch<React.SetStateAction<IPhoto[]>>;
	countRef: MutableRefObject<number>;
}

function scrollListener({
	isLoading,
	setIsLoading,
	setImages,
	countRef,
}: IListener) {
	handleScrollForSimulation(
		() =>
			simulateFetch({
				setState: setIsLoading,
				cb: () =>
					setImages((prevImages: IPhoto[]) => [
						...prevImages,
						...prevImages.slice(0, 20),
					]),
				ref: countRef,
			}),
		isLoading,
		countRef
	);
}
