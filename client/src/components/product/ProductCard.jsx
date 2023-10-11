// import placeholder from "/placeholder.jpg"

const ProductCard = ({ product }) => {
  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg"
  // const image = placeholder
  return (
    <div className="flex flex-col space-y-2 col-span-1 bg-gray-500 p-2 rounded-lg relative w-72">
      <div
        className="h-40 w-full bg-cover bg-center rounded-lg"
        // style={{ backgroundImage: `url(${image})` }}
        style={{ backgroundImage: `url(${imageUrl})` }}
        alt="placeholder"
      ></div>
      <div className="flex items-center">
        <span className="text-lg text-slate-50">{product.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">{product.price}</span>
      </div>
    </div>
  )
}

export default ProductCard
