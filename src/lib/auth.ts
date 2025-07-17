import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";
import { magicLink } from "better-auth/plugins";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { db } from "./db";
import { polarClient } from "./utils/polar-client";
import MagicLinkEmail from "@/components/email-templates/magic-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async (data, request) => {
        const { data: res, error } = await resend.emails.send({
          from: "Ask Your Finance <no-reply@updates.askyourfinance.site>",
          to: data.email,

          subject: "Your Magic Link",
          react: MagicLinkEmail({ magicLink: data.url }),
        });
      },
    }),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,

      use: [
        checkout({
          successUrl: "/chat",
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
