import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google,
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				// let user = null;
				// check if user exists, if not take to signup
				// if user exists check password				
				return null;
			}
		}),
	],
});
