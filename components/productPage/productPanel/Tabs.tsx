import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ product }: any) {
  let [categories] = useState({
    Description: product.description,
    "Product Specs": product.description,
  });

  return (
    <div className="w-full mt-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-black/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-black focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-800 hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-black/20 p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-black focus:outline-none focus:ring-2"
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: posts }} />

              <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-black/60"></p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
