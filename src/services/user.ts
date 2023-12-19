import axios from "axios";
import { baseUrl } from "./constants";
import { LoginOutput } from "./types";

const getToken = () => {
  const session = sessionStorage.getItem("session");
  const parsedSession = session && JSON.parse(session);
  if (parsedSession) {
    const token = parsedSession as LoginOutput;
    return token.userToken;
  }
  return null;
};

interface UserGamesReturn {
  message: string;
  userGames: {
    userGameId: string;
    userGame: {
      userId: string;
      gameId: string;
      gameName: string;
      gameImg: string;
      rating: number;
      tags: string;
      price: string;
    };
  }[];
}

export async function UserGames(
  userId: string
): Promise<UserGamesReturn | null> {
  try {
    const res = await axios.get(`${baseUrl}/UserGame/UserGameList/${userId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()} `,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

interface AddGameProps {
  userId: string;
  gameId: string;
}

export async function AddUserGame(body: AddGameProps) {
  try {
    const res = await axios.post(`${baseUrl}/UserGame/CreateUserGame`, body, {
      headers: {
        Authorization: `Bearer ${getToken()} `,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
