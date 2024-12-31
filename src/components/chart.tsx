"use client";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";

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
        left: 5,
        right: 5,
        bottom: 5,
      }}
    >
      <Area type="natural" dataKey="value" stroke="#002cff" fill="#689eff" strokeWidth={0} />
    </AreaChart>
  );
};

export default Chart;
