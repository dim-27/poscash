import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { categorySchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import FormFieldCard from "../manageProduct/FormFieldCard"
import { postAPI, putAPI } from "@/repositories/api"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const CategoryForm = ({ action, category }) => {
  const initForm = {
    name: category ? category.category : "",
  }
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initForm,
  })

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (action === "create") {
        return postAPI("category", data)
      } else if (action === "edit" && category) {
        const categoryId = category.id
        return putAPI(`category/${categoryId}`, data)
      }
    },
    onSuccess: () => {
      location.reload()
    },
  })

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
    })
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(initForm)
    }
  }, [form])

  return (
    <div className="w-full overflow-hidden">
      <DialogHeader>
        <DialogTitle>
          {category ? `Edit Category Id : ${category.id}` : `Create Category`}
        </DialogTitle>
        <DialogDescription>
          {category
            ? "Make changes to your category here."
            : "Create a new category"}
        </DialogDescription>
      </DialogHeader>
      <div className="my-4">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
          >
            <div className="flex flex-col space-y-4 w-full">
              <FormFieldCard
                name="name"
                label="Category Name"
                type="text"
                form={form}
              />
              <div className="flex justify-center gap-2">
                <Button
                  className="w-24 text-xl bg-gray-500 rounded-lg hover:bg-gray-400 ease-in-out duration-300"
                  type="submit"
                >
                  {mutation.isLoading && (
                    <Loader2 className={`animate-spin w-4 h-4`} />
                  )}
                  {mutation.isLoading
                    ? action === "create"
                      ? "creating..."
                      : "saving..."
                    : action === "create"
                    ? "create"
                    : "save"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CategoryForm
