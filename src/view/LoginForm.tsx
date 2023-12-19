import { LoginInterface, loginSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { FormInut } from "../components/common/form";
import { Form } from "../components/ui/form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../services";
import { ToastContainer, toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";
import { Zoom } from "react-toastify";
import { LoginOutput } from "../services/types";

type Props = {};

export function LoginForm({}: Props) {
  const [_, setUser] = useSessionStorage<LoginOutput | null>("session", null);
  const navigate = useNavigate();
  const failNotitfy = () =>
    toast("Login failed", {
      type: "error",
    });

  const { mutate } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      setUser(data);
      navigate("/dashboard");
    },
    onError: () => {
      failNotitfy();
    },
  });

  const form = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (params: LoginInterface) => {
    mutate(params);
  };
  return (
    <div className="w-60 h-52 flex flex-col gap-4 m-auto py-32 ">
      <h1 className="text-center font-bold text-2xl">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormInut name="email" label="Email" />
            <FormInut name="password" label="Password" type="text" />

            <Button
              disabled={form.formState.isSubmitting}
              className="rounded-full w-full bg-red-600 hover:bg-red-700"
            >
              {form.formState.isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <ToastContainer
        autoClose={5000}
        transition={Zoom}
        position="top-center"
      />
    </div>
  );
}
