'use client';

import { useState, useEffect, JSX } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';

type Direction = 'left' | 'right';

type Creator = {
	id: string;
	name: string;
	avatar: string;
	followers: string;
	category: string;
	productCount: number;
};

const featuredCreators: Creator[] = [
	{
		id: '1',
		name: 'GamingWithAlex',
		avatar: '/placeholder.svg',
		followers: '1.2M',
		category: 'Gaming',
		productCount: 24,
	},
	{
		id: '2',
		name: 'FashionByEmma',
		avatar: '/placeholder.svg',
		followers: '850K',
		category: 'Fashion',
		productCount: 18,
	},
	{
		id: '3',
		name: 'CreativeJordan',
		avatar: '/placeholder.svg',
		followers: '2.1M',
		category: 'Art & Design',
		productCount: 32,
	},
	{
		id: '4',
		name: 'FitnessPro',
		avatar: '/placeholder.svg',
		followers: '1.5M',
		category: 'Fitness',
		productCount: 15,
	},
	{
		id: '5',
		name: 'KSI',
		avatar: '/placeholder.svg',
		followers: '22M',
		category: 'Gaming',
		productCount: 15,
	},
];

const cardVariants = {
	initial: (direction: number) => ({
		x: direction > 0 ? 100 : -100,
		opacity: 0,
	}),
	animate: {
		x: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 300, damping: 25 },
	},
	exit: (direction: number) => ({
		x: direction > 0 ? -100 : 100,
		opacity: 0,
		transition: { duration: 0.2 },
		layout: { duration: 0.4 },
	}),
};

export default function FeaturedCreators() {
	const [activeIndexes, setActiveIndexes] = useState([0, 1, 2, 3]);
	const [direction, setDirection] = useState<Direction>('left');

	const handleLeftClick = () => {
		setDirection('left');
		setActiveIndexes(prevState => {
			const modifiedActiveIndexes: number[] = [];

			prevState.map(prevActiveIndex => {
				if (prevActiveIndex === 0) {
					modifiedActiveIndexes.push(featuredCreators.length - 1);
				} else {
					modifiedActiveIndexes.push(prevActiveIndex - 1);
				}
			});

			return modifiedActiveIndexes;
		});
	};

	const handleRightClick = () => {
		setDirection('right');
		setActiveIndexes(prevState => {
			const modifiedActiveIndexes: number[] = [];

			prevState.map(prevActiveIndex => {
				if (prevActiveIndex === featuredCreators.length - 1) {
					modifiedActiveIndexes.push(0);
				} else {
					modifiedActiveIndexes.push(prevActiveIndex + 1);
				}
			});

			return modifiedActiveIndexes;
		});
	};

	return (
		<div className="relative w-full">
			<div className="w-full px-12 flex flex-row justify-between items-center">
				{getActiveIndexCreators(activeIndexes, direction)}
			</div>
			<button
				className="absolute flex justify-center items-center h-8 w-8 bottom-1/2 left-2 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
				onClick={handleLeftClick}
			>
				<FaAngleLeft color="white" />
			</button>
			<button
				className="absolute flex justify-center items-center h-8 w-8 right-2 bottom-1/2 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
				onClick={handleRightClick}
			>
				<FaAngleRight color="white" />
			</button>
		</div>
	);
}

const getActiveIndexCreators = (activeIndexes: number[], direction: Direction) => {
	const activeIndexCreatorCards: JSX.Element[] = [];

	activeIndexes.map(activeIndex => {
		activeIndexCreatorCards.push(
			<CreatorCard
				key={activeIndex}
				creator={featuredCreators[activeIndex]}
				direction={direction}
			/>
		);
	});

	return activeIndexCreatorCards;
};

export function CreatorCard({ creator, direction }: { creator: Creator; direction: Direction }) {
	return (
		<motion.div
			custom={direction}
			variants={cardVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			layout
			className="group w-[18rem] flex flex-col gap-4 px-6 py-6 rounded-lg border-[1px] border-solid border-gray-200 hover:shadow-lg hover:scale-105 duration-150 hover:z-10"
		>
			<div className="flex flex-row items-center gap-4">
				<div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
					<img
						src={'https://i.scdn.co/image/ab6761610000e5ebcb4ae963f0c01900f3e17712'}
						alt={creator.name}
						className="h-full w-full object-cover"
					/>
				</div>
				<div>
					<h3 className="font-semibold text-lg group-hover:text-purple-500">
						{creator.name}
					</h3>
					<p className="text-sm text-gray-500">{creator.category}</p>
				</div>
			</div>
			<div className="w-full flex flex-col justify-center items-center gap-2">
				<div className="w-full flex items-center justify-between text-sm text-gray-600">
					<span>Followers</span>
					<span className="text-sm text-black">{creator.followers}</span>
				</div>
				<div className="w-full flex items-center justify-between text-sm text-gray-600">
					<span>Products</span>
					<span className="text-sm text-black">{creator.productCount}</span>
				</div>
			</div>
			<div className="mt-1 w-full">
				<button className="w-full border-[0.5px] border-solid border-gray-300 text-sm font-roboto py-2 rounded-lg hover:bg-slate-100 duration-150">
					Visit Store
				</button>
			</div>
		</motion.div>
	);
}
