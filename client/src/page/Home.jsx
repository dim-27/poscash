import ProductCard from "../components/product/ProductCard"
import Category from "../components/product/Category"

const Home = () => {
  const categories = ["All", "Promo", "Foods", "Drinks", "Dessert"]
  // const products = [{},{}]

  return (
    <div>
      <h2>Category :</h2>
      <div className="flex justify-center">
        {categories.map((category, i) => (
          <Category key={i} category={category} />
        ))}
      </div>
      <h2>Product List :</h2>
      <div className="grid grid-cols-2 gap-2 overflow-auto mr-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default Home
