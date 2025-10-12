const images = [
	'https://fastly.picsum.photos/id/106/536/354.jpg?hmac=J-a-S3QlED10gjD_03zm8euqfuRvY8yDqAiF5KSE_I0',
	'https://fastly.picsum.photos/id/649/536/354.jpg?hmac=S-PAkLqcqBXhbsXxd5klkbff_tN5TcrwSTgoHEfVbf0',
	'https://fastly.picsum.photos/id/810/536/354.jpg?hmac=HQ90xkFLuIt4zLaqy23_MLXvjHZv7y8F654fjoE6rkk',
	'https://fastly.picsum.photos/id/360/536/354.jpg?hmac=hkJ_RmEPujjDj-tkqFkWT01yZlT-pWSePQb2PUJlwvE',
	'https://fastly.picsum.photos/id/620/536/354.jpg?hmac=_2pm-B21Zzjfs_NH_75cY2sC0odhWQbKUMU9oCHoyh4',
	'https://fastly.picsum.photos/id/310/536/354.jpg?hmac=rpeFEpGFBqTtjiCyybxEmjaa3GabVxQ6tV6biicib0s',
];

export default function ProductCategories() {
	return (
		<div className="px-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-x-8 gap-y-16">
			{images.map((image, index) => (
				<div key={index} className="h-[25rem] w-full overflow-hidden rounded-sm">
					<img
						src={image}
						alt="Product Category"
						className="w-full h-full object-cover hover:scale-105 duration-300"
					/>
				</div>
			))}
		</div>
	);
}
