'use client';

import Marquee from 'react-fast-marquee';

const CentralImage =
	'https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0';

const images = [
	'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	'https://fastly.picsum.photos/id/649/536/354.jpg?hmac=S-PAkLqcqBXhbsXxd5klkbff_tN5TcrwSTgoHEfVbf0',
	'https://fastly.picsum.photos/id/810/536/354.jpg?hmac=HQ90xkFLuIt4zLaqy23_MLXvjHZv7y8F654fjoE6rkk',
	'https://fastly.picsum.photos/id/360/536/354.jpg?hmac=hkJ_RmEPujjDj-tkqFkWT01yZlT-pWSePQb2PUJlwvE',
	'https://fastly.picsum.photos/id/620/536/354.jpg?hmac=_2pm-B21Zzjfs_NH_75cY2sC0odhWQbKUMU9oCHoyh4',
	'https://fastly.picsum.photos/id/310/536/354.jpg?hmac=rpeFEpGFBqTtjiCyybxEmjaa3GabVxQ6tV6biicib0s',
];

export default function RightMain() {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full bg-purple-100">
			<div className="w-full px-20 py-10">
				<Marquee gradient gradientWidth={60} gradientColor='#d7d7d7' pauseOnHover={true} autoFill={true} className="bg-transparent rounded-lg mb-3">
					<div className="mx-5 flex flex-row gap-10">
						{images.map((image, index) => (
							<img key={index} src={image} alt="Hero Image" className="w-36 h-20 rounded-lg" />
						))}
					</div>
				</Marquee>
				<img src={CentralImage} alt="Hero Image" className="w-full rounded-lg" />
				<Marquee gradient gradientWidth={60} gradientColor='#d7d7d7' direction='right' pauseOnHover={true} autoFill={true} className="bg-transparent rounded-lg mt-3">
					<div className="mx-5 flex flex-row gap-10">
						{images.map((image, index) => (
							<img key={index} src={image} alt="Hero Image" className="w-36 h-20 rounded-lg" />
						))}
					</div>
				</Marquee>
			</div>
		</div>
	);
}
