import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import HistoryItem from "../components/HistoryItem";
import styled from "styled-components";
import {
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { handleScrollForSimulation, simulateFetch } from "../utils/helpers";
import Spinner from "../ui/Spinner";

const StyledHistory = styled.div`
	background-color: #ccd3ca;
	padding: 1rem 2rem;
	min-height: 100dvh;
`;

const Heading = styled.h2`
	text-transform: uppercase;
`;

const ListContainer = styled.div`
	display: flex;
	justify-content: center;
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: #f6eded;
	}

	::-webkit-scrollbar-thumb {
		background: #a4a3a3;
		border-radius: 10px;
	}
`;

const List = styled.ul`
	background-color: #eee5e5;
	border-radius: 5px;
	width: 70%;
	max-width: 400px;
	margin-top: 2rem;
	font-size: 1.1rem;
	list-style-type: none;
	max-height: 300px;
	overflow-y: scroll;
	overflow-x: auto;
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
	const { history, setHistory } = useApp();
	const [isLoading, setIsLoading] = useState(false);
	// Infinite Scroll-ის შესაქმნელად
	const listRef = useRef<HTMLUListElement | null>(null);
	// პირველივე "დამატების" მომენტის რერენდერის გარეშე დასაჭერად
	const countRef = useRef<number>(0);
	// ველების წინასწარ გამზადება Listener-ის გადასაცემად
	const listenerProps = {
		isLoading,
		setIsLoading,
		history,
		setHistory,
		countRef,
		listRef,
	};

	useEffect(() => {
		const list = listRef.current;
		if (!list) {
			return;
		}

		list.addEventListener("scroll", () => {
			containerListener(listenerProps);
		});

		return () =>
			list.removeEventListener("scroll", () =>
				containerListener(listenerProps)
			);
	}, []);
	return (
		<StyledHistory>
			<HeadingWrapper>
				<Heading>History of searched topics</Heading>
				<StyledLink to="/">Go Home</StyledLink>
			</HeadingWrapper>
			<ListContainer>
				<List ref={listRef}>
					{history.length > 0 ? (
						history?.map((el: string, idx: number) => (
							<HistoryItem
								key={idx}
								text={el}
								currentIndex={idx}
								length={history.length}
							/>
						))
					) : (
						<p>There is no search history...</p>
					)}
					{isLoading && <Spinner />}
				</List>
			</ListContainer>
		</StyledHistory>
	);
}

interface IListener {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	history: string[];
	setHistory: React.Dispatch<React.SetStateAction<string[]>>;
	countRef: MutableRefObject<number>;
	listRef: RefObject<HTMLUListElement>;
}
function containerListener({
	isLoading,
	setIsLoading,
	history,
	setHistory,
	countRef,
	listRef,
}: IListener) {
	handleScrollForSimulation(
		() =>
			simulateFetch({
				setState: setIsLoading,
				cb: () =>
					setHistory((prevHistory: string[]) => [
						...prevHistory,
						...history.slice(0, 3),
					]),
				ref: countRef,
			}),
		isLoading,
		countRef,
		listRef
	);
}
