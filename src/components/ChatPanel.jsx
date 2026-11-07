import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { MiniLantern, TeaPour } from './Pixel';

// Public URL of the AliLLM proxy (see worker/). The Mistral key lives only there, never in this bundle.
const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT;
const MAX_HISTORY = 12;
const MAX_INPUT_LENGTH = 400;
const RATE_LIMIT_MS = 3000;

const GREETING = "**Salam!** I'm AliLLM. Ask me anything about Ali's work, research or background. Je parle aussi français.";
const SUGGESTIONS = [
  'What does Ali do at Sopra Steria Next?',
  'Tell me about the RBFA computer-vision work',
  "What's his strongest technical area?",
  'Where did Ali study?',
];

/* ── word-streamed markdown-lite (bold, bullets, paragraphs) ── */
function Inline({ text, counter, animate }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return parts.map((part, i) => {
    const bold = /^\*\*[^*]+\*\*$/.test(part);
    const raw = bold ? part.slice(2, -2) : part;
    const words = raw.split(/(\s+)/);
    const nodes = words.map((w, j) => {
      if (!w) return null;
      if (/^\s+$/.test(w) || !animate) return <Fragment key={j}>{w}</Fragment>;
      const delay = Math.min(counter.n++ * 18, 1800);
      return <span key={j} className="stream-word" style={{ animationDelay: `${delay}ms` }}>{w}</span>;
    });
    return bold ? <strong key={i}>{nodes}</strong> : <Fragment key={i}>{nodes}</Fragment>;
  });
}

function AiMessage({ content, animate }) {
  const counter = { n: 0 };
  const blocks = content.split(/\n{2,}/);
  return (
    <div className="msg-ai">
      {blocks.map((block, bi) => {
        const lines = block.split('\n').filter((l) => l.trim());
        const isList = lines.length && lines.every((l) => /^\s*([-•*]|\d+[.)])\s/.test(l));
        if (isList) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}><Inline text={l.replace(/^\s*([-•*]|\d+[.)])\s/, '')} counter={counter} animate={animate} /></li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                <Inline text={l.replace(/^#{1,3}\s+/, '')} counter={counter} animate={animate} />
                {li < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatPanel({ open, onClose, pending, onPendingHandled }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING, id: 0 }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const lastSent = useRef(0);
  const nextId = useRef(1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const send = useCallback(async (raw) => {
    const text = raw.trim().slice(0, MAX_INPUT_LENGTH);
    if (!text || loading) return;
    const now = Date.now();
    if (now - lastSent.current < RATE_LIMIT_MS) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), RATE_LIMIT_MS - (now - lastSent.current));
      return;
    }
    lastSent.current = now;

    const history = [...messages, { role: 'user', content: text, id: nextId.current++ }];
    setMessages(history);
    setInput('');
    setLoading(true);

    let reply;
    try {
      if (!CHAT_ENDPOINT) throw new Error('offline');
      // the proxy fixes model, budget and system prompt; we only send the turns (no greeting, newest first-user window)
      let turns = history.filter((m) => m.id !== 0).slice(-MAX_HISTORY).map((m) => ({ role: m.role, content: m.content }));
      while (turns.length && turns[0].role !== 'user') turns = turns.slice(1);
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: turns }),
      });
      if (res.status === 429) {
        reply = 'Easy on the tea, give me a few seconds and ask again.';
      } else {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        reply = typeof data.reply === 'string' ? data.reply : 'Sorry, something went wrong.';
      }
    } catch {
      reply = CHAT_ENDPOINT
        ? "Couldn't reach the model just now. Try again in a moment, or email aliamr3210@gmail.com."
        : 'AliLLM is offline for maintenance. Email aliamr3210@gmail.com and Ali will answer himself.';
    } finally {
      setLoading(false);
    }
    setMessages((prev) => [...prev, { role: 'assistant', content: reply, id: nextId.current++ }]);
  }, [messages, loading]);

  // questions coming from the "select text → Ask AliLLM" button
  useEffect(() => {
    if (pending && open) {
      send(`Tell me more about this: “${pending}”`);
      onPendingHandled();
    }
  }, [pending, open, send, onPendingHandled]);

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
    if (e.key === 'Escape') onClose();
  };

  const autoGrow = (el) => { el.style.height = 'auto'; el.style.height = `${Math.min(el.scrollHeight, 140)}px`; };

  return (
    <aside className="chat-dock" data-open={open} aria-hidden={!open} aria-label="AliLLM chat">
      <div className="chat-inner">
        <div className="chat-head">
          <div>
            <div className="title"><MiniLantern className="star" />AliLLM</div>
            <div className="sub">Answers from Ali's profile · powered by Mistral</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l10 10M12 2L2 12" /></svg>
          </button>
        </div>

        <div className="chat-msgs" ref={scrollRef} aria-live="polite">
          {messages.map((m) => {
            if (m.role === 'user') return <div key={m.id} className="msg-user">{m.content}</div>;
            return <AiMessage key={m.id} content={m.content} animate />;
          })}
          {messages.length === 1 && !loading && (
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="suggestion" onClick={() => send(s)} tabIndex={open ? 0 : -1}>{s}</button>
              ))}
            </div>
          )}
          {loading && (
            <div className="tea-loader" role="status">
              <TeaPour scale={2} />
              <span>Pouring tea…</span>
            </div>
          )}
        </div>

        <div className="chat-input">
          <div className="chat-box">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              placeholder="Ask about Ali…"
              onChange={(e) => { setInput(e.target.value); autoGrow(e.target); }}
              onKeyDown={onKey}
              disabled={loading}
              tabIndex={open ? 0 : -1}
            />
            <button
              className="send-btn"
              onClick={() => send(input)}
              disabled={!input.trim() || loading || cooldown}
              aria-label="Send"
              tabIndex={open ? 0 : -1}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 12V2M2.5 6.5L7 2l4.5 4.5" /></svg>
            </button>
          </div>
          <div className="chat-foot">
            <span>{cooldown ? 'One moment…' : 'Enter to send'}</span>
            <span>{input.length}/{MAX_INPUT_LENGTH}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
