import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Overview = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          width={80}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Rp. ${value / 1e6} jt`}
        />
        <Tooltip />
        <Bar dataKey="revenue" fill="#0096FF" animationDuration={2000} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
