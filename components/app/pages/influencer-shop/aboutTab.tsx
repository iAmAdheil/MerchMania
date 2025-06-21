import { Youtube, Twitter, Instagram, Twitch, ExternalLink } from 'lucide-react';

const points = [
	`High-quality materials and printing`,
	`Exclusive designs you won't find anywhere else`,
	`Direct support for content creation`,
	`Fast shipping and easy returns`,
];

const categories = [
	'Apparel',
	'Accessories',
	'Posters',
	'Stickers',
	'Limited Edition'
]

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

export default function AboutTab() {
	return (
		<div className="flex flex-col justify-between gap-8 md:flex-row md:gap-5">
			<div className="flex flex-col max-w-3xl gap-8">
				<div className="w-[100%] flex flex-col gap-4 px-4 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">About GamingWithAlex</h1>
					<p className="text-[15px] font-medium text-slate-700">
						Gaming content creator passionate about indie games and tech reviews.
						Creating awesome merchandise for the gaming community!
					</p>
					<p className="text-[15px] font-medium text-slate-700">
						Welcome to my official merchandise store! Here you'll find exclusive designs
						and products that represent my brand and the amazing community we've built
						together. Every purchase supports content creation and helps me continue
						bringing you the content you love.
					</p>
				</div>
				<div className="w-[100%] flex flex-col gap-4 px-4 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">Why Shop With Me?</h1>
					{points.map((point, index) => {
						return (
							<p
								key={index}
								className="flex flex-row items-center text-[15px] font-medium text-slate-700 gap-3"
							>
								<span className="text-lg text-purple-500">&#183;</span>
								{point}
							</p>
						);
					})}
				</div>
			</div>
			<div className="w-[100%] flex flex-col gap-8 max-w-sm">
				<div className="flex flex-col gap-4 px-4 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">Connect With Me</h1>
					<div className="flex flex-col gap-2">
						{socialPlatforms.map(platform => {
							// if (!platform.url) return null;
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
									<span className="font-medium">{platform.name}</span>
									<ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
								</a>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col gap-4 px-4 py-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
					<h1 className="text-2xl font-bold">Shop Categories</h1>
					<div className='flex flex-row items-center gap-2 flex-wrap'>
						{categories.map((category, index) => {							
							return (
								<div key={index} className='px-3 py-0.5 bg-purple-300 rounded-xl text-[10px] font-semibold'>
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
