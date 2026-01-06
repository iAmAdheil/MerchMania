import Marquee from 'react-fast-marquee';

const MARQUEE_SECTIONS = [
  {
    icon: '🔥',
    text: 'Free shipping on orders over $50',
  },
  {
    icon: '⚡',
    text: 'New creator drops every week',
  },
  {
    icon: '💯',
    text: '100% quality guarantee',
  },
  {
    icon: '🎁',
    text: 'Exclusive limited edition designs',
  },
];

export default function FeaturesMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-orange-500">
      <Marquee pauseOnHover={true} autoFill={true} className="bg-transparent">
        <div className="mx-5 py-3 flex flex-row gap-10">
          {MARQUEE_SECTIONS.map((section, index) => {
            return (
              <span key={index} className="flex flex-row items-center gap-3">
                <div className="text-base lg:text-lg">{section.icon}</div>
                <p className="text-sm lg:text-base text-white">{section.text}</p>
              </span>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
}
