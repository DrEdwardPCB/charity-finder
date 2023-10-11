import { useLocalStorage } from "usehooks-ts";
import { ICharitySummaryItemProps } from "../components/charitySummaryItem";

export const useFavorite = () => {
	const [favorite, setFavorite] = useLocalStorage<ICharitySummaryItemProps[]>("favoriteCharity", []);
	const addFavorite = (fav: ICharitySummaryItemProps) => {
		setFavorite([...favorite, fav]);
	};
	const removeFavorite = (ein: string) => {
		setFavorite(favorite.filter((e) => e.ein !== ein));
	};
	return {
		favorite,
		setFavorite,
		addFavorite,
		removeFavorite,
	};
};
