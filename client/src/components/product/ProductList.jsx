import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

const productsPerPage = 10

const ProductList = () => {
  const data = [
    {
      name: "Pizza",
      description: "Delicious pepperoni pizza with mozzarella cheese.",
      price: 12.99,
    },
    {
      name: "Burger",
      description: "Classic beef burger with lettuce, tomato, and cheese.",
      price: 8.49,
    },
    {
      name: "Sushi",
      description: "Assortment of fresh sushi rolls with soy sauce and wasabi.",
      price: 15.99,
    },
    {
      name: "Pasta",
      description: "Spaghetti with marinara sauce and meatballs.",
      price: 10.99,
    },
    {
      name: "Salad",
      description:
        "Fresh garden salad with mixed greens and balsamic dressing.",
      price: 6.99,
    },
    {
      name: "Taco",
      description: "Soft tacos with seasoned ground beef and toppings.",
      price: 9.99,
    },
    {
      name: "Steak",
      description: "Juicy grilled steak with garlic butter and herbs.",
      price: 18.99,
    },
    {
      name: "Sushi",
      description: "Sashimi and nigiri sushi selection with pickled ginger.",
      price: 17.99,
    },
    {
      name: "Chicken Wings",
      description: "Crispy chicken wings with your choice of sauce.",
      price: 8.99,
    },
    {
      name: "Caesar Salad",
      description: "Classic Caesar salad with romaine lettuce and croutons.",
      price: 7.49,
    },
    {
      name: "Fish and Chips",
      description: "Beer-battered fish fillets with tartar sauce and fries.",
      price: 11.99,
    },
    {
      name: "Sushi",
      description: "Fresh salmon and avocado sushi rolls with eel sauce.",
      price: 14.99,
    },
    {
      name: "Pho",
      description: "Vietnamese noodle soup with beef and herbs.",
      price: 9.99,
    },
    {
      name: "Chicken Alfredo",
      description: "Creamy chicken Alfredo pasta with Parmesan cheese.",
      price: 13.49,
    },
    {
      name: "Burrito",
      description:
        "Giant burrito with rice, beans, and your choice of filling.",
      price: 10.99,
    },
    {
      name: "Shrimp Scampi",
      description: "Garlic butter shrimp served over linguine.",
      price: 14.99,
    },
    {
      name: "Miso Soup",
      description: "Traditional Japanese miso soup with tofu and seaweed.",
      price: 3.99,
    },
    {
      name: "Vegetable Stir-Fry",
      description: "Assorted vegetables stir-fried in a savory sauce.",
      price: 9.49,
    },
    {
      name: "Chicken Caesar Wrap",
      description: "Grilled chicken and Caesar dressing in a tortilla wrap.",
      price: 7.99,
    },
    {
      name: "Ramen",
      description: "Japanese ramen noodles in a rich broth with toppings.",
      price: 11.99,
    },
    {
      name: "Tiramisu",
      description:
        "Classic Italian tiramisu dessert with coffee and mascarpone.",
      price: 6.49,
    },
    {
      name: "Quesadilla",
      description: "Cheesy quesadilla with your choice of fillings.",
      price: 8.99,
    },
    {
      name: "Garden Burger",
      description: "Vegetarian burger with lettuce, tomato, and cheese.",
      price: 7.99,
    },
    {
      name: "Pad Thai",
      description: "Thai stir-fried noodles with shrimp and peanuts.",
      price: 12.99,
    },
    {
      name: "Cobb Salad",
      description: "Cobb salad with grilled chicken, bacon, and avocado.",
      price: 9.99,
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const totalProducts = data.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const fetchProducts = (page) => {
    const products = []
    const startIndex = (page - 1) * productsPerPage
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts)

    for (let i = startIndex; i < endIndex; i++) {
      products.push(data[i])
    }

    return products
  }

  const [products, setProducts] = useState(fetchProducts(currentPage))

  useEffect(() => {
    setProducts(fetchProducts(currentPage))
  }, [currentPage, totalProducts])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-auto h-[600px] p-4">
        <div className="grid grid-cols-4 gap-2">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-red-300 text-white cursor-not-allowed"
              : "bg-slate-500 text-white hover:bg-slate-600"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded mx-2 ${
              currentPage === i + 1
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-red-300 text-white"
              : "bg-slate-500 text-white hover:bg-slate-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductList
