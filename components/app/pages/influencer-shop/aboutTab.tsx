import { Youtube, Twitter, Instagram, Twitch, ExternalLink, MapPin, PhoneIcon } from 'lucide-react';
import { ShopDetailsSchema } from '@/types';

const categories = ['Apparel', 'Accessories', 'Posters', 'Stickers', 'Limited Edition'];

const socialPlatforms = [
	{ name: 'YouTube', icon: Youtube, url: '', color: 'text-red-600' },
	{ name: 'Twitter', icon: Twitter, url: '', color: 'text-blue-400' },
	{
		name: 'Instagram',
		icon: Instagram,
		url: '',
		color: 'text-pink-600',
	},
	{ name: 'Twitch', icon: Twitch, url: '', color: 'text-purple-600' },
];

export default function AboutTab({ shopDetails }: { shopDetails: ShopDetailsSchema | null }) {
	return (
		<div className="w-full flex flex-col gap-x-8 gap-y-8">
			<div className="w-full flex flex-col lg:flex-row items-stretch gap-x-8 gap-y-8">
				<div className="flex-1 w-full flex flex-col gap-4 px-5 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">About {shopDetails?.name}</h1>
					<p className="text-base/6 font-medium text-slate-700">{shopDetails?.description}</p>
				</div>
				<div className="w-full md:max-w-[22rem] flex flex-col px-5 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="mb-2 text-2xl font-bold">Connect With Me</h1>
					<div className="flex flex-col gap-1">
						{socialPlatforms.map(platform => {
							const Icon = platform.icon;
							return (
								<a
									key={platform.name}
									href={platform.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
								>
									<Icon className={`h-5 w-5 ${platform.color}`} />
									<span className="text-base font-medium">{platform.name}</span>
									<ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
								</a>
							);
						})}
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col lg:flex-row items-stretch gap-x-8 gap-y-8">
				<div className="h-full w-full lg:max-w-md flex flex-col gap-4 px-5 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">Details</h1>
					<div className="px-0 sm:px-2 md:px-4 flex flex-row items-start justify-between">
						<div className="flex flex-col gap-2">
							<div className="flex flex-row items-center gap-2">
								<MapPin className="h-4 w-4 text-gray-600" />
								<p className="text-sm md:text-base font-medium">Location</p>
							</div>
							<div className="px-2 md:px-4">
								<p className="text-sm md:text-base font-medium">{shopDetails?.location}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-row items-center gap-2">
								<PhoneIcon className="h-4 w-4 text-gray-600" />
								<p className="text-sm md:text-base font-medium">Contact</p>
							</div>
							<div className="px-2 md:px-4">
								<p className="text-sm md:text-base font-medium">{shopDetails?.contact}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="h-full w-full lg:max-w-sm flex flex-col gap-4 px-5 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">Shop Categories</h1>
					<div className="flex flex-row items-center gap-3 flex-wrap">
						{categories.map((category, index) => {
							return (
								<div
									key={index}
									className="px-3 py-0.5 bg-purple-300 rounded-xl text-xs font-semibold"
								>
									{category}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
