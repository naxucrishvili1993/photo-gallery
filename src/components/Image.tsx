import { useState } from "react";
import styled from "styled-components";
import Modal from "../ui/Modal";
import ImageWindow from "./ImageWindow";

interface Props {
	srcRaw: string;
	srcFull: string;
	alt: string;
	width: number;
	height: number;
	views: number;
	downloads: number;
	likes: number;
}

const ImageWrapper = styled.div`
	&:hover {
		& button {
			opacity: 1;
		}
	}
`;

const StyledImage = styled.img`
	object-fit: cover;
	background-color: #d7edf4ad;
`;

const ViewButton = styled.button`
	background-color: rgba(255, 255, 255, 0.5);
	border: none;
	height: 100%;
	cursor: pointer;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 50%;
	left: 50%;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
	transform: translate(-50%, -50%);
	width: 100%;

	@media screen and (min-width: 1290px) {
		background: none;
	}
`;

const Span = styled.span`
	background-color: #070f2b;
	padding: 0.8rem 1.2rem;
	color: white;
	letter-spacing: 1.5px;
	font-weight: bold;
`;

const Container = styled.div`
	position: relative;
	@media screen and (min-width: 1290px) {
		display: flex;
		justify-content: center;
		width: calc(20% - 1rem);
	}
`;

export default function Image({
	srcRaw,
	srcFull,
	alt,
	width,
	height,
	views,
	likes,
	downloads,
}: Props) {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	return (
		<Container>
			<ImageWrapper>
				<StyledImage
					src={srcRaw + "&q=1&auto=format"}
					alt={alt}
					width={250}
					height={200}
					loading="lazy"
				/>
				<ViewButton onClick={() => setIsOpenModal((show) => !show)}>
					<Span>View</Span>
				</ViewButton>
			</ImageWrapper>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<ImageWindow
						src={srcFull}
						alt={alt}
						width={width}
						height={height}
						views={views}
						likes={likes}
						downloads={downloads}
					/>
				</Modal>
			)}
		</Container>
	);
}
