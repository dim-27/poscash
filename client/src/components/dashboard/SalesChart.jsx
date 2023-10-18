import { Overview } from "./Chart";

const SalesChart = ({ isFetched, sales }) => {
  const endDate = new Date();
  const startDate = new Date().getTime() - 7 * 24 * 36 * 1e5;
  let loop = new Date(startDate);
  let data = [];
  console.log(endDate);
  while (loop < endDate) {
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    // console.log(loop.toLocaleDateString("en-US"));
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
  // console.log(data);
  return (
    <div>
      <Overview data={data} />
    </div>
  );
};

export default SalesChart;
