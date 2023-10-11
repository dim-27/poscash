import Category from "./Category"
import ProductList from "./ProductList"

const Product = () => {
  const categories = ["All", "Promo", "Foods", "Drinks", "Dessert"]

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-center">
        {categories.map((category, i) => (
          <Category key={i} category={category} />
        ))}
      </div>
      <div className="flex-grow overflow-hidden">
        <ProductList />
      </div>
    </div>
  )
}

export default Product
