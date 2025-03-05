'use client';

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  tabOptions?: { id: number, title: string; }[];
  currentTab?: number;
}

const tabOptsDefault = new Array(4).fill(0).map((_, index) => ({ id: index + 1, title: `Tab ${index + 1}` }));

export const TabBar = ({ tabOptions = tabOptsDefault, currentTab = tabOptsDefault[0].id }: Props) => {

  const router = useRouter();

  const [selected, setSelected] = useState(tabOptions.some((tab) => tab.id === currentTab) ? currentTab : tabOptions[0].id);

  const handleTabChange = (tabId: number) => {
    setSelected(tabId);
    setCookie("currentTab", tabId.toString());
    router.refresh();
  };

  return (
    <div className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}>
      {
        tabOptions.map((tab, index) => (
          <div key={index} className="flex justify-center items-center">
            <input
              checked={selected === tab.id}
              onClick={handleTabChange.bind(null, tab.id)}
              type="radio"
              id={`${tab.id}`}
              className="peer hidden"
            />
            <label
              htmlFor={`${tab.id}`}
              className="transition-all w-full block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {tab.title}
            </label>
          </div>
        ))
      }
    </div>
  );
};