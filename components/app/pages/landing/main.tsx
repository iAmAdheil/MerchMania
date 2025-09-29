import LeftMain from './leftMain';
import RightMain from './rightMain';
import Marquee from './marquee';
import TrendingCarousel from './trendingCarousel';
import FeaturedProducts from './featuredProducts';
import TestimonialSlider from './testimonials';
import FeaturedCreators from './featuredCreators';
import HowItWorksSection from './howItWorksSection';

export default function HeroSection() {
	return (
		<div className="flex-1 h-full w-full flex flex-col justify-center">
			<div className="flex-1 w-full h-full flex flex-col lg:flex-row">
				<div className="flex-1 h-full w-full">
					<LeftMain />
				</div>
				<div className="flex-1 h-full w-full">
					<RightMain />
				</div>
			</div>
			<div className="w-full h-full">
				<Marquee />
			</div>
		</div>
	);
}

export function BottomMain() {
	return (
		<div className="w-full">
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
