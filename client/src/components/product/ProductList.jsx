import { useState, useContext } from "react"
import { selectIsSearch, selectSearchQuery } from "@/features/globalReducer"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getAPI } from "@/repositories/api"
import { AuthContext } from "@/components/auth/AuthContext"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ListRestart, CircleDollarSign, MoveUp, MoveDown } from "lucide-react"
import ProductCard from "./ProductCard"
import ManageProduct from "./manage/ManageProduct"

const productsPerPage = 10

const ProductList = ({ value, data }) => {
  const { userId } = useContext(AuthContext)
  const { data: user, isFetched: userFetched } = useQuery(
    ["user-profile"],
    async () => {
      const res = await getAPI(`user/${userId}`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )
  const role = userFetched && user?.roleId
  const [currentPage, setCurrentPage] = useState(1)

  const searchQuery = useSelector(selectSearchQuery)
  const isSearch = useSelector(selectIsSearch)
  const totalProducts = data.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const [sortName, setSortName] = useState("asc")
  const [sortPrice, setSortPrice] = useState("asc")

  const products = data
    ? isSearch
      ? data.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data
    : []

  const handleSort = (sortBy) => {
    if (sortBy === "name") {
      setSortName(sortName === "asc" ? "desc" : "asc")
      products.sort((a, b) => {
        if (sortName === "asc") {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
    } else if (sortBy === "price") {
      setSortPrice(sortPrice === "asc" ? "desc" : "asc")
      products.sort((a, b) => {
        if (sortPrice === "asc") {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    }
  }

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <TabsContent value={value} className="px-4">
      <span className="flex gap-2 ml-4 mb-4">
        <Button
          className="p-3 bg-gray-500 rounded-full"
          onClick={() => location.reload()}
        >
          <ListRestart />
        </Button>
        <Button
          className="p-3 bg-gray-500 rounded-full"
          onClick={() => handleSort("name")}
        >
          A-Z{" "}
          {sortName === "asc" ? <MoveDown size={15} /> : <MoveUp size={15} />}
        </Button>
        <Button
          className="p-3 bg-gray-500 rounded-full"
          onClick={() => handleSort("price")}
        >
          <CircleDollarSign size={20} />
          {sortPrice === "asc" ? <MoveDown size={15} /> : <MoveUp size={15} />}
        </Button>
      </span>
      <div className="overflow-auto h-[600px]">
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {paginatedProducts.map((product, i) => (
            <ProductCard key={i} product={product} role={role} />
          ))}
          {role !== 1 && products.length === 0 && (
            <div className="text-xl ml-4">No Products</div>
          )}
          {role === 1 && (
            <Dialog>
              <DialogTrigger>
                <div className="h-[265px] flex justify-center items-center rounded-2xl bg-gray-500 hover:bg-gray-600 shadow-xl mx-auto 2xl:w-5/6 xl:w-72 sm:w-80 text-9xl opacity-70">
                  +
                </div>
              </DialogTrigger>
              <DialogContent>
                <ManageProduct action="create" />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 p-4">
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
          onClick={() => {
            handlePageChange(currentPage + 1)
          }}
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
    </TabsContent>
  )
}

export default ProductList
