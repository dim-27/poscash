import { ShoppingBasket } from "lucide-react"

const Order = () => {
  return (
    <div className="p-4 bg-slate-200 w-1/3">
      <span className="w-6">
        <div className="flex items-center border bg-slate-50 rounded-2xl p-2">
          <ShoppingBasket size={40} />
          <p className="text-3xl font-bold ml-2">0</p>
        </div>
      </span>
    </div>
  )
}

export default Order
