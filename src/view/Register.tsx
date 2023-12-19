import { BsArrowLeft } from "react-icons/bs";
import { RegisterForm } from "./RegisterForm";
import { useNavigate } from "react-router-dom";

type Props = {};

export function View({}: Props) {
  const navigate = useNavigate();

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
      <RegisterForm />
    </div>
  );
}
