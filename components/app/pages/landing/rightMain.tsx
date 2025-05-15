'use client';

import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const heroImages = [
	'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format',
	// 'https://images.unsplash.com/photo-1626948683848-3b74a93458e8?w=800&auto=format',
	'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=800&auto=format',
];

export default function RightMain() {
	const [currentBgIndex, setCurrentBgIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBgIndex(prev => (prev + 1) % heroImages.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="relative flex-1 bg-purple-100"			
		>			
			<motion.div 
				className="relative aspect-square mx-24 my-24"
				initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
				animate={{ opacity: 1, scale: 1, rotateY: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
			>
				<img
					src={heroImages[currentBgIndex]}
					alt="Creator merchandise showcase"
					className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl transform -rotate-2"
				/>
				<motion.div
					className="absolute -bottom-10 -right-10 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<div className="flex items-center">
						<div className="h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-brand-purple">
							<img
								src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format"
								alt="Creator"
								className="h-full w-full object-cover"
							/>
						</div>
						<div>
							<p className="font-bold text-gray-900">GamingWithAlex</p>
							<p className="text-sm text-brand-purple">New collection live!</p>
						</div>
					</div>
				</motion.div>
				<motion.div
					className="absolute -top-6 -left-10 bg-white p-3 rounded-lg shadow-lg z-20"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.5 }}
				>
					<div className="flex items-center space-x-2">
						<div className="bg-green-100 text-green-800 p-1 rounded-full">
							<TrendingUp className="w-4 h-4" />
						</div>
						<p className="font-semibold text-sm">150+ sales today</p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
