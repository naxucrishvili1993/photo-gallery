import { ChangeEvent } from "react";
import styled from "styled-components";

const Search = styled.input`
	background-color: #f2efe5;
	border: none;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
	height: 25px;
	letter-spacing: 1px;
	padding: 16px 8px;

	&:focus {
		outline: 0;
	}
`;

interface IProps {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: IProps) {
	return (
		<Search
			type="text"
			name="search"
			placeholder="Enter a topic..."
			value={value}
			onChange={onChange}
		/>
	);
}
