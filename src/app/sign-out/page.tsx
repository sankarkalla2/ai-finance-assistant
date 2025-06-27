"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Signout = () => {
  return (
    <Button onClick={async () => await authClient.signOut()}>Signout</Button>
  );
};

export default Signout;
