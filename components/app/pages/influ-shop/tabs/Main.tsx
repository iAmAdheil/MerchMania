'use client'

import { useState } from "react";
import Tabs from "./Tabs";
import Products from "./Products";
import About from "./About";
import { ProductCardSchema, ShopDetailsSchema } from "@/types/types";

export type Tabs = 'products' | 'about';

interface Props {
  productCount: number;
  products: ProductCardSchema[];
  shopDetails: ShopDetailsSchema | null;
}

export default function Main({ productCount, products, shopDetails }: Props) {
  const [activeTab, setActiveTab] = useState<Tabs>('products');
  const handleTabChange = (tab: Tabs) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full flex flex-col gap-10 z-10">
      <Tabs productCount={productCount} activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className={`${activeTab === 'products' ? 'block' : 'hidden'} w-full`}>
        <Products products={products} />
      </div>
      <div className={`${activeTab === 'about' ? 'block' : 'hidden'} w-full`}>
        <About shopDetails={shopDetails} />
      </div>
    </div>
  )
}