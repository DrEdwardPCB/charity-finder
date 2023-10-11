import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNonProfitDetails } from "../api/everyorg";
import { isNil } from "lodash";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaLocationDot } from "react-icons/fa6";
import { Chip } from "../components/chip";
import { useFavorite } from "../hooks/useFavorite";

export const CharityDetailPage = () => {
	const { id } = useParams();
	const { data, isLoading, isFetching } = useQuery({
		queryKey: [id, "detail"],
		queryFn: ({ queryKey }) => getNonProfitDetails(queryKey[0] as string),
	});

	const isReady = useMemo(() => {
		return !(isNil(data) || isLoading || isFetching);
	}, [data, isLoading, isFetching]);
	const { favorite, addFavorite, removeFavorite } = useFavorite();
	const isInFavorite = useMemo(() => {
		return favorite.find((e) => e.ein === data?.nonprofit.ein);
	}, [data, favorite]);
	return (
		<div className="min-h-[90vh] mt-16">
			<div className="flex gap-4 flex-col-reverse lg:flex-row px-10 py-4">
				<div className="flex-[2] rounded shadow-xl flex flex-col min-h-[200px]">
					{isReady ? (
						<>
							{data?.nonprofit?.coverImageUrl ? (
								<img
									className="object-cover flex-1 min-h-[200px] rounded"
									src={data?.nonprofit.coverImageUrl}
								></img>
							) : (
								<></>
							)}
							<div className="flex-1 p-4">
								<div className="flex gap-4 items-center">
									<img
										className="rounded-full h-10 object-none object-center"
										src={data?.nonprofit.logoUrl}
									></img>
									<h1 className="text-lg">{data?.nonprofit.name}</h1>
								</div>
								<hr className="my-4"></hr>
								<div className="flex gap-2 items-center">
									<FaLocationDot></FaLocationDot>
									{data?.nonprofit.locationAddress}
								</div>
								<p className="my-2">{data?.nonprofit.descriptionLong}</p>
							</div>
						</>
					) : (
						<div className="p-10">
							<Skeleton></Skeleton>
						</div>
					)}
				</div>
				<div className="flex-1 rouned shadow-xl min-h-[200px] flex flex-col p-6 self-start">
					{isReady ? (
						<>
							<div className="flex flex-col gap-2">
								{isInFavorite ? <p>This Charity Added To Your Favorite !</p> : <></>}
								{isInFavorite ? (
									<div
										className="bg-blue-700 hover:bg-blue-900 text-white font-bold text-center p-3 cursor-pointer"
										onClick={() => removeFavorite(data!.nonprofit.ein)}
									>
										Remove from Favorite
									</div>
								) : (
									<div
										className="bg-red-700 hover:bg-red-900 text-white font-bold text-center p-3 cursor-pointer"
										onClick={() =>
											addFavorite({
												ein: data!.nonprofit.ein,
												name: data!.nonprofit.name,
												logoUrl: data!.nonprofit.logoUrl,
												location: data!.nonprofit.locationAddress,
											})
										}
									>
										Add to Favorite
									</div>
								)}
								<a
									className="bg-green-700 hover:bg-green-900 text-white font-bold text-center p-3 cursor-pointer"
									href={data?.nonprofit.websiteUrl}
								>
									Check it in Every.org
								</a>
							</div>
							<div className="my-3">
								<h3>tags:</h3>
								<div className="flex gap-2 flex-wrap">
									{data?.nonprofitTags.map((e) => {
										return <Chip key={e.tagName}>{e.tagName}</Chip>;
									})}
								</div>
							</div>
						</>
					) : (
						<div className="p-10">
							<Skeleton></Skeleton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
