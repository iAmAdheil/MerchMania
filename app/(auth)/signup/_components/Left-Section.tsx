import { Users, Star, Palette } from 'lucide-react';

const DETAILS = [
  {
    icon: Users,
    title: 'Join as Customer',
    description: 'Shop unique creator merchandise'
  },
  {
    icon: Star,
    title: 'Join as Creator',
    description: 'Start your merchandise empire'
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: 'Bring your vision to life'
  }
]

export default function LeftSection() {
  return (
    <div className="min-h-screen flex-1 w-full h-full py-12 px-8 bg-white bg-gradient-to-br from-purple-400 to-orange-400 hidden lg:flex">
      <div className="flex-1 w-full flex flex-col justify-center items-center gap-10">
        <h1 className="w-full flex flex-col gap-2 text-5xl font-bold text-white/80 text-center">
          Welcome to
          <br />
          <span className="text-black/80 text-6xl">
            MerchMania
          </span>
        </h1>
        <div className="w-full flex-col gap-6 max-w-[30rem] hidden lg:flex">
          {DETAILS.map((detail, index) => (
            <div key={index} className="flex flex-row items-center gap-6 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <detail.icon className="h-8 w-8 text-brand-orange" />
              <div className="text-left">
                <div className="text-lg font-semibold text-white">{detail.title}</div>
                <div className="text-sm text-white/80">{detail.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
