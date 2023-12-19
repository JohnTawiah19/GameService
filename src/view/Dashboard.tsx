import { useQuery } from "@tanstack/react-query";
import { CurrentGame, UserGameCard } from "../components";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../components/ui";
import { UserGames } from "../services";
import { useSessionStorage } from "usehooks-ts";
import { LoginOutput } from "../services/types";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function Dashboard({}: Props) {
  const [user, setUser] = useSessionStorage<LoginOutput | null>(
    "session",
    null
  );

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["UserGames"],
    queryFn: () => UserGames(user?.userId as string),
  });

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-4 px-32 gap-4">
      <h1 className="text-center text-lg font-bold">Dashboard</h1>
      <Link to={"/"}>Home</Link>
      <div className="flex flex-row  justify-between">
        <div className="flex flex-row gap-4 w-full items-center ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="">
            Hello {user?.firstname} {user?.lastname}
          </p>
        </div>

        <Button className="rounded-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <CurrentGame
      // title={data?.userGames[0].userGame.gameName}
      // img={data?.userGames[0].userGame.gameImg}
      />

      <div className="flex flex-col bg-gray-200 p-4 rounded-lg">
        <h1 className="text-3xl text-center">Your purchased Games</h1>
        <div className="flex gap-8 flex-wrap">
          {data?.userGames.map((game) => (
            <UserGameCard
              key={game.userGame.gameId}
              title={game.userGame.gameName}
              id={game.userGame.gameId}
              img={game.userGame.gameImg}
              price={game.userGame.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
