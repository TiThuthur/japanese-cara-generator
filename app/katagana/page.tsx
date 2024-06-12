"use client";

import Image from "next/image";
import { katagana } from "./model/katagana";
import { useState } from "react";
import { Button, Typography, Layout } from "antd";
const { Header, Content, Footer } = Layout;

export default function Home() {
  const [kataganaList, setKataganaList] = useState<string[]>(katagana);
  const [index, setIndex] = useState<number>(0);
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-12">
      <Typography.Title
        level={1}
        style={{ color: "white", fontWeight: "bold" }}
      >
        katagana
      </Typography.Title>
      <div className="flex size-60 flex-wrap items-center justify-center gap-4 rounded-lg border border-slate-400 bg-slate-200 p-2 text-7xl text-slate-900">
        {kataganaList[index]}
      </div>
      <Button size="large"
        onClick={() => {
          setIndex(Math.floor(Math.random() * kataganaList.length));
          kataganaList.splice(index, 1);
          console.log(kataganaList);
        }}
      >
        Next
      </Button>
    </main>
  );
}
