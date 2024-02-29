import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import History from "./pages/History";
import GlobalStyles from "./styles/GlobalStyles";

export default function App() {
	return (
		<AppProvider>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/history" element={<History />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}
