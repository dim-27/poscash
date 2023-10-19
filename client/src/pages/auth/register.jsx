import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft, EyeIcon, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "@/components/ui/toast";
import { postAPI } from "@/repositories/api";

const RegisterCashier = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initForm = {
    fullname: "",
    email: "",
    password: "",
    // roleId: 2,
  };

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: initForm,
  });

  const mutation = useMutation({
    mutationFn: async (register) => {
      return postAPI("user/register-cashier", register);
    },
  });

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
    });
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(initForm);
    }
  }, [form]);

  if (mutation.isSuccess) return navigate("/login-cashier");

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2">
        <span className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-6 h-6" onClick={() => navigate("/register")} />
          <Label className="font-bold text-sm">Back</Label>
        </span>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <div className="flex gap-4 w-full">
              <div className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="fullname">Full Name</FormLabel>
                      <FormControl>
                        <Input type="text" id="fullname" placeholder="fullname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="email">Emaill</FormLabel>
                      <FormControl>
                        <Input type="email" id="email" placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <FormItem className="flex relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="******"
                            {...field}
                          />
                          <FormLabel className="absolute right-0 mr-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon /> : <EyeOff />}
                          </FormLabel>
                        </FormItem>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    className="w-32 text-xl bg-red-500 rounded-lg hover:bg-red-400 ease-in-out duration-300"
                    type="submit"
                  >
                    {mutation.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                    {mutation.isLoading ? "register..." : "Register"}
                  </Button>
                </div>

                <div className="flex justify-center items-center">
                  <FormLabel>Already have an account</FormLabel>
                  <Link className="ms-2 font-light text-blue-700 text-sm" to="/login-cashier">
                    here
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default RegisterCashier;
