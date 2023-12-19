import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { BsArrowLeft } from "react-icons/bs";
import { useSessionStorage } from "usehooks-ts";
import { LoginOutput } from "../services/types";
import React from "react";
type Props = {};

export default function View({}: Props) {
  const navigate = useNavigate();
  const [user] = useSessionStorage<LoginOutput | null>("session", null);

  React.useEffect(() => {
    user?.userId && navigate("/dashboard");
  }, [user]);
  return (
    <div
      className={`w-full h-screen bg-gradient-to-br from-sky-500 to-indigo-50`}
    >
      <div
        onClick={() => navigate(-1)}
        role="link"
        className="flex gap-2 p-4 items-center cursor-pointer"
      >
        <BsArrowLeft /> <p className="font-bold">Go Back</p>
      </div>
      <LoginForm />
    </div>
  );
}
