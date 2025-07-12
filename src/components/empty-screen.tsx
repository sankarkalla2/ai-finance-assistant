import { Button } from "@/components/ui/button";
import { getUserPreviewQuestions } from "@/modules/onboarding/server/onboarding-user";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function EmptyScreen({
  submitMessage,
  className,
}: {
  submitMessage: (message: string) => void;
  className?: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-preview-questions"],
    queryFn: () => getUserPreviewQuestions(),
  });

  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-2 flex flex-col items-start space-y-2 mb-4">
          {data?.data &&
            data.data.map((question, index) => (
              <Button
                key={index}
                variant="link"
                className="h-auto p-0 text-sm"
                name={question.question}
                onClick={async () => {
                  submitMessage(question.question);
                }}
              >
                <ArrowRight size={16} className="mr-2 text-muted-foreground" />
                {question.question}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
