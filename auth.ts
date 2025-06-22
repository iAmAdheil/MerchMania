import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';

const saltRounds = 10;

type SignType = 'signin' | 'signup';
type UserRole = 'CUSTOMER' | 'ADMIN' | 'CREATOR' | null;

export class InvalidLoginError extends CredentialsSignin {
	error = 'InvalidLoginError';
	code = 'invalid_credentials';
}

export class UserNotFound extends CredentialsSignin {
	error = 'UserNotFFound';
	code = 'user_not_found';
}

export class UserAlreadyExists extends CredentialsSignin {
	error = 'UserAlreadyExists';
	code = 'user_already_exists';
}

export class IncorrectPassword extends CredentialsSignin {
	error = 'IncorrectPassword';
	code = 'incorrect_password';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google,
		// Credentials({
		// 	credentials: {
		// 		email: { label: 'Email', type: 'email' },
		// 		password: { label: 'Password', type: 'password' },
		// 	},
		// }),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			type: 'credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				type: { label: 'type', type: 'text' },
				role: { label: 'role', type: 'text' },
				username: { label: 'Username', type: 'text' },
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
				// confirmPassword: { label: 'Confirm Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					const type = credentials.type as SignType;
					const role = credentials.role as UserRole;
					const username = credentials.username as string | null;
					const email = credentials.email as string;
					const password = credentials.password as string;
					// const confirmPassword = credentials.confirmPassword as string | null;

					const existingUser = await prisma.user.findUnique({
						where: {
							email: email,
						},
					});

					// flow 1 signup ->
					if (type === 'signup') {
						if (existingUser) {
							// user already exists
							// try to signin pls
							throw new UserAlreadyExists();
						} else {
							// if password and confirmPassword don't match, already verified by frontend
							// data already verified using zod on frontend
							const hashedPassword = bcrypt.hashSync(password, 10);
							const newUser = await prisma.user.create({
								data: {
									role: role || 'CUSTOMER',
									username: username as string,
									email: email,
									password: hashedPassword,
								},
							});

							return {
								id: newUser.id,
								username: newUser.username,
								email: newUser.email,
								password: newUser.password,
							};
						}
					}

					// flow 2 -> signin
					if (type === 'signin') {
						if (!existingUser) {
							throw new UserNotFound();
						} else if (!bcrypt.compareSync(password, existingUser.password)) {
							throw new IncorrectPassword();
						} else {
							return {
								id: existingUser.id,
								username: existingUser.username,
								email: existingUser.email,
								password: existingUser.password,
							};
						}
					}

					return null;
				} catch (e: any) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(user, account, profile, email, credentials);
			if (account?.provider === 'credentials') {
				return true;
			} else if (account?.provider === 'google') {
				console.log('Print custom data!');
				const cookieStore = await cookies();
				const additionalAuthParams = cookieStore.get('additionalAuthParams');
				console.log(additionalAuthParams);
				// const customData = JSON.parse(atob(account.state as string));
				// // Add custom data to user object
				// console.log(customData)
			}
			return true;
		},
		async redirect({ url, baseUrl }) {
			// console.log(url, baseUrl);
			return baseUrl;
		},
		async session({ session, user, token }) {
			// console.log(session, user, token);
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			// console.log(token, user, account, profile);
			return token;
		},
	},
	pages: {
		signIn: '/signin',
	},
});
