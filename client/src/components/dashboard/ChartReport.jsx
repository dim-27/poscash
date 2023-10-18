import { Overview } from "./Chart";

const ChartReport = ({ end, start, isFetched, report }) => {
  const endDate = new Date(end);
  const startDate = new Date(start).getTime() - 24 * 3600 * 1e3;
  let loop = new Date(startDate);
  let data = [];
  while (loop < endDate) {
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    const revenue =
      isFetched &&
      report.rows.length > 0 &&
      report.rows
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
    <div>
      <Overview data={data} />
    </div>
  );
};

export default ChartReport;
