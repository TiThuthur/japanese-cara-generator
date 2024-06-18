"use client";

import Image from "next/image";
import { hiraganaGliph } from "../model/hiraganaGliph";
import { katakanaGliph } from "../model/katakanaGliph";
import { useState } from "react";
import { Button, Menu, Card } from "antd";

const items = [
  { label: "Hiragana", key: "hiragana" },
  { label: "Katakana", key: "katakana" },
];

export default function Home() {
  const [current, setCurrent] = useState("hiragana");
  const [hiraganaGliphObject, setHiraganaGliphObject] = useState<{[syllabes:string]:string}>(hiraganaGliph);
  const [katakanaGliphObject, setKatakanaGliphObject] = useState<{[syllabes:string]:string}>(katakanaGliph);
  const [objectGliph, setObjectGliph] = useState<{[syllabes:string]:string}>(hiraganaGliphObject);
  const [index, setIndex] = useState<number>(0);
  const [key,setKey] = useState<string>("a")

  const attributionObject = (current: string) => {
    if (current === "hiragana") {
      console.log("hiragana")
      setObjectGliph(hiraganaGliph);
    }else if (current === "katakana") {
      console.log("katakana")
      setObjectGliph(katakanaGliph);
    }
  };

  const newKey = () => {
    setIndex(Math.floor(Math.random() * Object.keys(objectGliph).length));
    setKey(Object.keys(objectGliph)[index])
  }
  
  const deleteItem = (key: string )=>{
    const {[key]:_,...newItem} = objectGliph
    setObjectGliph(newItem);
  }

  const onClickWithDelete = (e: any) => {
    let key = Object.keys(objectGliph)[index]
    deleteItem(key)
    newKey()
  };
  const onClickNoSlice = (e: any) => {
    setCurrent(e.key);
    attributionObject(e.key);
    newKey()
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
          {objectGliph[key]}
        </Card>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="large"
            onClick={onClickWithDelete}
          >
            Next
          </Button>
          
        </div>
      </main>
      <Card title={current} className="text-wrap">
        <div className=" grid grid-cols-10 gap-2">
          {Object.entries(objectGliph).map(([key,item], index) => (
            <p key={key} className={index % 2===0 ? "text-red-700":"text-emerald-700"}>{item},</p>
          ))}
        </div>
      </Card>
    </div>
  );
}
