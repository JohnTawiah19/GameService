import { useQuery } from "@tanstack/react-query";
import { GameCard } from "../components";
import { HomeBanner } from "../components/HomeBanner";
import { Game } from "../services";
import { ToastContainer } from "react-toastify";

type Props = {};

export default function View({}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["Games"],
    queryFn: Game,
  });

  return (
    <div className="">
      <HomeBanner />
      <div className="flex flex-col gap-4 bg-gray-100 p-8">
        <h1 className="text-3xl text-center">Our Catalog</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {data?.games.map((game) => (
              <GameCard
                key={game.gameId}
                img={game.gameImg}
                title={game.gameName}
                id={game.gameId}
                rating={game.rating}
                tags={game.tags}
                price={game.price}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
