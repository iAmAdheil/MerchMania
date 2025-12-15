import LeftHero from './Left-HeroSection';
import RightHero from './Right-HeroSection';
import FeaturesMarquee from './FeaturesMarquee';

export default function HeroSection() {
  return (
    <div className="flex-1 h-full w-full flex flex-col justify-center">
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row lg:items-center bg-purple-100">
        <div className="flex-1 h-full w-full flex flex-col">
          <LeftHero />
        </div>
        <div className="flex-1 h-full w-full">
          <RightHero />
        </div>
      </div>
      <div className="w-full h-full">
        <FeaturesMarquee />
      </div>
    </div>
  );
}
