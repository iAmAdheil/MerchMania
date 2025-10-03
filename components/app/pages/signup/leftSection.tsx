import { Users, Star, Palette } from 'lucide-react';
import { useState } from 'react';
import { type Display, Form } from '@/app/signup/page';

export default function LeftSection() {
	const [display, setDisplay] = useState<Display>('options');

	return (
		<div className="w-full h-full py-10 px-6 bg-white lg:bg-gradient-to-br lg:from-white lg:via-brand-light-purple lg:to-brand-orange">
			<div className="w-full h-full relative z-10 flex flex-col justify-center items-center gap-8">
				<div className="w-full flex flex-col items-center">
					<h1 className="w-full text-5xl font-bold mb-4 text-black text-center">
						Welcome to
						<br />
						<span className="bg-gradient-to-r from-gray-300 to-orange-500 bg-clip-text text-transparent">
							MerchMania
						</span>
					</h1>
					<p className="w-full text-sm md:text-base font-roboto text-black/90 text-center max-w-[30rem]">
						Join thousands of creators and customers building amazing merchandise experiences
						together
					</p>
				</div>

				<div className="w-full flex-col gap-6 max-w-[25rem] hidden lg:flex">
					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Users className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold text-white/80">Join as Customer</div>
							<div className="text-sm text-white/80">Shop unique creator merchandise</div>
						</div>
					</div>

					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Star className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold text-white/80">Join as Creator</div>
							<div className="text-sm text-white/80">Start your merchandise empire</div>
						</div>
					</div>

					<div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
						<Palette className="h-8 w-8 text-brand-orange" />
						<div className="text-left">
							<div className="font-semibold text-white/80">Custom Designs</div>
							<div className="text-sm text-white/80">Bring your vision to life</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center lg:hidden w-full">
					<Form display={display} setDisplay={setDisplay} />
				</div>
			</div>
		</div>
	);
}
