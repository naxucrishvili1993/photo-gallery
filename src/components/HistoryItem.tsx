import styled from "styled-components";
import { useApp } from "../hooks/useApp";
import { getImagesFromCache } from "../utils/helpers";
import { ICache } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
	text: string;
	currentIndex: number;
	length: number;
}

const Item = styled.li`
	cursor: pointer;
	padding: 1rem 5rem 1rem 1rem;
	transition: all 200ms ease-in-out;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}
`;

export default function HistoryItem({ text, currentIndex, length }: Props) {
	const navigate = useNavigate();
	const { setImages } = useApp();
	function handleClick(): void {
		const images: ICache | false = getImagesFromCache(text.toLowerCase());
		if (images) {
			setImages(() => [...images.value]);
			navigate("/");
		}
	}

	return (
		<Item
			style={{
				borderBottom:
					length - currentIndex === 1 ? "none" : "1px solid #c3c1c1",
			}}
			onClick={handleClick}>
			{text}
		</Item>
	);
}
