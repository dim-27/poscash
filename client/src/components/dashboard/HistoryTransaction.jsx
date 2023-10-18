import { TableCell, TableRow } from "@/components/ui/table";
import { FormatToIDR } from "@/lib/utils";

const HistoryTransaction = ({ history, index }) => {
  const date = new Date(history.date).toLocaleDateString("en-US");
  return (
    <TableRow>
      <TableCell className="w-1/12 font-semibold">{index + 1}</TableCell>
      <TableCell className="w-1/12 font-medium">{`INV00${history.id}`}</TableCell>
      <TableCell className="w-2/12">{date}</TableCell>
      <TableCell className="w-2/12">{history.name}</TableCell>
      <div>
        <TableCell className="w-2/12 text-right md:pr-16">{FormatToIDR(history.price)}</TableCell>
      </div>
      <TableCell className="w-1/12 text-right">{history.qty}</TableCell>
      <TableCell className="w-3/12 text-right">{FormatToIDR(history.total_price)}</TableCell>
    </TableRow>
  );
};

export default HistoryTransaction;
