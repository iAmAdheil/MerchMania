import DisplayCarousel from './DisplayCarousel';
import FeaturedCreators from './FeaturedCreators';
import ProductCategories from './ProductCategories';
import HowItWorks from './HowItWorks';

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