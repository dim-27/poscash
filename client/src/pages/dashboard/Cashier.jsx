import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CashierList from "@/components/dashboard/CashierList";
import { Link } from "react-router-dom";

const Cashier = () => {
  const [page, setPage] = useState(1);
  const {
    data: cashiers,
    isFetched,
    refetch,
  } = useQuery(
    ["cashier"],
    async () => {
      const res = await getAPI(`user?roleId=2&limit=10&page=${page}`);
      return res.data;
    },
    { refetchOnWindowFocus: false }
  );

  let arrButton = [];
  const totalPage = isFetched && Math.ceil(cashiers.count / 10);
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
       <div className="flex items-left justify-between">
        <Link to={`/dashboard/cashier/add`} className="flex items-center gap-2">
            <button className="mt-5 bg-blue-500 w-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Cashier
            </button>
        </Link>
      </div>
      <div>
        <Table>
          <TableHeader className="text-left">
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Settings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetched && cashiers.map((cashier, i) => <CashierList key={cashier.id} cashier={cashier} index={i}/>)}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex justify-center mt-10">{arrButton}</div> */}
    </div>
  );
};

export default Cashier;
