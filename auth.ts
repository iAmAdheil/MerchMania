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
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(user, account, profile, email, credentials)
			return true;
		},
		async redirect({ url, baseUrl }) {
			console.log(url, baseUrl)
			return baseUrl;
		},
		async session({ session, user, token }) {
			console.log(session, user, token)
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log(token, user, account, profile)
			return token;
		},
	},
	pages: {
		signIn: '/signin',
	},
});
