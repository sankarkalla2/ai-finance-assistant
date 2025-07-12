"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { polarClient } from "@/lib/utils/polar-client";
import { polar } from "@polar-sh/better-auth";
import { headers } from "next/headers";

export const getAllSubscriptions = async () => {
  const products = await polarClient.products.list({
    isArchived: false,
    isRecurring: true,
    sorting: ['price_amount']
  });

  console.log(products)

  return products.result.items;
};


export const getUserCurrentActiveSubscription = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user) return null;
    

    const customer = await polarClient.customers.getStateExternal({
        externalId: session?.user.id
    })

    const product = customer.activeSubscriptions[0];
    return product ?? null;
    
}
