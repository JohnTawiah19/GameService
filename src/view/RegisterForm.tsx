import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import { RegisterInterface, registerSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components";
import { FormInut } from "../components/common/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { Register } from "../services";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

type Props = {};

export function RegisterForm({}: Props) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
      navigate("/login");
      console.log(data);
    },

    onError: (data) => {
      console.log(data);
    },
  });
  const form = useForm<RegisterInterface>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (params: RegisterInterface) => {
    console.log(params);
    mutate({
      ...params,
      gender: "Male",
    });
  };
  return (
    <div className="w-60 h-52 flex flex-col gap-4 m-auto py-24 ">
      <h1 className="text-center font-bold text-2xl">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormInut name="firstname" label="First Name" />
            <FormInut name="lastname" label="Last Name" />
            <FormInut name="age" type="number" label="Age" />
            <FormInut name="email" type="email" label="Email" />
            <FormInut name="password" type="password" label="Password" />
            <FormInut name="confirmPassword" type="password" label="Confirm" />

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
      <ToastContainer />
    </div>
  );
}
