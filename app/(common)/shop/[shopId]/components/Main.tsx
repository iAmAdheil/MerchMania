import { ProductCardSchema, ShopDetailsSchema } from "@/types";

import Header from "./Header";
import Banner from "./Banner";
import Tabs from "./Tabs";

interface Props {
  shopDetails: ShopDetailsSchema | null;
  products: ProductCardSchema[];
}

function Main({ shopDetails, products }: Props) {
  return (
    <div className="relative w-full min-h-36 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-24 py-16">
      <Banner banner={shopDetails?.banner || ''} />
      <div className="relative w-full flex flex-col gap-10">
        <Header shopDetails={shopDetails} />
        <Tabs productCount={products.length} products={products} shopDetails={shopDetails} />
      </div>
    </div>
  )
}

export default Main
