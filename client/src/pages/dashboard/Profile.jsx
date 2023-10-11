import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";
import { postAPIFormData, getAPI } from "@/repositories/api";
import { uploadImageSchema } from "@/utils/schema";
import { decryptAES } from "@/utils/crypto";

const Profile = () => {
  const { userId, token } = useContext(AuthContext);
  // const refineToken = decryptAES(token);

  const uploadImage = {
    file: "",
  };

  const refineToken = decryptAES(token);
  const { data: user, isFetched } = useQuery(
    ["user"],
    async () => {
      const res = await getAPI(`user/${userId}`);
      return res.data;
    },
    { refetchInterval: 2000 }
  );

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

  return (
    isFetched && (
      <div className="w-full space-y-4 border rounded-md p-4">
        <div>
          <img className="w-[300px] h-[300px]" src={user.image_url} alt="" />
        </div>

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
                    <FormLabel htmlFor="name">Select File</FormLabel>
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
              className="mt-4  bg-primary hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
              type="submit"
            >
              {mutationFile.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
              {mutationFile.isLoading ? "upload..." : "Upload Image"}
            </Button>
          </form>
        </Form>
      </div>
    )
  );
};

export default Profile;
