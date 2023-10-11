import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { causes } from "../assets/causes.json";
import { isNil } from "lodash";
import { Chip } from "./chip";
import { RxCross2 } from "react-icons/rx";
import { PiMagnifyingGlass } from "react-icons/pi";
export const SearchBar = () => {
	const { keyword } = useParams();
	const navigate = useNavigate();
	//handle initial query
	useEffect(() => {
		if (!(isNil(keyword) || keyword === "")) {
			if (causes.includes(keyword)) {
				setSelected(keyword);
			} else {
				navigate("*");
			}
		}
	}, []);

	const [textfield, setTextfield] = useState<string>("");
	const [selected, setSelected] = useState<string | undefined>(undefined);
	useEffect(() => {
		if (!isNil(selected)) {
			navigate(`/search/${selected}`);
		}
	}, [selected]);
	return (
		<div className="relative min-w-[250px] h-18 bg-white rounded-lg flex items-center w-96">
			<div className="rounded flex items-center justify-between w-full px-3">
				{selected ? (
					<div className="flex justify-start">
						<Chip>{selected}</Chip>
					</div>
				) : (
					<input
						className="flex-1 p-3"
						value={textfield}
						placeholder="find a charity"
						onChange={(evt) => setTextfield(evt.target.value)}
					></input>
				)}
				{selected || textfield ? (
					<div
						className="cursor-pointer"
						onClick={() => {
							setTextfield("");
							setSelected(undefined);
							navigate("/");
						}}
					>
						<RxCross2></RxCross2>
					</div>
				) : (
					<div>
						<PiMagnifyingGlass></PiMagnifyingGlass>
					</div>
				)}
			</div>
			{textfield.length > 0 ? (
				<div className="absolute p-4 bg-white rounded-lg top-12 left-0 right-0 min-h-5 max-h-96 overflow-scroll flex flex-wrap gap-2 shadow-xl">
					{causes
						.filter((e) => {
							return e.includes(textfield ?? "");
						})
						.map((e) => (
							<Chip
								key={e}
								onClick={() => {
									setTextfield("");
									setSelected(e);
								}}
							>
								{e}
							</Chip>
						))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
