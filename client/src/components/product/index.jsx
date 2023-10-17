import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAPI } from "@/repositories/api"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductList from "./ProductList"

const Product = () => {
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
  const { data: food, isFetched: foodFetched } = useQuery(
    ["products/food"],
    async () => {
      const res = await getAPI(`product/category/1`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )
  const { data: drink, isFetched: drinkFetched } = useQuery(
    ["products/drink"],
    async () => {
      const res = await getAPI(`product/category/2`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )
  const { data: dessert, isFetched: dessertFetched } = useQuery(
    ["products/dessert"],
    async () => {
      const res = await getAPI(`product/category/3`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )

  return (
    <Tabs
      defaultValue="all"
      value={tab}
      onValueChange={setTab}
      className="flex flex-col h-full space-y-4 pt-4"
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
      </TabsList>
      <ProductList value="all" data={allFetched && all} />
      <ProductList value="food" data={foodFetched && food} />
      <ProductList value="drink" data={drinkFetched && drink} />
      <ProductList value="dessert" data={dessertFetched && dessert} />
    </Tabs>
  )
}

export default Product
