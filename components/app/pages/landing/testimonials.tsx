'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
	{
		id: 1,
		quote: "CreatorMerch transformed my online presence. I've made more from my merchandise in 3 months than I did all last year with my previous provider!",
		author: 'Alex Johnson',
		handle: '@GamingWithAlex',
		avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format',
		followers: '1.2M',
	},
	{
		id: 2,
		quote: "The quality is amazing, and my followers absolutely love the designs. Plus, the fact that I don't have to handle shipping is a huge time-saver.",
		author: 'Emma Thompson',
		handle: '@FashionByEmma',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format',
		followers: '850K',
	},
	{
		id: 3,
		quote: 'As an artist, I was skeptical about print quality, but CreatorMerch exceeded my expectations. My artwork looks perfect on every product.',
		author: 'Jordan Lee',
		handle: '@CreativeJordan',
		avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format',
		followers: '2.1M',
	},
];

const TestimonialSlider = () => {
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState<'left' | 'right'>('left');
	const [autoplay, setAutoplay] = useState(true);

	useEffect(() => {
		if (!autoplay) return;

		const interval = setInterval(() => {
			setDirection('right');
			setCurrent(prev => (prev + 1) % testimonials.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [autoplay]);

	const handlePrevious = () => {
		setAutoplay(false);
		setDirection('left');
		setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const handleNext = () => {
		setAutoplay(false);
		setDirection('right');
		setCurrent(prev => (prev + 1) % testimonials.length);
	};

	const variants = {
		enter: (direction: string) => ({
			x: direction === 'right' ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: string) => ({
			x: direction === 'right' ? -1000 : 1000,
			opacity: 0,
		}),
	};

	return (
		<section className="relative w-full bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden py-8 flex flex-col justify-center items-center gap-5">
			<div className="absolute top-10 left-10 w-32 h-32 bg-brand-purple/10 rounded-full blur-xl"></div>
			<div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-xl"></div>
			<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-lg"></div>
			<div className="absolute top-[6rem] left-[8rem] transform -translate-x-6 -translate-y-6">
				<Quote className="w-12 h-12 text-brand-purple opacity-20" />
			</div>

			<div className="z-10 w-[60rem] h-full flex flex-col items-center justify-center gap-5">
				<h2 className="text-3xl font-bold text-center">Creator Success Stories</h2>
				<div className="flex items-center justify-center">
					<AnimatePresence initial={false} mode="wait" custom={direction}>
						<motion.div
							key={current}
							custom={direction}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							className="w-full flex flex-col items-center justify-center gap-2 text-center"
						>
							<blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 px-4">
								"{testimonials[current].quote}"
							</blockquote>
							<div className="flex flex-col items-center">
								<div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-4 ring-brand-purple ring-offset-2">
									<img
										src={testimonials[current].avatar}
										alt={testimonials[current].author}
										className="w-full h-full object-cover"
									/>
								</div>
								<div>
									<p className="font-bold text-gray-900">
										{testimonials[current].author}
									</p>
									<p className="text-brand-purple">
										{testimonials[current].handle}
									</p>
									<p className="text-sm text-gray-500">
										{testimonials[current].followers} followers
									</p>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			<div className="w-full flex flex-row justify-center items-center gap-4">
				<button
					onClick={handlePrevious}
					className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
					aria-label="Previous testimonial"
				>
					<ChevronLeft className="w-5 h-5" />
				</button>
				<div className="flex flex-row items-center gap-2">
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								setAutoplay(false);
								setDirection(index > current ? 'left' : 'right');
								setCurrent(index);
							}}
							className={`w-2.5 h-2.5 rounded-full transition-all ${
								index === current
									? 'bg-brand-purple w-4'
									: 'bg-gray-300 hover:bg-gray-400'
							}`}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
				<button
					onClick={handleNext}
					className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
					aria-label="Next testimonial"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		</section>
	);
};

export default TestimonialSlider;
