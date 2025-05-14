'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Flame } from 'lucide-react';
// import { Badge } from "@/components/ui/badge";

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
	{
		id: '5',
		name: 'Digital Dreams',
		designer: 'PixelPunk',
		image: 'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=500&auto=format',
		trend: 'trending',
	},
];

export default function TrendingDesigns() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % trendingItems.length);
		}, 3000);
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
		<div className="">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">Trending Designs</h2>
				<div className="flex space-x-2">
					{trendingItems.map((_, index) => (
						<button
							key={index}
							onClick={() => setActiveIndex(index)}
							className={`w-2.5 h-2.5 rounded-full transition-colors ${
								index === activeIndex ? 'bg-brand-purple' : 'bg-gray-300'
							}`}
						/>
					))}
				</div>
			</div>

			<div className="relative h-[400px] overflow-hidden rounded-xl">
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
						<div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
							<div className="flex items-center mb-2">
								{/* <Badge
									variant="outline"
									className={`flex items-center space-x-1 ${getTrendColor(item.trend)}`}
								>
									{getTrendIcon(item.trend)}
									<span className="capitalize">{item.trend}</span>
								</Badge> */}
							</div>
							<h3 className="text-3xl font-bold mb-1 drop-shadow-lg">{item.name}</h3>
							<p className="text-lg mb-4 drop-shadow-md">by {item.designer}</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-white text-brand-purple font-semibold py-2 px-6 rounded-full w-fit"
							>
								See Collection
							</motion.button>
						</div>
						<img
							src={item.image}
							alt={item.name}
							className="absolute rounded-xl"
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
}
