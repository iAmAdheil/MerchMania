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
		<section className="py-16 bg-white flex flex-col gap-12">
			<div className="text-center max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold mb-4">How It Works For Creators</h2>
				<p className="text-lg text-gray-600">
					Launch your own merchandise line without the hassle. We handle production,
					shipping, and customer service while you focus on creating.
				</p>
			</div>
			<div className="w-full flex flex-row justify-around">
				{steps.map((step, index) => (
					<div
						key={index}
						className="relative w-[18rem] h-[16rem] bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
					>
						<div className="mb-4">{step.icon}</div>
						<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
						<p className="text-gray-600">{step.description}</p>
						<div className="w-full flex flex-row items-center gap-4 absolute bottom-4 pr-12">
							<span className="bg-brand-purple/10 text-brand-purple font-semibold rounded-full w-8 h-8 flex items-center justify-center">
								{index + 1}
							</span>
							<div className="flex-1 border-[0.3px] border-gray-200"></div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default HowItWorksSection;
