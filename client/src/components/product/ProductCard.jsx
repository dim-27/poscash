import { useState } from "react"
import { useDispatch } from "react-redux"
import { incrementQuantity, decrementQuantity } from "@/features/globalReducer"
import { FormatToIDR } from "@/lib/utils"
import { Settings, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ManageProduct from "./manage/ManageProduct"
import DeleteProduct from "./manage/DeleteProduct"
import PropTypes from "prop-types"

const ProductCard = ({ product, role }) => {
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

  return (
    <div className="flex flex-col space-y-2 col-span-1 bg-gray-500 hover:bg-gray-600 p-2 rounded-2xl relative w-72 shadow-xl">
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
      <div className="flex justify-between items-center pl-1">
        <div className="flex flex-col items-start">
          <span className="text-lg text-slate-50">{product.name}</span>
          <span className="text-white font-bold">
            {FormatToIDR(product.price)}
          </span>
        </div>
        {role === 1 ? (
          <div className="flex gap-2">
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
          <span className="flex items-center">
            <button
              onClick={handleDecrement}
              className="px-4 py-1 group rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold"
              disabled={total <= 0}
            >
              -
            </button>
            <p className="mx-2 text-2xl">{total}</p>
            <button
              onClick={handleIncrement}
              className="px-4 py-1 group rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold"
            >
              +
            </button>
          </span>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.any,
  role: PropTypes.any,
}

export default ProductCard
