import { useStep } from "usehooks-ts";
import { GoDot, GoDotFill } from "react-icons/go";
import React from "react";
import { Navbar } from "./Navbar";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Button } from ".";
import { Link } from "react-router-dom";
type Props = {
  imgs: { title: string; url: string }[];
  interval: number;
};

export function HomeBanner({ imgs, interval }: Props) {
  const slideVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 400, // Adjust the duration as needed
      },
    },
  };

  const [currentStep, helpers] = useStep(imgs.length);
  const { setStep } = helpers;

  React.useEffect(() => {
    const stepInterval = setInterval(() => {
      const nextStep = currentStep >= imgs.length ? 1 : currentStep + 1;
      setStep(nextStep);
    }, interval);

    return () => clearInterval(stepInterval);
  });

  return (
    <div className=" max-w-full h-screen flex opacity-90 relative ">
      <Navbar />
      <div className="flex w-full h-screen bg-black opacity-60 z-10 absolute" />
      <div className="flex flex-col gap-4 text-white left-0 top-1/4 z-20 absolute px-20 rou">
        <h1 className=" text-7xl">{imgs[currentStep - 1].title}</h1>
        <p className="text-md w-1/2">
          Immerse yourself in a world of limitless gaming possibilities with our
          cutting-edge game service! Unleash the thrill of unparalleled
          graphics, seamless multiplayer experiences, and a vast library of
          top-tier titles. Elevate your gaming journey with us and redefine the
          way you play. Join the revolution in gaming excellence today!
        </p>
        <div className="flex flex-row gap-4">
          <Button
            asChild
            size={"lg"}
            className="rounded-full px-12 bg-transparent border hover:bg-red-700 "
          >
            <Link to="/login"> Login</Link>
          </Button>{" "}
          <Button
            asChild
            size={"lg"}
            className="rounded-full px-12 outline-white bg-transparent  bg-red-600 hover:bg-red-700"
          >
            <Link to="/register"> Register</Link>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        <motion.img
          animate="visible"
          className="object-cover w-full"
          variants={slideVariants}
          exit="exit"
          key={currentStep}
          src={imgs[currentStep - 1].url}
          alt={imgs[currentStep - 1].title}
        />
      </AnimatePresence>

      <GalleryBullets
        currentStep={currentStep - 1}
        setStep={setStep}
        bulletNo={imgs.length}
      />
    </div>
  );
}

interface BulletProps {
  currentStep: number;
  bulletNo: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
function GalleryBullets({ currentStep, bulletNo, setStep }: BulletProps) {
  const dotStyle = {
    color: "white",
  };
  return (
    <div className="bottom-10 left-2/4 flex flex-row gap-4 z-20 absolute">
      {Array(bulletNo)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            onClick={() => setStep(index + 1)}
            className="w-4 h-4 cursor-pointer"
          >
            {currentStep == index ? (
              <GoDotFill size={30} style={dotStyle} />
            ) : (
              <GoDot size={30} style={dotStyle} />
            )}
          </div>
        ))}
    </div>
  );
}

HomeBanner.defaultProps = {
  interval: 4000,
  imgs: [
    {
      title: "The Witcher",
      url: "https://wallpapers.com/images/featured/the-witcher-3-i64x6dfxkllyw0qp.jpg",
    },
    {
      title: "Skyrim",
      url: "https://cdn.wallpapersafari.com/22/37/sJl9eU.jpg",
    },
    {
      title: "Spiderman",
      url: "https://images6.alphacoders.com/913/913243.jpg",
    },
    {
      title: "Ghost of Tsushima",
      url: "https://www.gamepro.com.au/wp-content/uploads/2022/05/best-games-like-ghost-of-tsushima@2x.jpg",
    },
    {
      title: "Dragon Age 3",
      url: "https://getwallpapers.com/wallpaper/full/1/9/8/591374.jpg",
    },
  ],
};
