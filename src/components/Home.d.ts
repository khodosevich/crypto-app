import { Dispatch, SetStateAction } from "react";
interface FavouriteCoinsContextType {
    favouriteCoins: string[];
    setFavouriteCoins: Dispatch<SetStateAction<string[]>>;
    addToFavourites: (id: string) => void;
}
export declare const FavouriteCoinsContext: import("react").Context<FavouriteCoinsContextType>;
declare const Home: () => import("react/jsx-runtime").JSX.Element;
export default Home;
