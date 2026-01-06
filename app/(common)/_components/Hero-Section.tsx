import LeftHero from './Left-Hero-Section';
import RightHero from './Right-Hero-Section';
import FeaturesMarquee from './Features-Marquee';

export default function HeroSection() {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="w-full h-full flex-1 flex flex-col lg:flex-row lg:items-center bg-purple-100">
        <div className="w-full h-full flex-1 flex flex-col">
          <LeftHero />
        </div>
        <div className="w-full h-full flex-1">
          <RightHero />
        </div>
      </div>
      <FeaturesMarquee />
    </div>
  );
}
