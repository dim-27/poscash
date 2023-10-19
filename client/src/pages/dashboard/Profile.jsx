import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/auth/AuthContext";
import { postAPIFormData, getAPI } from "@/repositories/api";
import { uploadImageSchema } from "@/utils/schema";
import { decryptAES } from "@/utils/crypto";
import { setRand } from "@/features/globalReducer";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { userId, token, isAdmin } = useContext(AuthContext);
  const dispathc = useDispatch();

  const uploadImage = {
    file: "",
  };

  const refineToken = decryptAES(token);
  const {
    data: user,
    isFetched,
    refetch,
  } = useQuery(["user"], async () => {
    const res = await getAPI(`user/${userId}`);
    return res.data;
  });

  const formUpload = useForm({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: uploadImage,
  });

  const handleChange = (name, value) => {
    formUpload.setValue(name, value);
  };

  const mutationFile = useMutation({
    mutationFn: async (file) => {
      console.log(file);
      return postAPIFormData(`user/upload-image/${userId}`, file, refineToken);
    },
  });

  const onSubmitUpload = (values) => {
    const formData = new FormData();
    formData.append("file", values.file);
    mutationFile.mutate({
      ...values,
    });
  };

  useEffect(() => {
    refetch();
  }, [mutationFile, refetch]);
  console.log(user);
  return (
    isFetched && (
      <div className="w-full space-y-4 border rounded-md p-4 flex ">
        <div>
          <img className="w-[300px] h-[300px]" src={user.image_url} alt="" />
          <Form {...formUpload}>
            <form
              onSubmit={formUpload.handleSubmit(onSubmitUpload, (err) => console.log(err))}
              encType="multipart/form-data"
            >
              <div className="flex gap-4 w-full">
                <FormField
                  control={formUpload.control}
                  name="file"
                  render={() => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="name" className="font font-semibold pt-6">
                        Select File
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          id="file"
                          form={formUpload}
                          onChange={(value) => handleChange("file", value.target.files[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isAdmin}
                className="mt-4  bg-primary hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
                type="submit"
                onClick={dispathc(setRand(Math.random()))}
              >
                {mutationFile.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                {mutationFile.isLoading ? "upload..." : "Upload Image"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="pl-8 flex justify-around w-full">
          <div className="">
            <Label className="font-semibold text-xl">Name</Label>
            <p className="mb-8">{user.fullname}</p>
            <Label className="font-semibold text-xl">Email</Label>
            <p className="mb-8">{user.email}</p>
            <Label className="font-semibold text-xl">Birthdate</Label>
            <p className="mb-8">{user.birthdate.length < 1 ? "uknow" : user.birthdate}</p>
            <Label className="font-semibold text-xl">Phone Number</Label>
            <p className="mb-8">{user.phone_number.length < 1 ? "uknow" : user.phone_number}</p>
          </div>
          <div className="">
            <Label className="font-semibold text-xl">Date Register</Label>
            <p className="mb-8">{user.createdAt}</p>
            <Label className="font-semibold text-xl">Role</Label>
            <p className="mb-8">{user.roleId === 1 ? "admin" : "cashier"}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
