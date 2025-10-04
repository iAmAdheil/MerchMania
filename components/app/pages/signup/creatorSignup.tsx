'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/auth/auth-client';
import { Stack, Field, Input } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import { Dispatch, SetStateAction } from 'react';
import { Display } from '@/app/signup/page';
import Loader from '../../ui/loader';
import * as z from 'zod/v4';

type UserDetails = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const detailsParser = z.object({
	role: z.literal('creator'),
	username: z.string().min(4).max(30),
	email: z.email(),
	password: z.string().min(8),
	confirmPassword: z.string(),
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

	const handleCredSignup = async () => {
		try {
			setIsLoading(true);
			const details = {
				role: 'creator',
				username: userDetails.username,
				email: userDetails.email,
				password: userDetails.password,
				confirmPassword: userDetails.confirmPassword,
			};

			console.log(details);

			const result = detailsParser.safeParse(details);
			console.log(result);
			if (!result.success) {
				alert('Invalid credentials');
				console.log(result.error);
				return;
			}
			if (result.data.password !== result.data.confirmPassword) {
				//	display error -> fields do not match!
				alert('Password fields do not match');
				return;
			}

			const { data, error } = await authClient.signUp.email(
				{
					role: details.role,
					isOnboarded: false,
					name: details.username,
					email: details.email,
					password: details.password,
					callbackURL: '/',
				},
				{
					onRequest: ctx => {
						console.log(ctx);
					},
					onSuccess: ctx => {
						console.log(ctx);
						router.replace('/');
					},
					onError: ctx => {
						alert(ctx.error.message);
					},
				}
			);
			console.log(data);
			console.log(error);
			// throw or set errors if any
		} catch (e: any) {
			console.log(e);
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={`w-full max-w-[30rem] px-6 py-8 relative flex flex-col items-center justify-center gap-5 bg-white rounded-md shadow-xl ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
		>
			{isLoading && (
				<div className="absolute bottom-1/2 z-10">
					<Loader size={60} />
				</div>
			)}
			<div className="flex flex-col items-center">
				<h2 className="text-2xl font-bold">Creator Signup</h2>
				<p className="text-sm font-roboto text-gray-600">Begin your creator journey with us</p>
			</div>
			<div className="w-full flex flex-col gap-4">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs md:text-sm font-roboto">
						Full Name <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						onChange={e =>
							setUserDetails(prevState => {
								return { ...prevState, username: e.target.value };
							})
						}
						placeholder="John Doe"
						className="border border-solid border-gray-200 text-xs sm:text-sm font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs md:text-sm font-roboto">
						Email <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						onChange={e =>
							setUserDetails(prevState => {
								return { ...prevState, email: e.target.value };
							})
						}
						placeholder="you@example.com"
						className="border border-solid border-gray-200 text-xs sm:text-sm font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs md:text-sm font-roboto">
							Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
						<a href="" className="hover:text-purple-500 duration-200">
							<p className="font-light text-xs">Forgot Password</p>
						</a>
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput
								onChange={e =>
									setUserDetails(prevState => {
										return { ...prevState, password: e.target.value };
									})
								}
								className="border border-solid border-gray-200 text-xs sm:text-sm font-light rounded-sm px-3 py-1"
							/>
							<PasswordStrengthMeter value={2} />
						</div>
					</Stack>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs md:text-sm font-roboto">
							Confirm Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput
								onChange={e =>
									setUserDetails(prevState => {
										return { ...prevState, confirmPassword: e.target.value };
									})
								}
								className="border border-solid border-gray-200 text-xs sm:text-sm font-light rounded-sm px-3 py-1"
							/>
						</div>
					</Stack>
				</Field.Root>
			</div>
			<div className="w-full flex flex-col gap-4 md:gap-6 md:mt-2">
				<div className="w-full flex flex-row justify-between items-center gap-4">
					<button
						onClick={() => {
							setDisplay('options');
						}}
						className="w-full py-2 rounded-md text-xs md:text-sm font-roboto font-semibold border border-solid border-gray-200 hover:bg-slate-100 duration-200"
					>
						Back
					</button>
					<button
						onClick={handleCredSignup}
						className="w-full py-2 rounded-md bg-purple-500 text-white text-xs md:text-sm font-roboto font-semibold border border-solid border-gray-200 hover:opacity-80 duration-200"
					>
						Create Account
					</button>
				</div>
				<p className="flex flex-row justify-center items-end gap-1 text-xs md:text-sm font-roboto text-gray-600">
					Already have an account?{' '}
					<a href="/signin" className="text-sm md:text-base decoration-purple-500 hover:underline">
						<span className="font-semibold text-purple-500">Sign in</span>
					</a>
				</p>
			</div>
		</div>
	);
}
