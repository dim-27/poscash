import { TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Settings, Trash, Plus } from "lucide-react"
import CategoryForm from "./CategoryForm"
import DeleteCategory from "./DeleteCategory"

const ManageCategory = ({ value, data }) => {
  const categories = data ? data : []
  return (
    <TabsContent value={value} className="w-1/2 text-center mx-auto">
      <div className="flex justify-center text-2xl py-8">Category Settings</div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-lg font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-lg font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-lg font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 [&>*:nth-child(even)]:bg-gray-100">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 text-xl text-gray-900">{category.id}</td>
              <td className="px-6 py-4 text-xl text-gray-900">
                {category.category}
              </td>
              <td className="py-4 flex justify-center gap-2">
                <Dialog>
                  <DialogTrigger>
                    <div className="p-2 group rounded-full bg-gray-400 cursor-pointer items-center">
                      <div className="group-hover:-translate-y-[1px]">
                        <Settings />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <CategoryForm category={category} action="edit" />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <div className="p-2 group rounded-full bg-red-600 cursor-pointer items-center">
                      <div className="group-hover:-translate-y-[1px]">
                        <Trash />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DeleteCategory category={category} />
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <Dialog>
          <DialogTrigger>
            <div className="p-4 rounded-full bg-gray-200 cursor-pointer items-center">
              <div className="flex gap-2 hover:-translate-y-[1px]">
                <Plus />
                <p>Add Category</p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <CategoryForm action="create" />
          </DialogContent>
        </Dialog>
      </div>
    </TabsContent>
  )
}

export default ManageCategory
