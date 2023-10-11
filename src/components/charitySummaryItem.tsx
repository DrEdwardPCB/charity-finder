import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export interface ICharitySummaryItemProps {
	ein: string;
	name: string;
	location: string;
	logoUrl: string;
}
export const CharitySummaryItem = ({ ein, logoUrl, name, location }: ICharitySummaryItemProps) => {
	const navigate = useNavigate();
	return (
		<div
			className="p-6 shadow-lg rounded cursor-auto hover:bg-slate-100"
			onClick={() => navigate(`/charity/${ein}`)}
		>
			<div className="flex gap-4 items-center">
				<img className="rounded-full h-10 object-none object-center" src={logoUrl}></img>
				<h1 className="text-lg">{name}</h1>
			</div>
			<hr className="my-4"></hr>
			<div className="flex gap-2 items-center">
				<FaLocationDot></FaLocationDot>
				{location}
			</div>
		</div>
	);
};
