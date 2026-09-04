import { useState } from 'react'
import { faqs } from '../data/caseStudies'

function FaqItem({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="reveal-item border border-line rounded-2xl bg-card overflow-hidden transition-colors duration-300 hover:border-line2">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
        >
          <span className={`font-heading font-medium text-base transition-colors duration-200 ${isOpen ? 'text-accentT' : 'text-ink'}`}>
            {item.q}
          </span>
          <span
            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isOpen ? 'border-accent/50 bg-accent/10 rotate-45' : 'border-line'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke={isOpen ? '#3376FF' : 'currentColor'} strokeWidth="1.6" className="w-3.5 h-3.5">
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} className={`faq-body ${isOpen ? 'open' : ''}`}>
        <div>
          <p className="px-6 pb-6 text-sm text-muted leading-relaxed max-w-2xl">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-28 px-6 border-t border-line">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-14 text-center">
          <div className="eyebrow-center">Frequently Asked</div>
          <h2 className="h-display text-4xl sm:text-5xl text-ink">
            Answers before we <span className="accent-em">start.</span>
          </h2>
          <p className="text-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Timelines, deliverables, and how the money works — settled up front, so the
            first call is about your product instead of the paperwork.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
