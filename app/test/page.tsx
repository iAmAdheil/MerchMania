import FeaturedCreators, { CreatorCard } from '@/components/app/pages/landing/featuredCreators';

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
			<FeaturedCreators />
			{/* <CreatorCard creator={CREATOR} /> */}
		</div>
	);
}
