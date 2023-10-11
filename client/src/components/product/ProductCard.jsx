import { FormatToIDR } from "@/lib/utils"
import { Settings } from "lucide-react"

const ProductCard = ({ product, role }) => {
  return (
    <div className="flex flex-col space-y-2 col-span-1 bg-gray-500 p-2 rounded-lg relative w-72">
      <div
        className="h-40 w-full bg-gray-300 rounded-lg overflow-hidden"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="text-lg text-slate-50">{product.name}</span>
          <span className="text-white font-bold">
            {FormatToIDR(product.price)}
          </span>
        </div>
        {role === "admin" ? (
          <div className="p-2 group rounded-full bg-gray-400 cursor-pointer">
            <div className="group-hover:-translate-y-[1px]">
              <Settings />
            </div>
          </div>
        ) : (
          <span className="flex items-center">
            <button className="px-4 py-1 group rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold">
              -
            </button>
            <p className="mx-2 text-2xl">{0}</p>
            <button className="px-4 py-1 group rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold">
              +
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard
