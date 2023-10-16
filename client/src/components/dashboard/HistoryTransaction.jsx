import { TableCell, TableRow } from "@/components/ui/table";
import { FormatToIDR } from "@/lib/utils";

const HistoryTransaction = ({ history }) => {
  return (
    <TableRow>
      <TableCell className="w-1/6 font-medium">{`INV00${history.id}`}</TableCell>
      <TableCell className="w/1/6">Paid</TableCell>
      <div>
        <TableCell className="text-right">{FormatToIDR(history.price)}</TableCell>
      </div>
      <TableCell className="text-right w-12">{history.qty}</TableCell>
      <TableCell className="w-2/6 text-right">{FormatToIDR(history.total_price)}</TableCell>
    </TableRow>
  );
};

export default HistoryTransaction;
