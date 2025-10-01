'use client';

import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 2, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 1000 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 1000, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

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
	return (
		<div className="py-6">
			<div className="px-6 flex items-center justify-center">
				<Carousel
					centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={true}
					responsive={responsive}
					infinite={true}
					autoPlaySpeed={1000}
					keyBoardControl={true}
					customTransition="all .5"
					transitionDuration={500}
					containerClass="carousel-container flex flex-row items-center"
					removeArrowOnDeviceType={['tablet', 'mobile']}
					dotListClass="custom-dot-list-style"
					itemClass="carousel-item-padding-40-px"
				>
					{creators.map(creator => {
						return (
							<div
								key={creator.id}
								className="h-[30rem] max-w-[30rem] relative rounded-xl overflow-hidden"
							>
								<img
									src={creator.logo}
									alt={creator.name}
									className="h-full w-full object-cover rounded-xl"
								/>
								<h1 className="absolute bottom-4 left-4 text-white text-3xl font-bold">
									{creator.name}
								</h1>
								<div className="absolute bottom-4 right-4 bg-black h-16 w-16 rounded-full flex justify-center items-center">
									<LongArrow length={45} color="white" strokeWidth={3} />
								</div>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-xl" />
							</div>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
}

function LongArrow({
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
