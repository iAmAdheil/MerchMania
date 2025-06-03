import { Users, ArrowRight, Star } from 'lucide-react';

export default function OptionsBox() {
	return (
		<div className="flex flex-col gap-5 items-center bg-white px-6 py-5 shadow-xl">
			<div>
				<h2 className="text-2xl font-bold">Create Account</h2>
				<p className="text-sm font-roboto text-gray-600">
					Choose how you'd like to join our community
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<button className="flex flex-row justify-between items-center gap-10 border-[1.5px] border-solid border-gray-300 px-4 py-3 rounded-lg hover:border-purple-500 hover:bg-purple-50 duration-200">
					<div className="flex flex-row items-center gap-3">
						<div className="bg-purple-200 p-2 rounded-lg opacity-90">
							<Users className="w-4 h-4" color="purple" />
						</div>
						<div className="flex flex-col text-left">
							<p className="text-sm font-roboto font-semibold">Join as Customer</p>
							<p className="text-xs font-roboto text-gray-600">
								Shop exclusive creator merchandise
							</p>
						</div>
					</div>
					<ArrowRight className="h-4 w-4" />
				</button>
				<button className="flex flex-row justify-between items-center gap-10 border-[1.5px] border-solid border-gray-300 px-4 py-3 rounded-lg hover:border-purple-500 hover:bg-purple-50 duration-200">
					<div className="flex flex-row items-center gap-3">
						<div className="bg-orange-200 p-2 rounded-lg opacity-90">
							<Star className="w-4 h-4" color="red" />
						</div>
						<div className="flex flex-col text-left">
							<p className="text-sm font-roboto font-semibold">Join as Creator</p>
							<p className="text-xs font-roboto text-gray-600">
								Start selling your merchandise
							</p>
						</div>
					</div>
					<ArrowRight className="h-4 w-4" />
				</button>
			</div>
			<div>
				<p className='text-sm text-gray-600 font-roboto'>Already have an account? <span className='text-purple-600 decoration-purple-600 cursor-pointer hover:underline'>Sign in</span></p>
			</div>
		</div>
	);
}
