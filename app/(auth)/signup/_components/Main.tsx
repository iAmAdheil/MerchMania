import LeftSection from "./Left-Section";
import RightSection from "./Right-Section";

export type Display = 'creator' | 'customer' | 'options';

async function Main() {
  return (
    <div className="w-full flex lg:flex-row">
      <LeftSection />
      <RightSection />
    </div>
  );
}

export default Main;