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
import PropTypes from "prop-types"

const DeleteProduct = ({ product }) => {
  const { token } = useContext(AuthContext)
  const refineToken = decryptAES(token)
  const mutation = useMutation({
    mutationFn: () => {
      const productId = product.id
      return deleteAPI(`product/${productId}`, refineToken)
    },
    onSuccess: () => {
      location.reload()
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
          This action cannot be undone. This will permanently delete your
          product {product.id} and remove your product from our servers.
        </DialogDescription>
      </DialogHeader>
      <span className="flex justify-center gap-10 mt-2">
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

DeleteProduct.propTypes = {
  product: PropTypes.any,
}

export default DeleteProduct
