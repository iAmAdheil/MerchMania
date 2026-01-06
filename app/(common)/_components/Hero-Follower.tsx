import DisplayCarousel from './Display-Carousel';
import FeaturedCreators from './Featured-Creators';
import ProductCategories from './Product-Categories';
import HowItWorks from './How-It-Works';

export default function HeroFollower() {
  return (
    <div>
      <DisplayCarousel />
      <FeaturedCreators />
      <ProductCategories />
      <HowItWorks />
    </div>
  );
}