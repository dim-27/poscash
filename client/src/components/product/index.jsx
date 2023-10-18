import { useState, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAPI } from "@/repositories/api"
import { AuthContext } from "@/components/auth/AuthContext"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "lucide-react"
import ProductListCategory from "./ProductListCategory"
import ProductList from "./ProductList"
import ManageCategory from "./manageCategory"

const Product = () => {
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

  const { data: categories, isFetched } = useQuery(
    ["categories"],
    async () => {
      const res = await getAPI(`category`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )
  const [tab, setTab] = useState("all")

  const { data: all, isFetched: allFetched } = useQuery(
    ["products/all"],
    async () => {
      const res = await getAPI(`product`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )

  return (
    <Tabs
      defaultValue="all"
      value={tab}
      onValueChange={setTab}
      className="flex flex-col h-full pt-4"
    >
      <TabsList className="flex gap-4 bg-inherit">
        <TabsTrigger
          className="p-2 px-4 rounded-full hover:ring-1 hover:ring-gray-600 data-[state=active]:border-gray-600 data-[state=active]:border data-[state=active]:text-gray-600 data-[state=active]:font-bold"
          value="all"
        >
          All
        </TabsTrigger>
        {isFetched &&
          categories.map((category) => (
            <TabsTrigger
              className="p-2 px-4 rounded-full hover:ring-1 hover:ring-gray-600 data-[state=active]:border-gray-600 data-[state=active]:border data-[state=active]:text-gray-600 data-[state=active]:font-bold"
              key={category.id}
              value={category.category}
            >
              {category.category}
            </TabsTrigger>
          ))}
        {role === 1 && (
          <TabsTrigger
            className="p-2 px-2 rounded-full hover:ring-1 hover:ring-gray-600 data-[state=active]:border-gray-600 data-[state=active]:border data-[state=active]:text-gray-600 data-[state=active]:font-bold"
            value="settings"
          >
            <Settings />
          </TabsTrigger>
        )}
      </TabsList>
      <ProductList value="all" role={role} data={allFetched && all} />
      {isFetched &&
        categories.map((category) => (
          <ProductListCategory
            key={category.id}
            role={role}
            category={category}
          />
        ))}
      <ManageCategory value="settings" data={isFetched && categories} />
    </Tabs>
  )
}

export default Product
