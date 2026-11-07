# AliLLM proxy

The chat used to call Mistral from the browser with the API key compiled into the public JS bundle.
This Worker keeps the key server-side and enforces origin, size, model, token and per-IP rate limits.

## Set up (once)

1. **Revoke the old Mistral key** in the Mistral console and create a new one. Every bundle deployed
   before this change contains the old key in clear text, so it must be considered leaked.
   Set a monthly spend limit on the workspace while you are there.
2. Deploy the Worker:
   ```sh
   cd worker
   npx wrangler login
   npx wrangler secret put MISTRAL_API_KEY   # paste the NEW key
   npx wrangler deploy                       # prints https://alillm-proxy.<you>.workers.dev
   ```
3. In GitHub → Settings → Secrets and variables → Actions:
   - add a **variable** `CHAT_ENDPOINT` = `https://alillm-proxy.<you>.workers.dev/chat`
   - delete the old **secret** `VITE_MISTRAL_API_KEY`
4. Push to `main`. The site build reads `VITE_CHAT_ENDPOINT` (a public URL, not a secret).

For local dev, put `VITE_CHAT_ENDPOINT=https://alillm-proxy.<you>.workers.dev/chat` in `.env.local`.
Until the endpoint is set, AliLLM shows an "offline" message instead of calling anything.
