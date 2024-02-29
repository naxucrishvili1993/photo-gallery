import Header from "../components/Header";
import { useApp } from "../contexts/AppContext";
import { IPhoto } from "../utils/interfaces";
import styled from "styled-components";
import Image from "../components/Image";

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
	const { images, isLoading } = useApp();
	return (
		<>
			<Header />
			<StyledHome>
				{isLoading ? (
					<p>Please wait...</p>
				) : (
					<ImageContainer>
						{images.length > 0
							? images.map((image: IPhoto, idx: number) => (
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
							: "No images found..."}
					</ImageContainer>
				)}
			</StyledHome>
		</>
	);
}
