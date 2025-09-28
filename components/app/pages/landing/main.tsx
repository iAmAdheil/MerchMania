import LeftMain from './leftMain';
import RightMain from './rightMain';
import Marquee from './marquee';
import TrendingCarousel from './trendingCarousel';
import FeaturedProducts from './featuredProducts';
import TestimonialSlider from './testimonials';
import FeaturedCreators from './featuredCreators';
import HowItWorksSection from './howItWorksSection';

export default function MainSection() {
	return (
		<div className="w-full">
			<div className="flex flex-row w-full">
				<div className='flex-1'>
					<LeftMain />
				</div>
				<div className='flex-1 bg-red-200'>Right Half</div>
				{/* <RightMain /> */}
			</div>
			<Marquee />
			<div className="py-10 flex flex-col gap-8 border-b-[0.5px] border-solid border-gray-200">
				<p className="pl-20 w-full text-2xl font-roboto font-bold">Trending Designs</p>
				<TrendingCarousel />
			</div>
			<FeaturedProducts />
			<TestimonialSlider />
			<FeaturedCreators />
			<HowItWorksSection />
		</div>
	);
}
