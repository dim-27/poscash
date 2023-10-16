import { Utensils, Pizza, GlassWater, IceCream2 } from "lucide-react"
import PropTypes from "prop-types"

const Category = ({ category }) => {
  return (
    <div className="flex group text-center flex-col items-center mt-4 mx-2 cursor-pointer">
      <div className="h-14 px-4 border rounded-full grid place-content-center">
        <span className="flex transform transition-all duration-100 group-hover:-translate-y-[2px]">
          {category === "dessert" ? (
            <IceCream2 />
          ) : category === "food" ? (
            <Pizza />
          ) : category === "drink" ? (
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

Category.propTypes = {
  category: PropTypes.any,
}

export default Category
