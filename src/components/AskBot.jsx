import { useEffect, useRef, useState } from 'react'
import { askBot, greeting, suggestions } from '../data/botKnowledge'

/**
 * A small on-page helper that answers common questions from a prepared set.
 *
 * Deliberately not labelled "AI": right now every reply comes from
 * `botKnowledge.js` by keyword match, and calling that an AI chatbot would
 * mislead visitors. When a Gemini key is configured, `askBot()` starts
 * returning model output and the label can change with it.
 */
export default function AskBot() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [thread, setThread] = useState([{ from: 'bot', text: greeting }])

  const inputRef = useRef(null)
  const threadRef = useRef(null)

  // Escape closes it from anywhere, including the input
  useEffect(() => {
    if (!open) return
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Keep the newest message in view
  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [thread, thinking])

  async function ask(question) {
    const text = question.trim()
    if (!text || thinking) return

    setThread((prev) => [...prev, { from: 'you', text }])
    setDraft('')
    setThinking(true)

    const answer = await askBot(text)
    // A beat before the reply, so an instant local lookup does not feel like
    // the message never left
    setTimeout(() => {
      setThread((prev) => [...prev, { from: 'bot', text: answer }])
      setThinking(false)
    }, 420)
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="askbot-panel"
        aria-label={open ? 'Close quick answers' : 'Open quick answers'}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent text-onAccent
                   flex items-center justify-center cursor-pointer
                   transition-transform duration-300 hover:scale-105"
        style={{ boxShadow: '0 12px 32px -10px rgb(51 118 255 / 0.6)' }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 10.5h8M8 14h5M21 12a8.5 8.5 0 01-8.5 8.5H7l-4 3v-4.2A8.5 8.5 0 1121 12z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="askbot-panel"
          role="dialog"
          aria-label="Quick answers"
          className="fixed bottom-24 right-6 z-40 w-[min(22rem,calc(100vw-3rem))]
                     card !rounded-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(30rem, calc(100vh - 8rem))', boxShadow: '0 24px 60px -20px rgb(0 0 0 / 0.35)' }}
        >
          <header className="px-5 py-4 border-b border-line">
            <div className="font-heading font-semibold text-sm text-ink">Quick answers</div>
            <p className="text-faint text-[0.7rem] mt-0.5 leading-relaxed">
              Prepared replies about the work — not a live model yet.
            </p>
          </header>

          <div
            ref={threadRef}
            aria-live="polite"
            className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
          >
            {thread.map((message, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[0.8rem] leading-relaxed ${
                  message.from === 'you'
                    ? 'ml-auto bg-accent text-onAccent'
                    : 'bg-raised text-ink border border-line'
                }`}
              >
                {message.text}
              </div>
            ))}

            {thinking && (
              <div className="bg-raised border border-line rounded-2xl px-3.5 py-3 w-fit flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-faint animate-cursor-float"
                    style={{ animationDelay: `${i * 140}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Suggestions, until the visitor has asked a couple of things */}
          {thread.length < 4 && (
            <div className="px-5 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full border border-line
                             text-[0.7rem] text-muted hover:border-accent hover:text-accentT
                             transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); ask(draft) }}
            className="px-5 py-4 border-t border-line flex gap-2"
          >
            <label htmlFor="askbot-input" className="sr-only">Your question</label>
            <input
              id="askbot-input"
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask something…"
              autoComplete="off"
              className="form-input !py-2 !text-[0.8rem]"
            />
            <button
              type="submit"
              disabled={!draft.trim() || thinking}
              aria-label="Send"
              className="shrink-0 w-9 h-9 rounded-xl bg-accent text-onAccent flex items-center justify-center
                         cursor-pointer transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.926A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.085l-1.414 4.926a.75.75 0 00.826.95 28.897 28.897 0 0015.293-7.155.75.75 0 000-1.113A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
