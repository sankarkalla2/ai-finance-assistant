import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Frown, Meh, MessageSquare, MessagesSquare, Smile } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ModalProvider from "@/components/modal-provider";
import { submitFeedback } from "../server/feedback";

const UserFeedback = () => {
  const [reaction, setReaction] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  type FormEvent = React.FormEvent<HTMLFormElement>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitFeedback(feedback, reaction);
      toast.info(res?.message || "Feedback submitted");
    });
  };
  return (
    <ModalProvider
      trigger={
        <SidebarMenuButton tooltip="Feedback">
          <MessagesSquare />
          Feedback
        </SidebarMenuButton>
      }
      title="Submit Your Feedback"
      description="We're always looking for ways to improve our product. Please let us know what you think."
    >
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Give us your feedback"
          required
          onChange={(e) => setFeedback(e.currentTarget.value)}
        />
        <div className="flex gap-2 mt-3">
          <ToggleGroup
            type="single"
            onValueChange={(value) => setReaction(Number(value))}
            defaultValue={reaction.toString()}
          >
            <ToggleGroupItem value="1">
              <Smile className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="2">
              <Meh className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="3">
              <Frown className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-4 w-full flex">
          <Button className="w-full" type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </ModalProvider>
  );
};

export default UserFeedback;
