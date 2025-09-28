import { Users, Star, Palette } from 'lucide-react';

export default function LeftSection() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-brand-purple via-brand-light-purple to-brand-orange overflow-hidden">
			<div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
				<div className="mb-8">
					<h1 className="text-5xl font-bold mb-4">
						Welcome to
						<br />
						<span className="bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
							CreatorMerch
						</span>
					</h1>
					<p className="text-base font-roboto text-white/90 max-w-md">
						Join thousands of creators and customers building amazing merchandise experiences
						together
					</p>
				</div>

				<div className="flex flex-col gap-6 max-w-md">
					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Users className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold">Join as Customer</div>
							<div className="text-sm text-white/80">Shop unique creator merchandise</div>
						</div>
					</div>

					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Star className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold">Join as Creator</div>
							<div className="text-sm text-white/80">Start your merchandise empire</div>
						</div>
					</div>

					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Palette className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold">Custom Designs</div>
							<div className="text-sm text-white/80">Bring your vision to life</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
