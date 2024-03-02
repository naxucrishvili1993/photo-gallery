import { ChangeEvent, FormEvent, useState } from "react";
import SearchBar from "../ui/SearchBar";
import { apiPhotos } from "../services/apiPhotos";
import { capitalizeFirstLetter, updateStorage } from "../utils/helpers";
import { IPhoto } from "../utils/interfaces";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useApp } from "../hooks/useApp";

const StyledHeader = styled.header`
	align-items: center;
	justify-content: space-around;
	display: flex;
	padding: 1rem 0;
	background-color: #b5c0d0;
`;

const StyledLink = styled(Link)`
	background-color: #070f2b;
	color: white;
	text-decoration: none;
	text-align: center;
	margin: auto 0;
	letter-spacing: 1px;
	padding: 6px 20px;
	transition: all 200ms;

	&:hover {
		opacity: 0.9;
	}
`;

export default function Header() {
	const { history, setHistory, setImages, setIsLoading } = useApp();
	const [topic, setTopic] = useState<string>("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setIsLoading(true);
		const images: IPhoto[] = await apiPhotos({ topic: topic.toLowerCase() });

		setImages(images);
		setIsLoading(false);

		updateStorage({ topic, images });

		if (!history.includes(capitalizeFirstLetter(topic))) {
			setHistory((prevHistory: string[]) => [
				...prevHistory,
				capitalizeFirstLetter(topic),
			]);
		}
	}

	return (
		<StyledHeader>
			<form onSubmit={handleSubmit}>
				<SearchBar
					value={topic}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTopic(e.target.value)
					}
				/>
			</form>
			<StyledLink to="/history">History</StyledLink>
		</StyledHeader>
	);
}
