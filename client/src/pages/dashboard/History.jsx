import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import HistoryTransaction from "@/components/dashboard/HistoryTransaction";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLast, ChevronLeft, ChevronFirst } from "lucide-react";

const History = () => {
  const [page, setPage] = useState(1);
  const {
    data: histories,
    isFetched,
    refetch,
  } = useQuery(["history"], async () => {
    const res = await getAPI(`order/item?limit=10&page=${page}`);
    return res.data;
  });

  const totalPage = isFetched && Math.ceil(histories.count / 10);

  useEffect(() => {
    refetch();
  }, [page, histories, refetch]);

  return (
    <div className="h-screen">
      <div className="h-[80vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12">No.</TableHead>
              <TableHead className="w-1/12">Invoice</TableHead>
              <TableHead className="w-2/12">Date</TableHead>
              <TableHead className="w-2/12">Name</TableHead>
              <TableHead className="w-2/12 pl-16">Price</TableHead>
              <TableHead className="w-1/12 md:pl-12">Qty</TableHead>
              <TableHead className="w-3/12 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetched &&
              histories?.rows.map((history, i) => <HistoryTransaction key={history.id} history={history} index={i} />)}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center">
        <Button
          disabled={page <= 1}
          className="mx-2"
          onClick={async () => {
            setPage(1);
          }}
        >
          <ChevronFirst />
        </Button>
        <Button
          disabled={page <= 1}
          className="mx-2"
          onClick={async () => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          <ChevronLeft />
        </Button>
        <span className="text-2xl font-medium mx-4">{page}</span>
        <Button
          disabled={page >= totalPage}
          className="mx-2"
          onClick={async () => {
            if (page < totalPage) {
              setPage(page + 1);
            }
          }}
        >
          <ChevronRight />
        </Button>
        <Button
          disabled={page >= totalPage}
          className="mx-2"
          onClick={async () => {
            setPage(totalPage);
          }}
        >
          <ChevronLast />
        </Button>
      </div>
    </div>
  );
};

export default History;
