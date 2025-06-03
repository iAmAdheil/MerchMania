import LeftSection from '@/components/app/pages/signup/leftSection';
import OptionsBox from '@/components/app/pages/signup/optionsBox';

export default function Signup() {
	return (
		<div className="min-h-screen flex flex-row">
			<LeftSection />
			<div className="flex-1 flex justify-center items-center bg-gray-50">
				<OptionsBox />
			</div>
		</div>
	);
}
