import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "How does the AI understand my financial situation?",
    answer:
      "Our AI analyzes your financial data using advanced machine learning algorithms to understand your spending patterns, income, and financial goals. It provides personalized insights based on your unique situation.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we use bank-level encryption and security protocols to protect your data. Your information is encrypted both in transit and at rest, and we never share your personal financial information with third parties and you can delete you account data whenever you want.",
  },
  {
    question: "What types of questions can I ask?",
    answer:
      "You can ask about budgeting, saving strategies, investment options, affordability of purchases, debt management, retirement planning, and any other financial questions you have.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You'll continue to have access to pro features until the end of your billing cycle.",
  },
];

const FAQ = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      id={"faq"}
    >
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-1.5 text-lg text-muted-foreground">
          Quick answers to common questions about our products and services.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4"
          defaultValue="question-0"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
