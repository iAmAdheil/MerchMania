'use client';

import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Flame } from 'lucide-react';

const trendingItems = [
	{
		id: '1',
		name: 'Neon Dragon Tee',
		designer: 'CyberNinja',
		image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format',
		trend: 'hot',
	},
	{
		id: '2',
		name: 'Retro Wave Hoodie',
		designer: 'SynthMaster',
		image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format',
		trend: 'trending',
	},
	{
		id: '3',
		name: 'Cosmic Patterns',
		designer: 'StarGazer',
		image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format',
		trend: 'popular',
	},
	{
		id: '4',
		name: 'Urban Jungle',
		designer: 'StreetArtist',
		image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format',
		trend: 'hot',
	},
	// {
	// 	id: '5',
	// 	name: 'Digital Dreams',
	// 	designer: 'PixelPunk',
	// 	image: 'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=500&auto=format',
	// 	trend: 'trending',
	// },
];

export default function TrendingCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % trendingItems.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const getTrendIcon = (trend: string) => {
		switch (trend) {
			case 'hot':
				return <Flame className="h-4 w-4 text-red-500" />;
			case 'trending':
				return <TrendingUp className="h-4 w-4 text-brand-purple" />;
			case 'popular':
				return <Star className="h-4 w-4 text-amber-500" />;
			default:
				return <TrendingUp className="h-4 w-4" />;
		}
	};

	const getTrendColor = (trend: string) => {
		switch (trend) {
			case 'hot':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'trending':
				return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
			case 'popular':
				return 'bg-amber-100 text-amber-800 border-amber-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	return (
		<div className="flex justify-center items-center">
			<div className="relative w-full flex flex-col gap-5 justify-center items-center">
				<div className="relative h-[400px] overflow-hidden rounded-xl w-[60rem]">
					{trendingItems.map((item, index) => (
						<motion.div
							key={item.id}
							className="absolute inset-0 w-full h-full"
							initial={{ opacity: 0, x: 100 }}
							animate={{
								opacity: index === activeIndex ? 1 : 0,
								x: index === activeIndex ? 0 : 100,
								zIndex: index === activeIndex ? 10 : 0,
							}}
							transition={{ duration: 0.5 }}
						>
							<div className="w-full h-full bg-gradient-to-r from-brand-purple/80 to-brand-orange/80 absolute opacity-30 z-10 rounded-xl"></div>
							<div className="absolute z-20 flex flex-col left-10 bottom-6 gap-2 text-white">
								<div className="flex items-center">
									<div
										className={`flex flex-row items-center gap-1 px-3 py-1 rounded-xl ${getTrendColor(item.trend)}`}
									>
										{getTrendIcon(item.trend)}
										<span className="capitalize text-xs font-semibold">
											{item.trend}
										</span>
									</div>
								</div>
								<div>
									<h3 className="text-3xl font-semibold drop-shadow-lg">
										{item.name}
									</h3>
									<p className="text-base drop-shadow-md">by {item.designer}</p>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="bg-white text-brand-purple text-sm font-semibold py-2 px-6 rounded-full w-fit"
								>
									See Collection
								</motion.button>
							</div>
							<img
								src={item.image}
								alt={item.name}
								className="absolute inset-0 w-full h-full object-cover rounded-xl"
							/>
						</motion.div>
					))}
				</div>
				<div className="flex flex-row gap-3">
					{getCircularButtons(trendingItems.length)}
				</div>
				<button
					className="absolute flex justify-center items-center h-8 w-8 left-10 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
					onClick={() => {
						if (activeIndex === trendingItems.length - 1) {
							setActiveIndex(0);
						} else {
							setActiveIndex(prevIndex => prevIndex + 1);
						}
					}}
				>
					<FaAngleRight color="white" />
				</button>
				<button
					className="absolute flex justify-center items-center h-8 w-8 right-10 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
					onClick={() => {
						if (activeIndex === 0) {
							setActiveIndex(trendingItems.length - 1);
						} else {
							setActiveIndex(prevIndex => prevIndex - 1);
						}
					}}
				>
					<FaAngleLeft color="white" />
				</button>
			</div>
		</div>
	);

	function getCircularButtons(noElements: number) {
		const buttons = [];

		for (let i = 0; i < noElements; i++) {
			buttons.push(
				<button
					key={i}
					className="h-3 w-3 p-0.5 border border-solid border-gray-500 rounded-full"
					onClick={() => setActiveIndex(i)}
				>
					{activeIndex === i && (
						<div className="h-full w-full rounded-full bg-purple-400" />
					)}
				</button>
			);
		}

		return buttons;
	}
}
