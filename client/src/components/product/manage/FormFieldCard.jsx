import { Input } from "@/components/ui/input"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import PropTypes from "prop-types"

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

FormFieldCard.propTypes = {
  name: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
}

export default FormFieldCard
