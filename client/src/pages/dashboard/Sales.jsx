import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import SalesChart from "@/components/dashboard/SalesChart";

const Sales = () => {
  const today = new Date().toLocaleDateString("en-US");
  const { data: sales, isFetched } = useQuery(["sales"], async () => {
    const res = await getAPI(`order/sales?date=${today}`);
    return res.data;
  });
  return (
    isFetched && (
      <div>
        <p className="text-2xl font-semibold mb-6">Sales Per Day</p>
        <SalesChart isFetched={isFetched} sales={sales} />
      </div>
    )
  );
};

export default Sales;
