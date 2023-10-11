import { CharitySummaryList } from "../components/charitySummaryList";
import { useFavorite } from "../hooks/useFavorite";

export const FavoritePage = () => {
	const { favorite } = useFavorite();
	return (
		<div className="min-h-[90vh] mt-16">
			<CharitySummaryList title={`Favorite`} data={favorite} isLoading={false} />
		</div>
	);
};
