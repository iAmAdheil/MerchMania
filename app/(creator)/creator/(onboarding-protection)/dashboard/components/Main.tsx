import { ShopDetailsSchema } from "@/types";

import Header from "./Header";
import Tabs from "./Tabs";

async function Main({ shopDetails }: { shopDetails: ShopDetailsSchema }) {
  return (
    <div className="w-full border-[0.5px] border-solid border-gray-300">
      <Header name={shopDetails.name} />
      <Tabs shopId={shopDetails.id as string} />
    </div>
  );
}

export default Main;