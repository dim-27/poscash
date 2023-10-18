import { stringify } from "csv-stringify";
import fs from "fs";

export const generateCSV = () => {
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let data = [];
  let columns = {
    productId: "productId",
    qty: "qty",
    date: "date",
  };

  for (var i = 0; i < 400; i++) {
    const qty = randomIntFromInterval(500, 1000);
    const product = randomIntFromInterval(1, 10);
    const millisTime = randomIntFromInterval(1696698000000, 1697648399000);
    data.push([product, qty, millisTime]);
  }

  stringify(data, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile("order-item.csv", output, (err) => {
      if (err) throw err;
      console.log("my.csv saved.");
    });
  });
};
