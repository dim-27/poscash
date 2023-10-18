import { Label } from "@/components/ui/label";
import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import SalesChart from "@/components/dashboard/SalesChart";

const Sales = () => {
  const today = new Date().toLocaleDateString("en-US");
  const { data: sales, isFetched } = useQuery(["sales"], async () => {
    const res = await getAPI(`order/sales?date=${today}`);
    return res.data;
  });
  console.log("today", today);
  console.log("today", isFetched && sales);
  return (
    isFetched && (
      <div>
        <Label className="text-2xl font-semibold mb-24">Sales Per Day</Label>
        <div className="mt-24">
          <SalesChart isFetched={isFetched} sales={sales} />
        </div>
      </div>
    )
  );
};

export default Sales;
