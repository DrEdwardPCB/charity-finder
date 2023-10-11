import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { browseNonProfit } from "../api/everyorg";
import { isNil } from "lodash";
import { CharitySummaryList } from "../components/charitySummaryList";
export const SearchPage = () => {
	const { keyword } = useParams();
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["search"],
		queryFn: () => browseNonProfit(keyword!),
	});
	return (
		<div className="min-h-[90vh] mt-16">
			<CharitySummaryList
				title={`Search Result for: ${keyword} `}
				data={data ? data![Object.keys(data)[0]] : []}
				isLoading={isLoading || isFetching || isNil(data)}
			/>
		</div>
	);
};
