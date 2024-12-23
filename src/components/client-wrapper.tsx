"use client";
import React from "react";
import dynamic from "next/dynamic";

type WrapperProps = {
  data: { value: number; date: string }[];
};

const Wrapper = ({ data }: WrapperProps) => {
  const MyChart = dynamic(() => import("@/components/chart"), {
    ssr: false,
  });

  return (
    <div>
      <MyChart data={data} />
    </div>
  );
};

export default Wrapper;
