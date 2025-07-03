"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

export const CurrentUserAvatar = () => {
  const profileImage = "";
  const name = "Gowrisankar";
  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <Avatar className="size-6">
      {profileImage && <AvatarImage src={profileImage} alt={initials} />}
      <AvatarFallback>
        {initials === "?" ? (
          <User2 size={16} className="text-muted-foreground" />
        ) : (
          initials
        )}
      </AvatarFallback>
    </Avatar>
  );
};


        