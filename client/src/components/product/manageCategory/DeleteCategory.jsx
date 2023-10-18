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

const DeleteCategory = ({ category }) => {
  const { token } = useContext(AuthContext)
  const refineToken = decryptAES(token)
  console.log(category.id)
  const mutation = useMutation({
    mutationFn: () => {
      const categoryId = category.id
      return deleteAPI(`category/${categoryId}`, refineToken)
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
        <DialogTitle>
          Are you sure you want to delete this category?
        </DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          category {category.id} and remove your category from our servers.
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

DeleteCategory.propTypes = {
  category: PropTypes.any,
}

export default DeleteCategory
