import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #f9fafb;
	padding: 3.2rem 4rem;
	transition: all 0.5s;
	width: 90dvw;
	max-width: 700px;
`;
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;
const Button = styled.button`
	background: none;
	border: none;
	top: 5px;
	right: 15px;
	position: absolute;
	cursor: pointer;
`;

const Window = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;

interface IProps {
	children: ReactNode;
	onClose: () => void;
}

export default function Modal({ children, onClose }: IProps) {
	return createPortal(
		<Overlay>
			<StyledModal>
				<Button onClick={onClose}>
					<IoClose fontSize={32} />
				</Button>
				<Window>{children}</Window>
			</StyledModal>
		</Overlay>,
		document.body
	);
}
