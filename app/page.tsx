"use client";

import Image from "next/image";
import { hiragana } from "./model/hiragana";
import { katakana } from "./model/katakana";
import { useState } from "react";
import { Button, Menu, Card } from "antd";

const items = [
  { label: "Hiragana", key: "hiragana" },
  { label: "Katakana", key: "katakana" },
];

export default function Home() {
  const [current, setCurrent] = useState("hiragana");
  const [hiraganaList, setHiraganaList] = useState<string[]>(hiragana);
  const [katakanaList, setKatakanaList] = useState<string[]>(katakana);
  const [list, setList] = useState<string[]>(hiraganaList);
  const [index, setIndex] = useState<number>(0);
  

  const attributionList = (current: string) => {
    if (current === "hiragana") {
      console.log("hiragana")
      setList(hiragana);
    }else if (current === "katakana") {
      console.log("katakana")
      setList(katakana);
    }
  };

  const newIndex = () => {
    setIndex(Math.floor(Math.random() * list.length));
  }
  
  const sliceList = ()=>{
    setList(list.slice(0, index).concat(list.slice(index+1)));
    console.log(list);
  }

  const onClickWithSlice = (e: any) => {
    newIndex()
    sliceList()
  };
  const onClickNoSlice = (e: any) => {
    setCurrent(e.key);
    attributionList(e.key);
    newIndex()
  };

  const onRegen = () => {
    setHiraganaList(hiragana);
    setKatakanaList(katakana);
    attributionList(current);
  };

  return (
    <div className="flex items-center justify-around p-12">
      <main className="flex min-h-screen flex-col items-center justify-around p-12">
        <Menu
          onClick={onClickNoSlice}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          theme="light"
          className="rounded"
        />

        <Card
          title={current}
          className={"size-60 rounded-lg border border-slate-400 bg-slate-200 p-2 text-center text-7xl " + (index % 2 ===0 ? "text-red-700":"text-emerald-700")}>
          {list[index]}
        </Card>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="large"
            onClick={onClickWithSlice}
          >
            Next
          </Button>
          <Button size="large" onClick={onRegen}>
            Regen
          </Button>
        </div>
      </main>
      <Card title={current} className="text-wrap">
        <div className=" grid grid-cols-10 gap-2">
          {list.map((item, index) => (
            <p key={index} className={index % 2===0 ? "text-red-700":"text-emerald-700"}>{item},</p>
          ))}
        </div>
      </Card>
    </div>
  );
}
