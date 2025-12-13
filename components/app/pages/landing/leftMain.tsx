export default function LeftMain() {
	return (
		<div className="flex-1 h-full w-full bg-purple-100 pt-10 pb-7 px-6 md:px-16 lg:px-10 flex flex-col items-start md:items-center lg:items-start justify-center gap-6 md:gap-10">
			<h1 className="w-full font-bold font-roboto text-5xl md:text-6xl xl:text-7xl text-black flex flex-col items-start md:items-center lg:items-start">
				Wear Your Favorite
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
					Creator&apos;s Merchandise
				</span>
			</h1>
			<p className="w-full font-roboto text-lg/5 xl:text-xl/6 font-normal text-gray-600 flex flex-col items-start md:items-center lg:items-start">
				Discover unique designs from your favorite influencers. Support creators directly and wear
				merchandise that&apos;s as unique as you are.
			</p>
			<div className="w-full flex justify-center lg:justify-start">
				<div className="flex flex-row items-center gap-4">
					<button className="w-fit px-5 py-2 bg-purple-600 text-white text-base font-roboto font-semibold rounded-lg">
						Shop Now
					</button>
					<button className="w-fit px-5 py-2 bg-white text-purple-600 text-base font-roboto font-semibold rounded-lg border border-solid border-purple-600">
						Our Influencers
					</button>
				</div>
			</div>
		</div>
	);
}
