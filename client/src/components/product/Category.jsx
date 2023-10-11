import { IceCream2, Utensils, Pizza, GlassWater, Percent } from "lucide-react"

const Category = ({ category }) => {
  return (
    <div className="flex group text-center flex-col items-center mt-4 mx-2 cursor-pointer">
      <div className="h-14 px-4 border rounded-full grid place-content-center">
        <span className="flex transform transition-all duration-100 group-hover:-translate-y-[2px]">
          {category === "Promo" ? (
            <Percent />
          ) : category === "Dessert" ? (
            <IceCream2 />
          ) : category === "Foods" ? (
            <Pizza />
          ) : category === "Drinks" ? (
            <GlassWater />
          ) : (
            <Utensils />
          )}
          <span className="whitespace-break-spaces font-semibold ml-2">
            {category}
          </span>
        </span>
      </div>
    </div>
  )
}

export default Category
