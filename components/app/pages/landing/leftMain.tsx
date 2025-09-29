export default function LeftMain() {
	return (
		<div className="flex-1 h-full w-full bg-purple-100 pl-16 pr-10 py-10 flex flex-col items-center justify-center gap-10">
			<h1 className="w-full font-bold font-roboto text-6xl text-black flex flex-col items-left">
				Wear Your Favorite
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
					Creator&apos;s Merchandise
				</span>
			</h1>
			<p className="w-full font-roboto text-xl/6 font-normal text-gray-600 flex flex-col items-left">
				Discover unique designs from your favorite influencers. Support creators directly and wear
				merchandise that&apos;s as unique as you are.
			</p>
			<div className="w-full">
				<div className="flex flex-row items-center gap-4">
					<button className="w-fit px-5 py-2 bg-purple-600 text-white text-base font-roboto font-semibold rounded-lg">
						Shop Now
					</button>
					<button className="w-fit px-5 py-2 bg-white text-purple-600 text-base font-roboto font-semibold rounded-lg border border-solid border-purple-600">
						Become a Creator
					</button>
				</div>
			</div>
		</div>
	);
}
