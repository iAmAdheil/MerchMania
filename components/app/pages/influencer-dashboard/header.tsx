import { Plus, Settings } from "lucide-react";

export default function Header() {
	return (
		<div className="w-full flex flex-row justify-between items-end px-16 pt-6 pb-4">
			<div>
				<h1 className="text-3xl font-bold font-roboto">Dashboard</h1>
				<p className="text-gray-600 text-base font-roboto mt-1">Welcome back, CyberNinja!</p>
			</div>
			<div className="flex flex-row gap-8">
				<button className="flex flex-row gap-2 items-center text-xs font-semibold font-roboto px-4 py-2 rounded-lg border-[0.5px] border-solid border-gray-400 hover:bg-slate-50 hover:text-purple-500 duration-150">
					<Plus className="h-4 w-4" />
					Add Product
				</button>
				<button className="flex flex-row items-center gap-2 text-xs font-semibold font-roboto text-white px-5 py-2.5 rounded-lg bg-purple-500 hover:opacity-80">
					<Settings className="h-4 w-4" color="white" />
					Store Settings
				</button>
			</div>
		</div>
	);
}
