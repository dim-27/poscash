import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

import { sendMailSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/repositories/api";
import { useToast } from "../ui/use-toast";

const SendMail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const initForm = {
    email: "",
  };
  const form = useForm({
    resolver: zodResolver(sendMailSchema),
    defaultValues: initForm,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return postAPI("user/reset-password/request", data);
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
        title: "Send Email Success",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (mutation.isError) {
      toast({
        title: "Send Email Failed",
      });
    }
  }, [form, mutation.isSuccess, mutation.isError]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2">
        <span className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-6 h-6" onClick={() => navigate("/login")} />
          <Label className="font-bold text-sm">Back</Label>
        </span>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <div className="flex gap-4 w-full">
              <div className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input type="email" id="email" placeholder="example@mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center items-center">
                  <Button
                    className="w-32 text-xl bg-red-500 rounded-lg hover:bg-red-400 ease-in-out duration-300"
                    type="submit"
                    onClick={() => {
                      // if (mutation.isSuccess) {
                      //   toast({
                      //     title: "Success Send Email",
                      //   });
                      // }
                    }}
                  >
                    {mutation.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                    {mutation.isLoading ? "send mail..." : "Send Mail"}
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
export default SendMail;
