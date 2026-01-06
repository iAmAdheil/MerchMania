export default function LeftHero() {
  return (
    <div className="pt-10 pb-7 px-6 md:px-16 lg:px-10 w-full h-full flex-1 flex flex-col justify-center items-start md:items-center lg:items-start gap-6 md:gap-10 bg-purple-100">
      <h1 className="w-full text-5xl md:text-6xl xl:text-7xl text-black font-bold font-roboto flex flex-col items-start md:items-center lg:items-start">
        Wear Your Favorite
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text">
          Creator&apos;s Merchandise
        </span>
      </h1>
      <p className="w-full flex flex-col items-start md:items-center lg:items-start text-lg/5 xl:text-xl/6 text-gray-600 font-normal font-roboto">
        Discover unique designs from your favorite influencers. Support creators directly and wear
        merchandise that&apos;s as unique as you are.
      </p>
      <div className="w-full flex justify-center lg:justify-start">
        <div className="flex flex-row items-center gap-4">
          <button className="px-5 py-2 w-fit text-base text-white font-roboto font-semibold bg-purple-600 rounded-lg">
            Shop Now
          </button>
          <button className="px-5 py-2 w-fit text-purple-600 text-base font-roboto font-semibold bg-white border border-solid border-purple-600 rounded-lg">
            Our Influencers
          </button>
        </div>
      </div>
    </div>
  );
}
