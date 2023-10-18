import { useDispatch, useSelector } from "react-redux"
import {
  toggleSearch,
  setSearchQuery,
  selectSearchQuery,
} from "@/features/globalReducer"
import { Search } from "lucide-react"
import { Input } from "../ui/input"

const SearchInput = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    dispatch(setSearchQuery(value))
    dispatch(toggleSearch(true))
  }

  return (
    <div className="flex cursor-pointer bg-background border-slate-500 dark:border-border backdrop-blur-sm w-[350px] gap-2 rounded-xl items-center border p-1">
      <Search size={20} className="ml-2 text-slate dark:text-foreground" />
      <Input
        type="text"
        value={searchQuery}
        placeholder="Search for products by name"
        onChange={handleSearchInputChange}
        className="px-2 py-1 dark:text-foreground w-full border-none outline-none focus:outline-none"
      />
    </div>
  )
}

export default SearchInput
