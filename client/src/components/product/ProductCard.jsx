import placeholder from "../../../public/placeholder.jpg"

const ProductCard = () => {
  const imageUrl = placeholder
  return (
    <div className="flex flex-col space-y-2 col-span-1 bg-[#2d2d2d] p-2 rounded-lg relative w-80">
      <div
        className="h-40 w-full bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
        alt="placeholder"
      ></div>
      <div className="flex items-center">
        <span className="text-lg text-slate-50">Name</span>
        <span className="ml-2 text-stone-400 text-[10px]">description</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">Rp. 10.000</span>
      </div>
    </div>
  )
}

export default ProductCard
