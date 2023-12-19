import axios from "axios";
import { baseUrl } from "./constants";

interface GameReturnType {
  message: string;
  games: {
    gameId: string;
    gameName: string;
    gameImg: string;
    rating: number;
    tags: string;
    price: string;
  }[];
}
export async function Game(): Promise<GameReturnType | null> {
  try {
    const res = await axios.get(`${baseUrl}/Game`, {});
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
