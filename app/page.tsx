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
  const [list, setList] = useState<string[]>(hiragana);
  const [index, setIndex] = useState<number>(0);

  const onClick = (e: any) => {
    setCurrent(e.key);
    setList(current === "hiragana" ? hiraganaList : katakanaList);
  };

  const onRegen = () => {
    setHiraganaList(hiragana);
    setKatakanaList(katakana);
  };

  return (
    <div className="flex items-center justify-around p-12">
      <main className="flex min-h-screen flex-col items-center justify-around p-12">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          theme="dark"
        />

        <Card
          title={current}
          className=" size-60 rounded-lg border border-slate-400 bg-slate-200 p-2 text-center text-7xl text-slate-900"
        >
          {list[index]}
        </Card>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="large"
            onClick={() => {
              setIndex(Math.floor(Math.random() * list.length));
              list.splice(index, 1);
              console.log(list);
            }}
          >
            Next
          </Button>
          <Button size="large" onClick={onRegen}>
            Regen
          </Button>
        </div>
      </main>
      <Card title={current}>{list}</Card>
    </div>
  );
}