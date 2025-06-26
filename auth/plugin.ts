import { BetterAuthPlugin } from "better-auth"

export const rolePlugin = ()=>{
    return {
        id: "role-plugin",
        schema: {
            user: {
                fields: {
                    role: {
                        type: "string",
                    },
                },
            },
        },
    } satisfies BetterAuthPlugin
}