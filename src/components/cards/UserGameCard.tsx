import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  price: string;
  tags: string;
  rating: number;
  img: string;
};

export function UserGameCard({ title, img, tags, rating }: Props) {
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
            {rating}
          </p>
        </div>
      </div>
      <h1>{title}</h1>
    </div>
  );
}

UserGameCard.defaultProps = {
  title: "Witcher 3",
  price: "$59.99",
  tags: "RPG, PS4",
  rating: 8.9,
  img: "https://wallpapers.com/images/featured/the-witcher-3-i64x6dfxkllyw0qp.jpg",
};
