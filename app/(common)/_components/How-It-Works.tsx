import { CheckCircle2, Palette, Shirt, ShoppingBag } from 'lucide-react';

const steps = [
  {
    icon: <Palette className="h-10 w-10 text-brand-purple" />,
    title: 'Design Your Products',
    description: 'Upload your designs and choose products, sizes, colors, and pricing.',
  },
  {
    icon: <Shirt className="h-10 w-10 text-brand-purple" />,
    title: 'We Handle Production',
    description: 'When orders come in, we print, package, and ship directly to customers.',
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-brand-purple" />,
    title: 'Promote Your Store',
    description: 'Share your unique store link with your followers and start earning.',
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-brand-purple" />,
    title: 'Track Your Sales',
    description: 'Monitor your sales, revenue, and customer feedback from your dashboard.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="px-10 py-12 flex flex-col gap-8 bg-violet-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-3 text-3xl font-bold">How It Works For Creators</h2>
        <p className="text-base sm:text-lg text-gray-600">
          Launch your own merchandise line without the hassle. We handle production, shipping, and
          customer service while you focus on creating.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 w-full h-[16rem] relative border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-base text-gray-600">{step.description}</p>
            <div className="w-full absolute bottom-4 pr-12 flex flex-row items-center gap-4">
              <span className="w-8 h-8 flex justify-center items-center text-brand-purple font-semibold bg-brand-purple/10 rounded-full">
                {index + 1}
              </span>
              <div className="flex-1 border border-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
