'use client';

import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { HStack, Separator, Stack, Text, Button, Field, Input } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import { Dispatch, SetStateAction } from 'react';
import { Display } from '@/app/signup/page';
import { FcGoogle } from 'react-icons/fc';
import { signIn, signOut, useSession } from 'next-auth/react';
import Loader from '../../ui/loader';
import * as z from 'zod/v4';

type UserDetails = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const UserDetailsParser = z.object({
	type: z.literal('signup'),
	role: z.literal('CREATOR'),
	username: z.string().min(4).max(30),
	email: z.email(),
	password: z.string().min(8),
});

export default function CreatorSignup({
	setDisplay,
}: {
	setDisplay: Dispatch<SetStateAction<Display>>;
}) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleGoogleSignup = async () => {
		try {
			const customData = { role: 'creator', type: 'signup' };
			const cookieStore = await cookies();
			cookieStore.set('additionalAuthParams', JSON.stringify(customData));
			const res = await signIn('google', { callbackUrl: '/' });
			console.log(res);
		} catch (e: any) {
			console.log(e);
		}
	};

	const handleCredSignup = async () => {
		try {
			setIsLoading(true);
			const data = {
				type: 'signup',
				role: 'CREATOR',
				username: userDetails.username,
				email: userDetails.email,
				password: userDetails.password,
			};
			const result = UserDetailsParser.safeParse(data);
			if (!result.success) {
				// display error
				console.log('invalid credentials');
				console.log(result.error);
				return;
			}
			if (result.data.password !== userDetails.confirmPassword) {
				//	display error -> fields do not match!
				console.log('password fields do not match');
				return;
			}
			const res = await signIn('credentials', {
				...result.data,
				redirect: false,
			});
			console.log(res);
			if (!res || res.error === 'CredentialsSignin') {
				// don't throw, display error
				return;
				// throw new Error('Request failed, Please try again later!');
			}
			router.push('/');
		} catch (e: any) {
			console.log(e);
			// display request failed error
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={`relative w-[25rem] flex flex-col items-center justify-center gap-5 bg-white px-8 py-6 rounded-lg shadow-xl ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
		>
			{isLoading && (
				<div className="absolute bottom-1/2 z-10">
					<Loader size={60} />
				</div>
			)}
			<div className="flex flex-col items-center">
				<h2 className="text-2xl font-bold">Creator Signup</h2>
				<p className="text-sm font-roboto text-gray-600">
					Begin your creator journey with us
				</p>
			</div>
			<div className="w-full">
				<Button
					onClick={handleGoogleSignup}
					colorPalette="teal"
					variant="solid"
					className="py-2 w-full border border-solid border-gray-300 text-xs font-roboto font-semibold hover:bg-slate-100"
				>
					<FcGoogle /> Signup With Google
				</Button>
			</div>
			<HStack className="w-full">
				<Separator
					flex="1"
					className="border-[0.1px] border-solid border-gray-200 flex-1"
				/>
				<Text flexShrink="0" className="font-roboto font-light text-[10px] text-gray-500">
					OR
				</Text>
				<Separator
					flex="1"
					className="border-[0.1px] border-solid border-gray-200 flex-1"
				/>
			</HStack>
			<div className="w-full flex flex-col gap-4">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Full Name <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						onChange={e =>
							setUserDetails(prevState => {
								return { ...prevState, username: e.target.value };
							})
						}
						placeholder="John Doe"
						className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Email <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						onChange={e =>
							setUserDetails(prevState => {
								return { ...prevState, email: e.target.value };
							})
						}
						placeholder="you@example.com"
						className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs font-roboto">
							Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
						{/* <a href="" className="hover:text-purple-500 duration-200">
							<p className="font-light text-xs">Forgot Password</p>
						</a> */}
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput
								onChange={e =>
									setUserDetails(prevState => {
										return { ...prevState, password: e.target.value };
									})
								}
								className="border border-solid border-gray-200 text-xs font-light rounded-sm px-3 py-1"
							/>
							<PasswordStrengthMeter value={2} />
						</div>
					</Stack>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs font-roboto">
							Confirm Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
						{/* <a href="" className="hover:text-purple-500 duration-200">
							<p className="font-light text-xs">Forgot Password</p>
						</a> */}
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput
								onChange={e =>
									setUserDetails(prevState => {
										return { ...prevState, confirmPassword: e.target.value };
									})
								}
								className="border border-solid border-gray-200 text-xs font-light rounded-sm px-3 py-1"
							/>
						</div>
					</Stack>
				</Field.Root>
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="w-full flex flex-row justify-between items-center">
					<button
						onClick={() => {
							setDisplay('options');
						}}
						className="w-[10rem] py-2 rounded-md text-xs font-roboto font-semibold border border-solid border-gray-200 hover:bg-slate-100 duration-200"
					>
						Back
					</button>
					<button
						onClick={handleCredSignup}
						className="w-[10rem] py-2 rounded-md bg-purple-500 text-white text-xs font-roboto font-semibold border border-solid border-gray-200 hover:opacity-80 duration-200"
					>
						Create Account
					</button>
				</div>
				<p className="flex flex-row justify-center items-end gap-1 text-xs font-roboto text-gray-600">
					Already have an account?{' '}
					<a href="/signin" className="text-sm decoration-purple-500 hover:underline">
						<span className="font-semibold text-purple-500">Sign in</span>
					</a>
				</p>
			</div>
		</div>
	);
}
