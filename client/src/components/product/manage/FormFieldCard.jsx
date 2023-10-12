import { Input } from "@/components/ui/input"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const FormFieldCard = ({ name, label, type, form }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel htmlFor="imageUrl">{label}</FormLabel>
          <FormControl>
            <Input type={type} id={name} placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldCard
