import FeaturedCreators from '@/components/app/pages/landing/featuredCreators';
import { CreatorCard } from '@/components/app/pages/landing/featuredCreators';

const CREATOR = {
	id: '1',
	name: 'GamingWithAlex',
	avatar: '/placeholder.svg',
	followers: '1.2M',
	category: 'Gaming',
	productCount: 24,
};

export default function Test() {
	return (
		<div>
			<CreatorCard creator={CREATOR} />
		</div>
	);
}
