import { Label } from "@/components/ui/label";
import { getAPI } from "@/repositories/api";
import { Overview } from "@/components/dashboard/Chart";
import { useQuery } from "@tanstack/react-query";

const Sales = () => {
  const today = new Date().toLocaleDateString("en-US");
  const { data: sales, isFetched } = useQuery(["sales"], async () => {
    const res = await getAPI(`order/item?date=${today}`);
    return res.data;
  });

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // let data = [];
  // for (let i = 0; i < 7; i++) {
  //   const total =
  //     isFetched &&
  //     sales.rows
  //       .map((item) => {
  //         if (new Date(item.date).getDay() === i) {
  //           const total = item.qty * item.price;
  //           return total;
  //         } else {
  //           return 0;
  //         }
  //       })
  //       .reduce((a, b) => a + b);
  //   const agregate = { revenue: total, date: days[i] };
  //   data.push(agregate);
  // }

  const endDate = new Date();
  const startDate = new Date().getTime() - 7 * 24 * 36 * 1e5;
  let loop = new Date(startDate);
  let data = [];
  while (loop < endDate) {
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    const revenue =
      isFetched &&
      sales.rows.length > 0 &&
      sales.rows
        .map((item) => {
          if (new Date(item.date).toLocaleDateString("en-US") === loop.toLocaleDateString("en-US")) {
            const total = item.qty * item.price;
            return total;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => a + b);
    data.push({ date: loop.toLocaleDateString("en-US"), revenue: revenue });
  }
  return (
    isFetched && (
      <div>
        <Label className="text-2xl font-semibold mb-24">Sales Per Day</Label>
        <div className="mt-24">
          <Overview data={data} />
        </div>
      </div>
    )
  );
};

export default Sales;
