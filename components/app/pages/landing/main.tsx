import LeftMain from './leftMain';
import RightMain from './rightMain';
import Marquee from './marquee';
import TrendingDesigns from './trending';

export default function MainSection() {
	return (
		<div className='w-full'>
			{/* <div className="flex flex-row w-full">
				<LeftMain />
				<RightMain />
			</div>
			<Marquee /> */}
			<TrendingDesigns />
		</div>
	);
}
