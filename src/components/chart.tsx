"use client";
import { AreaChart, Area } from "recharts";

type ChartProps = {
  data: { value: number, date: string }[]; // Adjust the type based on your data structure
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  console.log("data", data);

  return (
    <AreaChart
      width={300}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 20,
        bottom: 5,
      }}
    >
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default Chart;
