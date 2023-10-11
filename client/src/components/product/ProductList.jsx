import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAPI } from "@/repositories/api"
import ProductCard from "./ProductCard"

const productsPerPage = 10

const ProductList = () => {
  const { data, isFetched } = useQuery(
    ["products"],
    async () => {
      const res = await getAPI(`product`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )

  const [currentPage, setCurrentPage] = useState(1)
  const totalProducts = isFetched && data.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const fetchProducts = (page) => {
    const products = []
    const startIndex = (page - 1) * productsPerPage
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts)

    for (let i = startIndex; i < endIndex; i++) {
      products.push(isFetched && data[i])
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
            <ProductCard key={i} product={product} role="cashier" />
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
