import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { customSessionClient } from 'better-auth/client/plugins';
import type { auth } from '@/auth/auth';

export const { signIn, signUp, useSession, signOut } = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: 'string',
					required: true,
				},
				isOnboarded: {
					type: 'boolean',
					required: true,
				},
			},
		}),
		customSessionClient<typeof auth>(),
	],
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: true,
			},
			isOnboarded: {
				type: 'boolean',
				required: true,
			},
		},
	},
});
