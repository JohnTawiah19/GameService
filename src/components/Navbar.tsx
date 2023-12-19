import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { LoginOutput } from "../services/types";

type Props = {};

export function Navbar({}: Props) {
  const { scrollYProgress } = useScroll();
  const [user] = useSessionStorage<LoginOutput | null>("session", null);

  return (
    <motion.nav
      initial={{ backgroundColor: "transparent" }}
      animate={{ backgroundColor: "bg-red-600" }}
      transition={{ duration: 0.5 }}
      className={`flex justify-between w-full py-4 px-20 z-20 absolute top-0 left-0 ${
        scrollYProgress.get() == 0 ? "bg-transparent" : "bg-red-600"
      } text-white `}
    >
      <h2 className="font-bold">Game Service</h2>
      <div className="flex justify-end gap-4 pr-12 ">
        <Link to="register">Register</Link>
        {user?.userId ? (
          <Link to="dashboard">My Dashboard</Link>
        ) : (
          <Link to="login">Login</Link>
        )}
      </div>
    </motion.nav>
  );
}
