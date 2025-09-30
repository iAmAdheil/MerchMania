'use client';

import { useState, useEffect } from 'react';

const images = [
	'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	'https://fastly.picsum.photos/id/649/536/354.jpg?hmac=S-PAkLqcqBXhbsXxd5klkbff_tN5TcrwSTgoHEfVbf0',
	'https://fastly.picsum.photos/id/810/536/354.jpg?hmac=HQ90xkFLuIt4zLaqy23_MLXvjHZv7y8F654fjoE6rkk',
	'https://fastly.picsum.photos/id/360/536/354.jpg?hmac=hkJ_RmEPujjDj-tkqFkWT01yZlT-pWSePQb2PUJlwvE',
	'https://fastly.picsum.photos/id/620/536/354.jpg?hmac=_2pm-B21Zzjfs_NH_75cY2sC0odhWQbKUMU9oCHoyh4',
	'https://fastly.picsum.photos/id/310/536/354.jpg?hmac=rpeFEpGFBqTtjiCyybxEmjaa3GabVxQ6tV6biicib0s',
];

export default function DisplayCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex-1 w-full flex justify-center items-center px-6 md:px-10 lg:px-16 py-10 lg:py-16">
			<div className="relative w-full h-[35rem]">
				<img
					src={images[activeIndex]}
					alt="Trending Image"
					className="w-full h-full object-fit rounded-xl"
				/>
				<div className="w-full absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
					{getCircularButtons(images.length)}
				</div>
			</div>
		</div>
	);

	function getCircularButtons(noElements: number) {
		const buttons = [];

		for (let i = 0; i < noElements; i++) {
			buttons.push(
				<button
					key={i}
					className="h-3 w-3 bg-gray-600 rounded-full opacity-60"
					onClick={() => setActiveIndex(i)}
				>
					{activeIndex === i && <div className="h-full w-full rounded-full bg-orange-800" />}
				</button>
			);
		}

		return buttons;
	}
}
