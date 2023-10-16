import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { EyeOff, EyeIcon } from "lucide-react";

import { FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/repositories/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const initForm = {
    userId: userId,
    token: token,
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: initForm,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return postAPI("user/reset-password", data);
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
    if (mutation.isSuccess) {
      toast({
        title: "Reset Password Success",
      });
      setTimeout(() => {
        navigate("/login-cashier");
      }, 3000);
    } else if (mutation.isError) {
      toast({
        title: "Reset Password Failed",
      });
    }
  }, [form, mutation.isSuccess, mutation.isError]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <div className="flex gap-4 w-full">
              <div className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <FormItem className="flex relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="newPassword"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <FormItem className="flex relative">
                          <Input
                            type={showPassword2 ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="******"
                            {...field}
                          />
                          <FormLabel className="absolute right-0 mr-2" onClick={() => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? <EyeIcon /> : <EyeOff />}
                          </FormLabel>
                        </FormItem>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center items-center">
                  <Button
                    className="w-32 text-xl bg-red-500 rounded-lg hover:bg-red-400 ease-in-out duration-300"
                    type="submit"
                  >
                    {mutation.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                    {mutation.isLoading ? "submit..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
