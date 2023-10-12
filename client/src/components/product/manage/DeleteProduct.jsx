import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useMutation } from "@tanstack/react-query"
import { deleteAPI } from "@/repositories/api"
import { decryptAES } from "@/utils/crypto"
import { useContext } from "react"
import { AuthContext } from "@/components/auth/AuthContext"

const DeleteProduct = ({ product }) => {
  const { token } = useContext(AuthContext)
  const refineToken = decryptAES(token)
  const mutation = useMutation({
    mutationFn: () => {
      const productId = product.id
      return deleteAPI(`product/${productId}`, refineToken)
    },
  })

  const onClick = () => {
    mutation.mutate()
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogDescription>
          You are about to delete product Id : {product.id}
        </DialogDescription>
      </DialogHeader>
      <span className="flex justify-center gap-4">
        <div
          className="text-2xl w-20 py-2 bg-red-500 hover:bg-red-600 rounded-full text-center cursor-pointer"
          onClick={onClick}
        >
          Yes
        </div>
        <DialogClose>
          <div className="text-2xl w-20 py-2 bg-gray-500 hover:bg-gray-600 rounded-full text-center">
            No
          </div>
        </DialogClose>
      </span>
    </>
  )
}

export default DeleteProduct
