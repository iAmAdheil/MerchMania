'use client';

import { useState } from 'react';
import { Store, Upload, X } from 'lucide-react';
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
import { blobUrlToFile } from '@/utils/convert';
import { saveShopDetails } from '@/actions/save';
import { ShopDetailsSchema } from '@/types';
import Loader from '@/components/app/ui/loader';

import 'react-international-phone/style.css';

export default function OnboardingForm() {
	const [loading, setLoading] = useState<boolean>(false);

	const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>({});
	const [link, setLink] = useState<string>('');
	const [platform, setPlatform] = useState<string>('');
	const [shopName, setShopName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [contact, setContact] = useState<string>('');
	// const [location, setLocation] = useState<string>('');
	const [logoUrl, setLogoUrl] = useState<string>('');
	const [bannerUrl, setBannerUrl] = useState<string>('');
	const [logoDragActive, setLogoDragActive] = useState<boolean>(false);
	const [bannerDragActive, setBannerDragActive] = useState<boolean>(false);

	const handleAdd = () => {
		if (platform === '' || link === '') return;

		setSocialLinks(prevState => {
			return {
				...prevState,
				[platform]: link,
			};
		});
		setLink('');
		setPlatform('');
	};

	const handleShopCreate = async () => {
		try {
			setLoading(true);
			const formData = new FormData();

			const shopDetails: ShopDetailsSchema = {
				name: shopName,
				description: description,
				location: '',
				logo: logoUrl,
				banner: bannerUrl,
				contact: contact,
				socialLinks: socialLinks,
			};

			formData.append('shopDetails', JSON.stringify(shopDetails));

			const logoFile = await blobUrlToFile(logoUrl, 'logo.png');
			formData.append('logo', logoFile);
			if (bannerUrl.length > 0) {
				const bannerFile = await blobUrlToFile(bannerUrl, 'banner.png');
				formData.append('banner', bannerFile);
			}

			formData.append('ownerId', 'NDz20MHsojeB6n8Mlr1ahgVoiGtFcrwn');

			const response = await saveShopDetails(formData);
			if (response === 1) {
				alert('Shop created successfully!');
			} else {
				alert('Failed to create shop. Please try again.');
			}
		} catch (e) {
			console.log(e);
			alert('Failed to create shop. Please try again. ' + e);
		} finally {
			setLoading(false);
		}
	};

	const handleImageUpload = (file: File, type: 'logo' | 'banner') => {
		if (file && file.type.startsWith('image/')) {
			const url = URL.createObjectURL(file);
			if (type === 'logo') {
				setLogoUrl(url);
			} else {
				setBannerUrl(url);
			}
		}
	};

	const handleDragOver = (e: React.DragEvent, type: 'logo' | 'banner') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'logo') {
			setLogoDragActive(true);
		} else {
			setBannerDragActive(true);
		}
	};

	const handleDragLeave = (e: React.DragEvent, type: 'logo' | 'banner') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'logo') {
			setLogoDragActive(false);
		} else {
			setBannerDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent, type: 'logo' | 'banner') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'logo') {
			setLogoDragActive(false);
		} else {
			setBannerDragActive(false);
		}

		const file = e.dataTransfer.files?.[0];
		if (file) {
			handleImageUpload(file, type);
		}
	};

	return (
		<div className="w-full md:py-10 bg-gray-50">
			<div className="bg-gray-50 w-full py-16 md:py-6 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-8 rounded-lg">
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
							className="w-full border border-solid border-gray-300 text-sm md:text-base font-light rounded-sm pl-3 py-1"
							value={shopName}
							onChange={e => setShopName(e.target.value)}
						/>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Description <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Textarea
							value={description}
							onChange={e => setDescription(e.target.value)}
							minH="3lh"
							maxH="8lh"
							placeholder="Cyber Ninja is a brand that sells cyber ninja products"
							className="text-sm md:text-base py-1.5 px-2 border border-solid placeholder:text-gray-400 placeholder:font-light border-gray-300 rounded-sm"
							autoresize
						/>
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Logo <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<div
							className={`w-full flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
								logoDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
							}`}
							onDragOver={e => handleDragOver(e, 'logo')}
							onDragLeave={e => handleDragLeave(e, 'logo')}
							onDrop={e => handleDrop(e, 'logo')}
						>
							{logoUrl ? (
								<div className="flex flex-col items-center gap-4">
									<img
										src={logoUrl}
										alt="Logo preview"
										className="max-w-[200px] max-h-[200px] object-contain rounded-lg"
									/>
									<button
										onClick={() => {
											document.getElementById('logo-upload')?.click();
										}}
										className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									>
										Change Logo
									</button>
								</div>
							) : (
								<>
									<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
									<p className="text-sm md:text-base font-roboto mb-4">
										{logoDragActive ? 'Drop image here' : 'Drag and drop or click to upload'}
									</p>
									<button
										onClick={() => {
											document.getElementById('logo-upload')?.click();
										}}
										className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									>
										Upload Logo
									</button>
								</>
							)}
							<input
								id="logo-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={e => {
									const img = e.target.files?.[0];
									if (img) {
										handleImageUpload(img, 'logo');
									}
								}}
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
						<div
							className={`w-full flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
								bannerDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
							}`}
							onDragOver={e => handleDragOver(e, 'banner')}
							onDragLeave={e => handleDragLeave(e, 'banner')}
							onDrop={e => handleDrop(e, 'banner')}
						>
							{bannerUrl ? (
								<div className="w-full flex flex-col items-center gap-4">
									<img
										src={bannerUrl}
										alt="Banner preview"
										className="max-w-full max-h-[300px] object-contain rounded-lg"
									/>
									<button
										onClick={() => {
											document.getElementById('banner-upload')?.click();
										}}
										className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									>
										Change Banner
									</button>
								</div>
							) : (
								<>
									<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
									<p className="text-sm md:text-base font-roboto mb-4">
										{bannerDragActive ? 'Drop image here' : 'Drag and drop or click to upload'}
									</p>
									<button
										onClick={() => {
											document.getElementById('banner-upload')?.click();
										}}
										className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									>
										Upload Banner
									</button>
								</>
							)}
							<input
								id="banner-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={e => {
									const img = e.target.files?.[0];
									if (img) {
										handleImageUpload(img, 'banner');
									}
								}}
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
								value={contact}
								onChange={e => setContact(e)}
								countrySelectorStyleProps={{
									buttonStyle: { paddingLeft: 15, paddingRight: 15, height: 45 },
									dropdownStyleProps: { style: { marginTop: 10, borderRadius: 5 } },
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
							<div className="flex flex-col gap-2">
								<Field.Root required className="flex flex-col gap-2">
									<Field.Label className="text-sm md:text-base font-roboto">
										Social Links (at least 1) <Field.RequiredIndicator color={'purple.500'} />
									</Field.Label>
								</Field.Root>
								<div className="w-full flex flex-row items-center gap-3 md:gap-6">
									<SocialInput
										link={link}
										setLink={setLink}
										platform={platform}
										setPlatform={setPlatform}
									/>
									<button
										onClick={handleAdd}
										className="text-xs sm:text-sm font-roboto font-semibold cursor-pointer bg-purple-500 text-white px-3 sm:px-4 py-3 sm:py-2 rounded-sm"
									>
										Add
									</button>
								</div>
							</div>
							<div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-3">
								{Object.keys(socialLinks).map(key => (
									<div className="w-full flex flex-row items-center justify-between" key={key}>
										<div className="flex flex-row items-center gap-3">
											<p className="text-sm md:text-base font-roboto">{key}</p>
											<p className="text-sm md:text-base font-roboto">
												{socialLinks[key].length > 30
													? socialLinks[key].slice(0, 30) + '...'
													: socialLinks[key]}
											</p>
										</div>
										<div
											className="cursor-pointer"
											onClick={() => {
												setSocialLinks(prevState => {
													const newState = { ...prevState } as { [key: string]: string };
													delete newState[key];
													return newState;
												});
											}}
										>
											<X className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex justify-center sm:justify-start">
					<button
						onClick={handleShopCreate}
						className="max-w-28 md:max-w-32 w-full bg-white text-black text-sm md:text-base font-roboto rounded-sm px-4 py-2 border border-solid border-purple-500 flex items-center justify-center"
					>
						{loading ? <Loader size={20} /> : 'Create Shop'}
					</button>
				</div>
			</div>
		</div>
	);
}

const DomainSelect = ({
	platform,
	setPlatform,
}: {
	platform: string;
	setPlatform: (platform: string) => void;
}) => (
	<Select.Root
		collection={platforms}
		size="sm"
		className="w-20 md:w-28 px-1.5 md:px-2 text-sm font-roboto cursor-pointer flex flex-row items-center border-l-[1px] border-solid border-gray-300 outline-none"
	>
		<Select.HiddenSelect />
		<Select.Control className="w-full outline-none">
			<Select.Trigger value={platform} className="w-full outline-none">
				<Select.ValueText className="text-xs md:text-sm" placeholder="Social" />
			</Select.Trigger>
			<Select.IndicatorGroup>
				<Select.Indicator />
			</Select.IndicatorGroup>
		</Select.Control>
		<Portal>
			<Select.Positioner className="-ml-3">
				<Select.Content width={100} className="bg-white flex flex-col gap-2">
					{platforms.items.map(platform => (
						<Select.Item
							item={platform}
							key={platform.value}
							onClick={() => setPlatform(platform.value)}
							className="py-1 px-3"
						>
							{platform.label}
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Portal>
	</Select.Root>
);

const SocialInput = ({
	link,
	setLink,
	platform,
	setPlatform,
}: {
	link: string;
	setLink: (link: string) => void;
	platform: string;
	setPlatform: (platform: string) => void;
}) => {
	return (
		<InputGroup
			className="w-full pr-12 border-[1px] border-solid border-gray-300 rounded-sm"
			endElement={<DomainSelect platform={platform} setPlatform={setPlatform} />}
		>
			<Input
				value={link}
				onChange={e => setLink(e.target.value)}
				className="pl-2 pr-10 w-full text-sm md:text-base font-roboto cursor-pointer outline-none"
				placeholder="yoursite.com"
			/>
		</InputGroup>
	);
};

const platforms = createListCollection({
	items: [
		{ label: 'Instagram', value: 'Instagram' },
		{ label: 'Youtube', value: 'Youtube' },
		{ label: 'TikTok', value: 'Tiktok' },
		{ label: 'Twitter', value: 'Twitter' },
		{ label: 'Facebook', value: 'Facebook' },
		{ label: 'LinkedIn', value: 'Linkedin' },
		{ label: 'Pinterest', value: 'Pinterest' },
		{ label: 'Reddit', value: 'Reddit' },
		{ label: 'Snapchat', value: 'Snapchat' },
		{ label: 'Telegram', value: 'Telegram' },
	],
});
