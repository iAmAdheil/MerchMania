import Navbar from "@/components/app/navbar/main"
import OnboardingForm from "@/components/app/pages/influencer-onboarding/mainForm"
import Footer from "@/components/app/ui/footer"

export default function Onboarding() {
	return (
		<div>
			<Navbar />
			<OnboardingForm />
			<Footer />
		</div>
	)
}