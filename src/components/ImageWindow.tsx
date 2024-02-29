import styled from "styled-components";

interface IProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	views: number;
	downloads: number;
	likes: number;
}

const Image = styled.img`
	max-width: 100%;
	max-height: 400px;
	width: auto;
	height: auto;
`;

const Stats = styled.div`
	display: flex;
	flex-direction: column;
`;
export default function ImageWindow({
	src,
	alt,
	views,
	likes,
	downloads,
}: IProps) {
	console.log(downloads);
	return (
		<div>
			<Image src={src} alt={alt} />
			<Stats>
				<span>Views: {views}</span>
				<span>Likes: {likes}</span>
				<span>Downloads: {downloads}</span>
			</Stats>
		</div>
	);
}
