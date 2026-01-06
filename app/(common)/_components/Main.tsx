import HeroSection from './Hero-Section';
import HeroFollower from './Hero-Follower';

export default async function Main() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full lg:min-h-screen flex flex-col">
        <HeroSection />
      </div>
      <HeroFollower />
    </div>
  );
}
