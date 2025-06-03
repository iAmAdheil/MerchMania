import Navbar from '@/components/app/navbar/main';
import SigninSection from '@/components/app/pages/signin/signinSection';
import Footer from '@/components/app/ui/footer';

export default function SignIn() {
	return (
		<div>
			<Navbar />
			<SigninSection />
			<Footer />
		</div>
	);
}
