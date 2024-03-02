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
	position: relative;

	&:active {
		& button {
			opacity: 1;
		}
	}
`;

const StyledImage = styled.img`
	object-fit: cover;
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
`;

const Span = styled.span`
	background-color: #070f2b;
	padding: 0.8rem 1.2rem;
	color: white;
	letter-spacing: 1.5px;
	font-weight: bold;
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
		<>
			<ImageWrapper>
				<StyledImage src={srcRaw} alt={alt} width={250} height={200} />
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
		</>
	);
}
