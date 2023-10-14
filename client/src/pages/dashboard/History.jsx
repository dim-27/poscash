import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import HistoryTransaction from "@/components/dashboard/HistoryTransaction";
import { useState } from "react";

const History = () => {
  const [page, setPage] = useState(1);
  const {
    data: histories,
    isFetched,
    refetch,
  } = useQuery(
    ["history"],
    async () => {
      const res = await getAPI(`order/item?limit=10&page=${page}`);
      return res.data;
    },
    { refetchOnWindowFocus: false }
  );

  let arrButton = [];
  const totalPage = isFetched && Math.ceil(histories.count / 10);
  for (let i = 1; i <= totalPage; i++) {
    arrButton.push(
      <Button
        className="bg-red-500 hover:bg-red-400 ease-in-out duration-300 mx-4"
        onClick={async () => {
          await refetch();
          setPage(i);
        }}
      >
        {i}
      </Button>
    );
  }
  return (
    <div className="h-screen">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetched && histories?.rows.map((history) => <HistoryTransaction key={history.id} history={history} />)}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-10">{arrButton}</div>
    </div>
  );
};

export default History;
