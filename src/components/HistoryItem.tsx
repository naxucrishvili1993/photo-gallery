import styled from "styled-components";

interface Props {
	text: string;
	currentIndex: number;
	length: number;
}

const Item = styled.li`
	padding: 1rem 5rem 1rem 1rem;
`;

export default function HistoryItem({ text, currentIndex, length }: Props) {
	return (
		<Item
			style={{
				borderBottom:
					length - currentIndex === 1 ? "none" : "1px solid #c3c1c1",
			}}>
			{text}
		</Item>
	);
}
