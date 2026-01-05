'use client'

import { useState } from "react";

import { ProductCardSchema, ShopDetailsSchema } from "@/types";

import TabButtons from "./Tab-Buttons";
import Products from "./Products";
import About from "./About";

export type Tabs = 'products' | 'about';

interface Props {
  productCount: number;
  products: ProductCardSchema[];
  shopDetails: ShopDetailsSchema | null;
}

export default function Tabs({ productCount, products, shopDetails }: Props) {
  const [activeTab, setActiveTab] = useState<Tabs>('products');
  const handleTabClick = (tab: Tabs) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full flex flex-col gap-10 z-10">
      <TabButtons productCount={productCount} activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className={`${activeTab === 'products' ? 'block' : 'hidden'} w-full`}>
        <Products products={products} />
      </div>
      <div className={`${activeTab === 'about' ? 'block' : 'hidden'} w-full`}>
        <About shopDetails={shopDetails} />
      </div>
    </div>
  )
}