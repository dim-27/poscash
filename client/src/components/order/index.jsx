import { ShoppingBasket } from "lucide-react"

const Order = () => {
  return (
    <div className="p-4 bg-slate-200 w-1/3">
      <div className="flex flex-start items-center cursor-pointer">
        <div className="h-14 p-2 border rounded-full place-content-center">
          <span className="flex transform transition-all duration-100 hover:-translate-y-[2px]">
            <ShoppingBasket size={32} />
            <p className="text-2xl font-bold ml-2">0</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Order
