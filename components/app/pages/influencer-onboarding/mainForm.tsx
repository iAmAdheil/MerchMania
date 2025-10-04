'use client';

import { Store, Upload } from 'lucide-react';
import {
	Field,
	Input,
	Textarea,
	InputGroup,
	Select,
	Portal,
	createListCollection,
} from '@chakra-ui/react';
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';

export default function OnboardingForm() {
	return (
		<div className="w-full md:py-10 bg-gray-50">
			<div className="bg-gray-50 w-full py-16 md:py-6 px-6 md:px-10 max-w-3xl mx-auto flex flex-col justify-center items-center gap-8 rounded-lg">
				<div className="w-full flex flex-col gap-4">
					<Store className="h-16 w-16 mx-auto text-brand-purple" />
					<div className="flex flex-col items-center">
						<h2 className="text-2xl font-bold font-roboto">Set Up Your Store</h2>
						<p className="text-sm md:text-base text-gray-600 font-roboto">
							Let&apos;s create your unique brand identity
						</p>
					</div>
				</div>
				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Shop Name <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Input
							placeholder="Cyber Ninja"
							className="w-full border border-solid border-gray-200 text-sm md:text-base font-light rounded-sm pl-3 py-1"
						/>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Description <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Textarea
							minH="3lh"
							maxH="8lh"
							placeholder="Cyber Ninja is a brand that sells cyber ninja products"
							className="text-sm md:text-base py-1.5 px-2 border border-solid placeholder:text-gray-400 placeholder:font-light border-gray-200 rounded-sm"
							autoresize
						/>
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Logo <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<div className="w-full flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<button
								onClick={() => {
									document.getElementById('logo-upload')?.click();
								}}
								className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
							>
								Upload Logo
							</button>
							<input
								id="logo-upload"
								type="file"
								accept="image/*"
								className="hidden"
								// onChange={e => {
								// 	const img = e.target.files?.[0];
								// 	if (img) {
								// 		const url = URL.createObjectURL(img);
								// 		console.log(url);
								// 		setShopDetails(prevState => {
								// 			return {
								// 				...prevState,
								// 				logo: url,
								// 			};
								// 		});
								// 	}
								// }}
							/>
							<div className="flex flex-col gap-2">
								<p className="text-xs text-gray-500 mt-6">Preferred dimensions: 200 x 200</p>
								<p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">Banner</Field.Label>
						</Field.Root>
						<div className="w-full flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<button
								onClick={() => {
									document.getElementById('logo-upload')?.click();
								}}
								className="px-3 py-2 rounded-md bg-white text-sm md:text-base font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
							>
								Upload Banner
							</button>
							<input
								id="logo-upload"
								type="file"
								accept="image/*"
								className="hidden"
								// onChange={e => {
								// 	const img = e.target.files?.[0];
								// 	if (img) {
								// 		const url = URL.createObjectURL(img);
								// 		console.log(url);
								// 		setShopDetails(prevState => {
								// 			return {
								// 				...prevState,
								// 				logo: url,
								// 			};
								// 		});
								// 	}
								// }}
							/>
							<div className="flex flex-col gap-2">
								<p className="text-xs text-gray-500 mt-6">Preferred dimensions: 200 x 1000</p>
								<p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col mt-6 gap-10">
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									Contact Details <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<PhoneInput
								countrySelectorStyleProps={{
									buttonStyle: { paddingLeft: 15, paddingRight: 15, height: 45 },
									dropdownStyleProps: { style: { marginTop: 10 } },
								}}
								inputStyle={{
									width: '100%',
									fontSize: 15,
									paddingLeft: 10,
									paddingRight: 10,
									height: 45,
									backgroundColor: '#f9fafb',
								}}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									Social Links (at least 1) <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<div className="w-full flex flex-row items-center gap-3 md:gap-6">
								<SocialInput />
								<button className="text-xs sm:text-sm font-roboto cursor-pointer bg-white border-[1px] border-solid border-purple-500 text-purple-500 px-3 sm:px-4 py-3 sm:py-2 rounded-sm">
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const DomainSelect = () => (
	<Select.Root
		collection={frameworks}
		size="sm"
		className="w-20 px-2 text-sm font-roboto cursor-pointer flex flex-row items-center gap-3 border-l-[1px] border-solid border-gray-300"
	>
		<Select.HiddenSelect />
		<Select.Control className="w-full">
			<Select.Trigger>
				<Select.ValueText placeholder="Social" />
			</Select.Trigger>
			<Select.IndicatorGroup>
				<Select.Indicator />
			</Select.IndicatorGroup>
		</Select.Control>
		<Portal>
			<Select.Positioner className="-ml-3">
				<Select.Content width={100} className="py-2 px-3 bg-white flex flex-col gap-2">
					{frameworks.items.map(framework => (
						<Select.Item item={framework} key={framework.value}>
							{framework.label}
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Portal>
	</Select.Root>
);

const SocialInput = () => {
	return (
		<InputGroup
			className="w-full pr-12 border-[1px] border-solid border-gray-300 rounded-sm"
			endElement={<DomainSelect />}
		>
			<Input
				className="pl-2 pr-10 w-full text-sm md:text-base font-roboto cursor-pointer outline-none"
				placeholder="yoursite.com"
			/>
		</InputGroup>
	);
};

const frameworks = createListCollection({
	items: [
		{ label: 'React.js', value: 'react' },
		{ label: 'Vue.js', value: 'vue' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'Svelte', value: 'svelte' },
	],
});
