import LeftMain from './leftMain';
import RightMain from './rightMain';
import Marquee from './marquee';
import DisplayCarousel from './displayCarousel';
import FeaturedProducts from './featuredProducts';
import TestimonialSlider from './testimonials';
import FeaturedCreators from './featuredCreators';
import HowItWorksSection from './howItWorksSection';

export default function HeroSection() {
	return (
		<div className="flex-1 h-full w-full flex flex-col justify-center">
			<div className="flex-1 w-full h-full flex flex-col lg:flex-row lg:items-center bg-purple-100">
				<div className="flex-1 h-full w-full flex flex-col">
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
			<DisplayCarousel />
			<FeaturedCreators />
			{/* <FeaturedProducts /> */}
			{/* <TestimonialSlider />
			<HowItWorksSection /> */}
		</div>
	);
}
