import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import HistoryItem from "../components/HistoryItem";
import styled from "styled-components";

const StyledHistory = styled.div`
	background-color: #ccd3ca;
	padding: 1rem 2rem;
	min-height: 100dvh;
`;

const Heading = styled.h2`
	text-transform: uppercase;
`;

const List = styled.ul`
	margin: 3rem;
	font-size: 1.1rem;
`;

const HeadingWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
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

export default function History() {
	const { history } = useApp();
	return (
		<StyledHistory>
			<HeadingWrapper>
				<Heading>History of searched topics</Heading>
				<StyledLink to="/">Go Home</StyledLink>
			</HeadingWrapper>
			<List>
				{history?.map((el: string, idx: number) => (
					<HistoryItem key={idx} text={el} />
				))}
			</List>
		</StyledHistory>
	);
}
