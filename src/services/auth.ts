import axios from "axios";
import { baseUrl } from "./constants";
import { LoginOutput, ResponseOutput } from "./types";

interface RegisterProps {
  firstname: string;
  lastname: string;
  age: string;
  gender: string;
  email: string;
  password: string;
}
export async function Register(
  body: RegisterProps
): Promise<ResponseOutput<any> | null> {
  try {
    const res = await axios.post(`${baseUrl}/User/CreateUser`, body, {});
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
interface LoginProps {
  email: string;
  password: string;
}
export async function Login(body: LoginProps): Promise<LoginOutput | null> {
  try {
    const res = await axios.post(`${baseUrl}/User/Login`, body, {});
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
