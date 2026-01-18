"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the Shit's About to Go Down Meter?",
    answer:
      "The Shit's About to Go Down Meter is inspired by the legendary observation that late-night pizza deliveries to the Pentagon would spike before major military operations. Our modern interpretation uses news sentiment analysis and AI to track global tension levels, creating a data-driven index that reflects current geopolitical stability.",
  },
  {
    question: "How accurate is this index?",
    answer:
      "Our index is based on publicly available news data and AI analysis. While it provides useful trend information, it should be viewed as an analytical tool rather than a definitive measure. We're transparent about our methodology and limitations—this is not predictive intelligence, but rather a reflection of current news sentiment.",
  },
  {
    question: "What news sources do you use?",
    answer:
      "We aggregate from 100+ major international news sources including Reuters, AP News, BBC, CNN, Al Jazeera, The Guardian, and more. Sources are selected for credibility, global coverage, and timely reporting on geopolitical events.",
  },
  {
    question: "How often does it update?",
    answer:
      "The index updates every 6 hours (4 times per day). This frequency balances the need for timely information with meaningful signal-to-noise ratios. Breaking events may cause more rapid changes during the next scheduled update cycle.",
  },
  {
    question: "Can I get historical data?",
    answer:
      "Historical trend data is available through our dashboard (7, 30, or 90-day views). API access for raw historical data is planned for a future release. Subscribe to our newsletter to be notified when this feature launches.",
  },
  {
    question: "Is this affiliated with the Pentagon?",
    answer:
      "No. This is an independent project with no affiliation to the U.S. Department of Defense, Pentagon, or any government agency. The name is a reference to the historical anecdote about pizza delivery patterns, used here for educational and entertainment purposes.",
  },
  {
    question: "What causes the index to spike?",
    answer:
      "Index spikes typically correlate with military exercises, troop deployments, diplomatic crises, economic sanctions, or major geopolitical events. Each contributing event is shown in our timeline with its specific impact on the overall score.",
  },
]

export function FAQSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about the Global Tension Index</p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
