'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Bubble({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
	return (
		<motion.circle
			cx={x}
			cy={y}
			r={size}
			fill={color}
			initial={{ opacity: 0, scale: 0 }}
			animate={{
				opacity: [0.7, 0.3, 0.7],
				scale: [1, 1.2, 1],
				x: x + Math.random() * 100 - 50,
				y: y + Math.random() * 100 - 50,
			}}
			transition={{
				duration: 5 + Math.random() * 10,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: 'reverse',
			}}
		/>
	);
}

function FloatingBubbles() {
	const [bubbles, setBubbles] = useState<
		Array<{ id: number; x: number; y: number; size: number; color: string }>
	>([]);

	useEffect(() => {
		const newBubbles = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 20 + 5,
			color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.7)`,
		}));
		setBubbles(newBubbles);
	}, []);

	return (
		<div className="absolute inset-0 pointer-events-none">
			<svg className="w-full h-full">
				<title>Floating Bubbles</title>
				{bubbles.map(bubble => (
					<Bubble key={bubble.id} {...bubble} />
				))}
			</svg>
		</div>
	);
}

export default function FloatingBubblesBackground({ children }: { children: React.ReactNode }) {
	return (
		<div className="-z-10 min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
			<FloatingBubbles />
			{children}
		</div>
	);
}
