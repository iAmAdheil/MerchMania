'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ArrowUp } from 'lucide-react';
import { Settings } from 'react-slick';

const creators = [
	{
		id: 1,
		name: 'John Doe 1',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 2,
		name: 'John Doe 2',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 3,
		name: 'John Doe 3',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 4,
		name: 'John Doe 4',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 5,
		name: 'John Doe 5',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 6,
		name: 'John Doe 6',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 7,
		name: 'John Doe 7',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
	{
		id: 8,
		name: 'John Doe 8',
		logo: 'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	},
];

export default function FeaturedCreators() {
	const settings: Settings = {
		variableWidth: true,
		adaptiveHeight: true,
		className: 'slider variable-width',
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		infinite: true,
		speed: 500,
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
	};

	return (
		<div className="pb-12 pt-8 w-full">
			<div className="relative w-full">
				<div className="slider-container">
					<Slider {...settings}>
						{creators.map(creator => {
							return (
								<div
									key={creator.id}
									className="mx-4 flex-1 w-full h-[25rem] max-w-[22rem] sm:max-w-[25rem] relative rounded-xl overflow-hidden group"
								>
									<img
										src={creator.logo}
										alt={creator.name}
										className="h-full w-full object-cover rounded-xl"
									/>
									<div className="w-full absolute bottom-5 left-0 right-0 flex flex-row items-end justify-between px-5">
										<h1 className="text-white text-3xl font-bold duration-200">{creator.name}</h1>
										<div className="bg-black h-14 w-14 rounded-full flex justify-center items-center duration-200 parent group">
											<ArrowUp
												color="white"
												size={28}
												className="rotate-45 group-hover:rotate-90 group-hover:scale-105 duration-200 child"
											/>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-xl" />
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
		</div>
	);
}

export function LongArrow({
	direction = 'right',
	length = 100,
	color = 'currentColor',
	strokeWidth = 2,
	headLength = 10,
}) {
	const paths = {
		right: `M 0 10 L ${length} 10 L ${length - headLength} ${10 - headLength / 2} M ${length} 10 L ${length - headLength} ${10 + headLength / 2}`,
		left: `M ${length} 10 L 0 10 L ${headLength} ${10 - headLength / 2} M 0 10 L ${headLength} ${10 + headLength / 2}`,
		up: `M 10 ${length} L 10 0 L ${10 - headLength / 2} ${headLength} M 10 0 L ${10 + headLength / 2} ${headLength}`,
		down: `M 10 0 L 10 ${length} L ${10 - headLength / 2} ${length - headLength} M 10 ${length} L ${10 + headLength / 2} ${length - headLength}`,
	};

	const svgSize = Math.max(20, headLength + 5);

	return (
		<svg
			width={direction === 'right' || direction === 'left' ? length : svgSize}
			height={direction === 'up' || direction === 'down' ? length : svgSize}
			style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }}
		>
			<path
				d={paths[direction as keyof typeof paths]}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
