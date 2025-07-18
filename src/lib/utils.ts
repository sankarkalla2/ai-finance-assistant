import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateWithTime = (date: Date | string) => {
  const parsedDate = new Date(date);
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (
    parsedDate.getDate() === now.getDate() &&
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear()
  ) {
    return `Today, ${formatTime(parsedDate)}`;
  } else if (
    parsedDate.getDate() === yesterday.getDate() &&
    parsedDate.getMonth() === yesterday.getMonth() &&
    parsedDate.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday, ${formatTime(parsedDate)}`;
  } else {
    return parsedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
};

export function gmailToName(gmail: string): string {
  // Step 1: Get part before "@"
  const username = gmail.split("@")[0];

  // Step 2: Remove numbers
  const noDigits = username.replace(/\d+/g, "");

  // Step 3: Replace dots, underscores, and dashes with spaces
  const cleaned = noDigits.replace(/[._-]+/g, " ");

  // Step 4: Capitalize each word
  const parts = cleaned
    .split(" ")
    .filter((p) => p.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

  return parts.length ? parts.join(" ") : "Random User";
}

export const createAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
};
