import { browseNonProfit } from "../api/everyorg";
import charity from "../assets/charity.jpg";
import { causes } from "../assets/causes.json";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "lodash";
import { CharitySummaryList } from "../components/charitySummaryList";

export const HomePage = () => {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["homepage"],
		queryFn: () => browseNonProfit(causes[Math.floor(Math.random() * causes.length)], 9),
	});
	return (
		<div className="min-h-[90vh] mt-16">
			<div className="relative">
				<img className="w-full h-96 object-fill object-center" src={charity}></img>
				<div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center">
					<div className="backdrop-brightness-50 p-4 text-4xl font-bold text-white">
						Changing The World Through Kindness
					</div>
				</div>
			</div>
			<CharitySummaryList
				title="You may Interest"
				data={data ? data![Object.keys(data)[0]] : []}
				isLoading={isLoading || isFetching || isNil(data)}
			/>
		</div>
	);
};
