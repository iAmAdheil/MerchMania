'use client';

import { useState, useEffect, JSX, useMemo } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';

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
	{
		id: '6',
		name: 'Adheil',
		avatar: '/placeholder.svg',
		followers: '100M',
		category: 'Sim Racing',
		productCount: 15,
	},
];

// const cardVariants = {
// 	initial: (direction: string) => ({
// 		x: direction === 'left' ? -100 : 100,
// 		opacity: 0,
// 	}),
// 	animate: {
// 		x: 0,
// 		opacity: 1,
// 		transition: { type: 'spring', stiffness: 300, damping: 25 },
// 	},
// 	exit: (direction: string) => ({
// 		position: 'absolute',
// 		x: direction === 'left' ? 100 : -100,
// 		opacity: 0,
// 		transition: { duration: 0.25 },
// 	}),
// };

const OFFSCREEN = 120;
const DURATION = 0.35;
const EASE = [0.45, 0.05, 0.55, 0.95];

const cardVariants = {
	/** Only the new card */
	initial: (dir: string) => ({
		x: dir === 'right' ? OFFSCREEN : -OFFSCREEN,
		opacity: 0,
	}),

	/** Every card on every frame */
	animate: {
		x: 0,
		opacity: 1,
		transition: { type: 'tween', ease: EASE, duration: DURATION },
	},

	/** Only the exiting card */
	exit: (dir: string) => ({
		position: 'absolute',
		x: dir === 'right' ? -OFFSCREEN : OFFSCREEN,
		opacity: 0,
		transition: { type: 'tween', ease: EASE, duration: DURATION },
	}),
};

export default function FeaturedCreators() {
	const [activeIndexes, setActiveIndexes] = useState([0, 1, 2, 3]);
	const [direction, setDirection] = useState<Direction>('left');

	const hideLeft: boolean = useMemo(() => {
		if (activeIndexes.includes(0)) {
			return true;
		}
		return false;
	}, [activeIndexes]);
	const hideRight: boolean = useMemo(() => {
		if (activeIndexes.includes(featuredCreators.length - 1)) {
			return true;
		}
		return false;
	}, [activeIndexes]);

	const handleLeftClick = () => {
		setDirection('left');
		setActiveIndexes(prevState => {
			const modifiedActiveIndexes: number[] = [];

			prevState.map(prevActiveIndex => {
				modifiedActiveIndexes.push(prevActiveIndex - 1);
			});

			return modifiedActiveIndexes;
		});
	};

	const handleRightClick = () => {
		setDirection('right');
		setActiveIndexes(prevState => {
			const modifiedActiveIndexes: number[] = [];

			prevState.map(prevActiveIndex => {
				modifiedActiveIndexes.push(prevActiveIndex + 1);
			});

			return modifiedActiveIndexes;
		});
	};

	return (
		<div className="w-full flex flex-col gap-10 py-10 bg-gray-100">
			<p className="pl-20 w-full text-2xl font-roboto font-bold">Featured Creators</p>
			{/* <div className="relative w-full">
				<div className="w-full px-14 flex flex-row justify-between items-center">
					<AnimatePresence mode="popLayout" initial={false} custom={direction}>
						{activeIndexes.map(activeIndex => (
							<CreatorCard
								key={featuredCreators[activeIndex].id}
								creator={featuredCreators[activeIndex]}
								direction={direction}
							/>
						))}
					</AnimatePresence>
				</div>
				{!hideLeft && (
					<button
						className="absolute flex justify-center items-center h-8 w-8 bottom-1/2 left-2 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
						onClick={handleLeftClick}
					>
						<FaAngleLeft color="white" />
					</button>
				)}
				{!hideRight && (
					<button
						className="absolute flex justify-center items-center h-8 w-8 right-2 bottom-1/2 rounded-full bg-gray-400 opacity-90 hover:opacity-70 active:scale-95"
						onClick={handleRightClick}
					>
						<FaAngleRight color="white" />
					</button>
				)}
			</div> */}
			<div className="w-full flex justify-center">
				<button className="w-fit px-5 py-2 bg-purple-600 text-white text-sm font-roboto font-semibold rounded-lg">
					Discover All Creators
				</button>
			</div>
		</div>
	);
}

export function CreatorCard({ creator, direction }: { creator: Creator; direction: Direction }) {
	return (
		<motion.div
			layout="position"
			custom={direction}
			variants={cardVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="group w-[18rem] flex flex-col gap-4 px-6 py-6 bg-white rounded-lg border-[1px] border-solid border-gray-200 hover:shadow-lg hover:scale-105 duration-150 hover:z-10"
		>
			<div className="flex flex-row items-center gap-4">
				<div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
					<img
						src={'https://i.scdn.co/image/ab6761610000e5ebcb4ae963f0c01900f3e17712'}
						alt={creator.name}
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="flex-1 text-left">
					<h3 className="font-semibold text-lg group-hover:text-purple-500">{creator.name}</h3>
					<p className="text-sm text-gray-500">{creator.category}</p>
				</div>
			</div>
			<div className="flex-1 w-full flex flex-col justify-center items-center gap-2">
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
