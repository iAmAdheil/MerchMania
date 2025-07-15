'use client';

import { useState } from 'react';
import { HStack, Separator, Stack, Text, Button, Field, Input } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';

export default function SigninCard() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleGoogleSignin = async () => {
		try {
			const { data, error } = await signIn.social({
				provider: 'google',
				errorCallbackURL: '/signin',
				callbackURL: '/',
				requestSignUp: false,
			});
			console.log(data);
			console.log(error);
		} catch (e: any) {
			console.log(e);
		}
	};

	return (
		<div className="w-[25rem] bg-white flex flex-col gap-5 border border-solid border-gray-200 px-10 py-6">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col">
					<h1 className="text-2xl font-roboto font-bold">Login</h1>
					<h2 className="text-xs font-roboto font-light text-gray-600">
						Enter your email and password to access your account
					</h2>
				</div>
				<Button
					onClick={async () => await handleGoogleSignin()}
					colorPalette="teal"
					variant="solid"
					className="py-2 border border-solid border-gray-300 text-xs font-roboto font-semibold hover:bg-slate-100"
				>
					<FcGoogle /> Continue With Google
				</Button>
			</div>
			<HStack>
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
			<div className="flex flex-col gap-4">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Email <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						onChange={e => setEmail(e.target.value)}
						placeholder="you@example.com"
						className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs font-roboto">
							Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
						<a href="" className="hover:text-purple-500 duration-200">
							<p className="font-light text-xs">Forgot Password</p>
						</a>
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput
								onChange={e => setPassword(e.target.value)}
								className="border border-solid border-gray-200 text-xs font-light rounded-sm px-3 py-1"
							/>
							{/* <PasswordStrengthMeter value={2} /> */}
						</div>
					</Stack>
				</Field.Root>
			</div>
			<div className="w-full flex flex-col gap-3 mt-1">
				<Button
					className="w-full text-xs font-semibold text-white bg-purple-600 hover:opacity-80"
					// onClick={async () => await handleClick()}
				>
					Sign In
				</Button>
				<p className="flex flex-row justify-center items-end gap-1 text-xs font-roboto text-gray-600">
					Don't have an account?{' '}
					<a href="/signup" className="text-sm decoration-purple-500 hover:underline">
						<span className="font-semibold text-purple-500">Sign up</span>
					</a>
				</p>
			</div>
		</div>
	);
}
