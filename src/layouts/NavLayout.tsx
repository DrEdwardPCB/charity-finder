import { Outlet, useNavigate } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";
import { SearchBar } from "../components/searchBar";
import { MdOutlineFavorite } from "react-icons/md";
export const NavLayout = () => {
	const navigate = useNavigate();
	return (
		<>
			<nav className="fixed top-0 py-2 px-6 w-full flex justify-between items-center bg-slate-800 z-10">
				<div
					className="flex gap-2 items-center justify-center cursor-pointer"
					onClick={() => {
						navigate("/");
					}}
				>
					<FaHandsHelping className="text-white"></FaHandsHelping>
					<h1 className="text-xl text-white font-bold">Charity Finder</h1>
				</div>
				<SearchBar></SearchBar>
				<div
					className="cursor-pointer p-4 rounded-full hover:bg-slate-900"
					onClick={() => {
						navigate("/favorite");
					}}
				>
					<MdOutlineFavorite className="text-red-400" />
				</div>
			</nav>
			<div className="z-0">
				<Outlet></Outlet>
			</div>
		</>
	);
};
