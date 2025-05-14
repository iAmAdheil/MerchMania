import { ShoppingBag, Users, TrendingUp, Award } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';

const stats = [
	{
		icon: <ShoppingBag color="black" className="w-5 h-5" />,
		value: '10K+',
		label: 'Products',
	},
	{
		icon: <Users color="black" className="w-5 h-5" />,
		value: '500+',
		label: 'Creators',
	},
	{
		icon: <TrendingUp color="black" className="w-5 h-5" />,
		value: '50K+',
		label: 'Orders',
	},
	{
		icon: <Award color="black" className="w-5 h-5" />,
		value: '99%',
		label: 'Satisfaction',
	},
];

export default function LeftMain() {
	return (
		<div className="bg-purple-100 flex flex-col gap-8 flex-1 flex-wrap pl-16 pt-28">
			<h1 className="font-bold font-roboto text-5xl text-black flex flex-col gap-2">
				Wear Your Favorite
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
					Creator's Merchandise
				</span>
			</h1>
			<p className="text-gray-700 text-base font-roboto w-[35rem]">
				Discover unique designs from your favorite influencers. Support creators directly
				and wear merchandise that's as unique as you are.
			</p>
			<div className="flex flex-row gap-8">
				<button className="flex flex-row items-center justify-between w-[10rem] h-fit py-2 pl-6 pr-7 rounded-full shadow-lg text-base font-roboto font-semibold text-white bg-purple-500 hover:pr-5 hover:opacity-80 active:opacity-60 duration-150">
					Shop Now
					<FaArrowRight color="white" size={12} />
				</button>
				<button className="w-[12rem] h-fit py-2 rounded-full text-base font-roboto font-semibold text-purple-500 bg-white border border-solid border-purple-500 border-spacing-10 hover:bg-transparent duration-150">
					Become a Creator
				</button>
			</div>
			<div className="flex flex-row justify-center mb-10">
				<div className="w-full py-3 flex flex-row items-center justify-evenly bg-white rounded-md shadow-xl">
					{stats.map((stat, index) => (
						<div key={index} className="flex flex-col gap-0.5 items-center p-2">
							<div className="bg-purple-100 p-2 rounded-full mb-2">{stat.icon}</div>
							<p className="font-bold text-xl text-[#8B5CF6]">{stat.value}</p>
							<p className="text-xs text-gray-500">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
