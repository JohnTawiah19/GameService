import { motion } from "framer-motion";
import { Button } from "..";
import { SlBasket } from "react-icons/sl";
import { useMutation } from "@tanstack/react-query";
import { AddUserGame } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";
import { UserSession } from "../../services/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

type Props = {
  id: string;
  title: string;
  price: string;
  tags: string;
  rating: number;
  img: string;
};

export function GameCard({ id, title, img, tags, price }: Props) {
  const [user] = useSessionStorage<UserSession>("session", null);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: AddUserGame,
    onError: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      if (data.success) {
        let notify = () => toast(`${title} has been purchased`);
        notify();
        navigate("/dashboard");
      } else {
        console.log(data);
        let errorNotify = () => toast(data.errorMessage, { type: "error" });
        errorNotify();
      }
    },
  });

  return (
    <div
      className={`flex flex-col rounded-3xl p-4 backdrop-blur-lg bg-white  w-72  gap-6 bg-[url(${img})]`}
    >
      <div className="relative">
        <motion.img
          className="rounded-xl shadow-2xl relative w-full h-36 object-cover"
          src={img}
        />
        <div className="w-full flex flex-row gap-2 self-end mt-auto absolute bottom-0 p-1">
          {tags.split(",").map((tag) => (
            <TooltipProvider key={tag}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p
                    key={tag}
                    className="game-card-tag backdrop-blur-md cursor-pointer"
                  >
                    {tag.length > 4 ? `${tag.substring(0, 4)}...` : tag}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="rounded-xl bg-white px-2">{tag}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="absolute shadow-2xl flex flex-col bg-transparent  bottom-1 right-1">
          <p className="text-white text-lg rounded-full backdrop-blur-lg p-3">
            {price}
          </p>
        </div>
      </div>
      <div className="flex flex-row align-middle justify-between">
        <h1>{title}</h1>
        <Button
          className="gap-2"
          onClick={() => {
            if (!user) {
              const notifyUser = () =>
                toast("Login to buy", {
                  type: "error",
                });
              notifyUser();
              return;
            }
            mutate({ userId: user.userId, gameId: id });
          }}
        >
          <SlBasket /> Add
        </Button>
      </div>
    </div>
  );
}

GameCard.defaultProps = {
  id: "1",
  title: "Witcher 3",
  price: "$59.99",
  tags: "RPG, PS4",
  rating: 8.9,
  img: "https://wallpapers.com/images/featured/the-witcher-3-i64x6dfxkllyw0qp.jpg",
};
