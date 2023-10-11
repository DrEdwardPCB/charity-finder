import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLayout } from "./layouts/NavLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { CharityDetailPage } from "./pages/CharityDetailPage";
import { FavoritePage } from "./pages/FavoritePage";
import { SearchPage } from "./pages/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<NavLayout />}>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/charity/:id" element={<CharityDetailPage />} />
						<Route path="/search/:keyword" element={<SearchPage />} />
						<Route path="/favorite" element={<FavoritePage />} />
						<Route path="*" element={<NotFoundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
