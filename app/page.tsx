// import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
// import FloatingBubblesBackground from "@/components/app/ui/floatingBubbles";
import Navbar from '@/components/app/navbar/main';
import MainSection from '@/components/app/pages/landing/main';

export default function Home() {
	return (
		<div className="min-h-screen w-screen">
			<Navbar />
			<MainSection />
		</div>
	);
}
