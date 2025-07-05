import { Check, Badge, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { InfluencerHeaderProps } from '@/types';

export default function Header({ shopDetails }: { shopDetails: InfluencerHeaderProps | null }) {
	return (
		<div className="relative w-screen">
			<div className="h-32 bg-gradient-to-r from-purple-500 to-purple-300" />
			<div className="flex flex-col gap-8 absolute w-full top-[3.5rem] px-16">
				<div className="flex flex-row justify-between items-end">
					<div className="flex flex-row items-center gap-8">
						<div className="relative">
							<img
								src={shopDetails?.logo}
								alt={shopDetails?.name}
								className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg"
							/>
							{/* {influencer.verified && (
								<div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
									<Check className="h-4 w-4 text-white" />
								</div>
							)} */}
						</div>
						<div className="flex flex-col gap-2 mt-8">
							<div className="flex flex-row items-center gap-4">
								<h1 className="text-3xl font-roboto font-bold">{shopDetails?.name}</h1>
								<div className="px-2 py-0.5 rounded-xl bg-blue-200 text-[10px] font-semibold font-roboto text-blue-800 border-[0.5px] border-solid border-blue-800">
									Verified
								</div>
							</div>
							<p className="text-sm font-semibold">@gamingalex</p>
							<div className="flex flex-row gap-5">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<p className="text-[13px] font-medium font-roboto text-gray-600">
										{'San Francisco, CA'}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-3.5 w-3.5" />
									<p className="text-[13px] font-medium font-roboto text-gray-600">
										Joined {'January 2020'}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<ExternalLink className="h-3.5 w-3.5" />
									<a
										href={`https://'gamingwithalex.com'}`}
										className="text-[13px] font-medium text-brand-purple hover:underline"
									>
										{'gamingwithalex.com'}
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-row gap-5">
						<button className="text-xs font-semibold font-roboto text-black border border-solid border-purple-200 px-4 py-2 rounded-md hover:bg-slate-100 active:opacity-60 duration-200">
							Follow
						</button>
						<button className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 py-2 rounded-md hover:opacity-80 active:opacity-60 duration-200">
							Message
						</button>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center gap-[15rem]">
					<div className="">
						<p className="text-gray-700 font-medium">{'Gaming content creator passionate about indie games and tech reviews. Creating awesome merchandise for the gaming community!'}</p>
					</div>
					<div className="flex md:justify-end">
						<div className="flex gap-6">
							<div className="text-center">
								<div className="text-2xl font-bold">{'125k'}</div>
								<div className="text-sm text-gray-500">Followers</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold">{10}</div>
								<div className="text-sm text-gray-500">Products</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mockInfluencer = {
	id: '1',
	name: 'GamingWithAlex',
	handle: '@gamingwithalex',
	avatar: '/placeholder.svg',
	coverImage: '/placeholder.svg',
	bio: 'Gaming content creator passionate about indie games and tech reviews. Creating awesome merchandise for the gaming community!',
	followers: '125K',
	products: 24,
	location: 'San Francisco, CA',
	website: 'gamingwithalex.com',
	joinedDate: 'January 2020',
	verified: true,
	socialLinks: {
		youtube: 'https://youtube.com/@gamingwithalex',
		twitter: 'https://twitter.com/gamingwithalex',
		instagram: 'https://instagram.com/gamingwithalex',
		twitch: 'https://twitch.tv/gamingwithalex',
	},
};
