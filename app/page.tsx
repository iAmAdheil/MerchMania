'use client';
// import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
// import FloatingBubblesBackground from "@/components/app/ui/floatingBubbles";
import Navbar from '@/components/app/navbar/main';
import MainSection from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {

	const { data: session, status } = useSession();

	return (
		<div className="min-h-screen w-screen">
			<Navbar />
			<MainSection />
			<Footer />
		</div>
	);
}
