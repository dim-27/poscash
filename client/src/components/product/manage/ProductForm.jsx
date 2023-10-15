import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { registerProductSchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import FormFieldCard from "./FormFieldCard"
// import { Toast } from "@/components/ui/toast"
import { postAPI, putAPI } from "@/repositories/api"
import PropTypes from "prop-types"

const RegisterProduct = ({ action, product }) => {
  const initForm = {
    name: product ? product.name : "",
    description: product ? product.description : "",
    imageUrl: product ? product.image_url : "",
    price: product ? product.price.toString() : "",
  }
  const form = useForm({
    resolver: zodResolver(registerProductSchema),
    defaultValues: initForm,
  })

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (action === "create") {
        return postAPI("product", data)
      } else if (action === "edit" && product) {
        const productId = product.id
        return putAPI(`product/${productId}`, data)
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
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
      >
        <div className="flex flex-col space-y-4 w-full">
          <span className="flex gap-4 w-full">
            <FormFieldCard
              name="name"
              label="Product Name"
              type="text"
              form={form}
            />
            <FormFieldCard
              name="price"
              label="Product Price"
              type="string"
              form={form}
            />
          </span>
          <FormFieldCard
            name="description"
            label="Product Description"
            type="text"
            form={form}
          />
          <FormFieldCard
            name="imageUrl"
            label="Product Image"
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
  )
}

RegisterProduct.propTypes = {
  action: PropTypes.any.isRequired,
  product: PropTypes.any,
}

export default RegisterProduct
