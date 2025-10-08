import { MapPin, Calendar } from 'lucide-react';
import { MdVerified } from 'react-icons/md';

export default function Header() {
	return (
		<div className="relative w-full flex flex-col gap-8">
			<div className="w-full flex flex-row">
				<img
					src="https://res.cloudinary.com/dzaj1xdgz/image/upload/v1759867755/shop-logos/cmggztk3n0000uauf36dtb682-logo.png.jpg"
					alt="shop-logo"
					className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-lg"
				/>
			</div>
			<div className="w-full">
				<div className="flex flex-col gap-6">
					<div className="flex flex-row items-center gap-2">
						<h1 className="text-3xl font-bold">GamingWithAlex</h1>
						<MdVerified className="h-6 w-6" color="blue" />
					</div>
					<p className="text-base/6 text-slate-700">
						Welcome to my official merchandise store! Here you&apos;ll find exclusive designs and
						products that represent my brand and the amazing community we&apos;ve built together.
						Every purchase supports content creation and helps me continue bringing you the content
						you love.
					</p>
					<div className="flex flex-row gap-6">
						<div className="flex flex-row items-center gap-2">
							<MapPin className="h-4 w-4 text-gray-600" />
							<p className="text-sm font-medium font-roboto text-gray-600">{'San Francisco, CA'}</p>
						</div>
						<div className="flex flex-row items-center gap-2">
							<Calendar className="h-4 w-4" />
							<p className="text-sm font-medium font-roboto text-gray-600">
								{'Joined January 2020'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
