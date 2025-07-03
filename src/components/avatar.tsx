import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl: string;
  fallbackName: string;
}
export function AvatarProvider({ imgUrl, fallbackName }: AvatarProps) {
  return (
    <Avatar className="size-6">
      <AvatarImage src={`${imgUrl}`} alt="img" />
      <AvatarFallback className="text-xs">{fallbackName[0]}</AvatarFallback>
    </Avatar>
  );
}
