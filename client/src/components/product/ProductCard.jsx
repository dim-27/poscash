import { useState } from "react"
import { useDispatch } from "react-redux"
import { incrementQuantity, decrementQuantity } from "@/features/globalReducer"
import { FormatToIDR } from "@/lib/utils"
import { Settings, Trash, ShoppingBasket } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { postAPI } from "@/repositories/api"
import { useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "../auth/AuthContext"
import { Button } from "../ui/button"
import { setRand } from "@/features/globalReducer"
import ManageProduct from "./manageProduct/ManageProduct"
import DeleteProduct from "./manageProduct/DeleteProduct"

const ProductCard = ({ product, role }) => {
  const { userId } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)

  const handleIncrement = () => {
    dispatch(incrementQuantity())
    setTotal(total + 1)
  }

  const handleDecrement = () => {
    if (total > 0) {
      dispatch(decrementQuantity())
      setTotal(total - 1)
    }
  }

  const randd = Math.random()
  const mutation = useMutation({
    mutationFn: async (data) => {
      dispatch(setRand(randd))
      return await postAPI(`cart`, data)
    },
  })

  const addCart = async () => {
    mutation.mutate({ userId: userId, productId: product.id, quantity: total })
  }

  return (
    <div className="flex flex-col p-2 space-y-2 rounded-2xl bg-gray-500 hover:bg-gray-600  shadow-xl mx-auto 2xl:w-5/6 xl:w-72 sm:w-80">
      <div
        className="h-40 w-full bg-gray-300 rounded-xl overflow-hidden"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="justify-between items-center px-1">
        <div className="flex justify-between items-start">
          <span className="text-lg text-slate-50">{product.name}</span>
          <span className="text-white font-bold">
            {FormatToIDR(product.price)}
          </span>
        </div>
        {role === 1 ? (
          <div className="flex justify-between items-center my-2">
            <Dialog>
              <DialogTrigger>
                <div className="p-2 group rounded-full bg-red-600 cursor-pointer items-center">
                  <div className="group-hover:-translate-y-[1px]">
                    <Trash />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DeleteProduct product={product} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div className="p-2 group rounded-full bg-gray-400 cursor-pointer items-center">
                  <div className="group-hover:-translate-y-[1px]">
                    <Settings />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <ManageProduct product={product} action="edit" />
              </DialogContent>
            </Dialog>
          </div>
        ) : role === 2 ? (
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center">
              <Button
                onClick={handleDecrement}
                className="px-4 rounded-2xl bg-gray-400 cursor-pointer text-2xl font-bold"
                disabled={total <= 0}
              >
                -
              </Button>
              <p className="mx-2 w-6 text-center text-2xl">{total}</p>
              <Button
                onClick={handleIncrement}
                className="px-4 rounded-2xl bg-gray-400 cursor-pointer text-2xl font-bold"
              >
                +
              </Button>
            </div>

            <ShoppingBasket
              disabled={total !== 0}
              size={40}
              color="red"
              className="bg-white rounded-full cursor-pointer p-1"
              onClick={() => {
                if (total > 0) {
                  addCart()
                }
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
