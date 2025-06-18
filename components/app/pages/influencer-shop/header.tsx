import { Check, Badge, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@chakra-ui/react';

type InfluencerHeaderProps = {
	influencer: {
		name: string;
		handle: string;
		avatar: string;
		coverImage: string;
		bio: string;
		followers: string;
		products: number;
		location: string;
		website: string;
		joinedDate: string;
		verified: boolean;
		socialLinks: {
			youtube?: string;
			twitter?: string;
			instagram?: string;
			twitch?: string;
		};
	};
};

export default function Header({ influencer }: InfluencerHeaderProps) {
	return (
		<div className="relative w-screen">
			<div className="h-32 bg-gradient-to-r from-purple-500 to-purple-300" />
			<div className="flex flex-col gap-8 absolute w-full top-[3.5rem] px-16">
				<div className="flex flex-row justify-between items-end">
					<div className="flex flex-row items-center gap-8">
						<div className="relative">
							<img
								src={
									'https://static.wikia.nocookie.net/wfl/images/c/ca/KSI.jpg/revision/latest?cb=20230224183635'
								}
								alt={influencer.name}
								className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg"
							/>
							{influencer.verified && (
								<div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
									<Check className="h-4 w-4 text-white" />
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2 mt-8">
							<div className="flex flex-row items-center gap-4">
								<h1 className="text-3xl font-roboto font-bold">Gaming With Alex</h1>
								<div className="px-2 py-0.5 rounded-xl bg-blue-200 text-[10px] font-semibold font-roboto text-blue-800 border-[0.5px] border-solid border-blue-800">
									Verified
								</div>
							</div>
							<p className="text-sm font-semibold">@gamingalex</p>
							<div className="flex flex-row gap-5">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<p className="text-[13px] font-medium font-roboto text-gray-600">
										{influencer.location}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-3.5 w-3.5" />
									<p className="text-[13px] font-medium font-roboto text-gray-600">
										Joined {influencer.joinedDate}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<ExternalLink className="h-3.5 w-3.5" />
									<a
										href={`https://${influencer.website}`}
										className="text-[13px] font-medium text-brand-purple hover:underline"
									>
										{influencer.website}
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
						<p className="text-gray-700 font-medium">{influencer.bio}</p>
					</div>
					<div className="flex md:justify-end">
						<div className="flex gap-6">
							<div className="text-center">
								<div className="text-2xl font-bold">{influencer.followers}</div>
								<div className="text-sm text-gray-500">Followers</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold">{influencer.products}</div>
								<div className="text-sm text-gray-500">Products</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
