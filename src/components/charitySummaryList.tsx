/* eslint-disable no-mixed-spaces-and-tabs */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CharitySummaryItem, ICharitySummaryItemProps } from "../components/charitySummaryItem";
import { TOrganizationSummary } from "../api/everyorg";

export interface ICharitySummaryListProps {
	title: string;
	data: (TOrganizationSummary | ICharitySummaryItemProps)[];
	isLoading: boolean;
}
export const CharitySummaryList = ({ title, data, isLoading }: ICharitySummaryListProps) => {
	return (
		<div className="p-10">
			<div className="text-3xl">{title}</div>
			<div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{isLoading
					? //isLoading || isFetching || isNil(data)
					  new Array(9).map((e, i) => <Skeleton key={i}></Skeleton>)
					: //data![Object.keys(data!)[0]]
					  data.map((e) => {
							return (
								<CharitySummaryItem
									ein={e.ein}
									key={e.name}
									name={e.name}
									logoUrl={e.logoUrl}
									location={e.location}
								/>
							);
					  })}
			</div>
		</div>
	);
};
