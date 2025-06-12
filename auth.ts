import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

type UserRole = 'CUSTOMER' | 'ADMIN' | 'CREATOR';

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
				role: { label: 'role', type: 'text' },
				username: { label: 'Username', type: 'text' },
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
				confirmPassword: { label: 'Confirm Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				// const res = await fetch('/your/endpoint', {
				// 	method: 'POST',
				// 	body: JSON.stringify(credentials),
				// 	headers: { 'Content-Type': 'application/json' },
				// });
				// const user = await res.json();

				// // If no error and we have user data, return it
				// if (res.ok && user) {
				// 	return user;
				// }
				// Return null if user data could not be retrieved
				console.log(credentials, req);

				const role = credentials.role as UserRole;
				const username = credentials.username as string;
				const email = credentials.email as string;
				const password = credentials.password as string;
				const confirmPassword = credentials.confirmPassword as string;

				try {
					const existingUser = await prisma.user.findUnique({
						where: {
							email: email,
						},
					});

					// flow 1 signup ->
					if (confirmPassword.length > 6) {
						// user trying to signup
						if (existingUser) {
							// user already exists
							// try to signin pls
							return null;
						} else {
							// data already verified using zod on frontend
							const hashedPassword = bcrypt.hashSync(password, 10);
							const newUser = await prisma.user.create({
								data: {
									role: role,
									username: username,
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
					if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
						return {
							id: existingUser.id,
							username: existingUser.username,
							email: existingUser.email,
							password: existingUser.password,
						};
					}

					return null;
				} catch (e: any) {
					console.log(e);
					return null;					
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(user, account, profile, email, credentials);
			return true;
		},
		async redirect({ url, baseUrl }) {
			console.log(url, baseUrl);
			return baseUrl;
		},
		async session({ session, user, token }) {
			console.log(session, user, token);
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log(token, user, account, profile);
			return token;
		},
	},
	pages: {
		signIn: '/signin',
	},
});
