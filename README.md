# ScamShield

ScamShield is a React/Next.js hackathon MVP for scam detection in Vietnam.

The current MVP ships one real workflow end-to-end:

- paste a suspicious URL
- paste seller page text
- paste listing text
- paste payment page or payment instruction text

ScamShield runs a single live agent, **LinkGuardian**, and returns:

- extracted scam signals
- risk score
- risk level (`low`, `medium`, `high`)
- reasons for the score
- recommended action
- short report
- saved local case history

The rest of the platform is scaffolded so the product already reads like a multi-agent system, but only **LinkGuardian** is implemented today.

## Why This MVP Exists

This repo is optimized for one mentor/demo question:

1. does it actually work
2. can it make money

The wedge product is a **"check before you pay"** workflow:

- simple to demo live
- easy to understand immediately
- realistic path to monetization as a consumer checker, trust API, extension, or marketplace tool

## Current Product Shape

### Live now

- `LinkGuardian`: suspicious link / payment / seller / listing analyzer
- OpenAI-backed structured analysis
- deterministic risk scoring layer
- local saved case history
- platform roadmap page for future agents

### Scaffolded, not implemented yet

- `VoiceShield`
- `ShopScan`
- `FraudRadar`
- `ReportSynth`

## Tech Stack

- Next.js App Router
- React
- TypeScript
- OpenAI API
- Zod
- localStorage for MVP case history

## Project Structure

```txt
src/
  app/
    api/analyze/route.ts
    agents/page.tsx
    history/page.tsx
    page.tsx
  agents/
    core/
    fraud-radar/
    link-guardian/
    report-synth/
    shop-scan/
    voice-shield/
  features/
    analysis/
      components/
      hooks/
      schemas/
      services/
      types/
  shared/
    ui/
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your env file

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

You can also copy values from [.env.example](./.env.example).

### 3. Start the dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## How The MVP Works

1. User submits a suspicious URL or pasted text.
2. The app sends the request to `POST /api/analyze`.
3. The active analyzer (`LinkGuardian`) calls OpenAI.
4. The model returns structured JSON with scam signals and reasoning.
5. ScamShield applies a deterministic scoring layer in code.
6. The result is rendered and can be saved to local history.

## Environment Variables

### Required

- `OPENAI_API_KEY`: OpenAI API key used by the analysis route

### Optional

- `OPENAI_MODEL`: defaults to `gpt-4.1-mini`

## Deploying To Vercel

The easiest deploy path is:

1. create an empty GitHub repository
2. commit and push this project
3. import the repo into Vercel
4. add environment variables in Vercel
5. deploy

### Suggested Git flow

```bash
git init
git add .
git commit -m "Initial ScamShield MVP"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Vercel setup

Add these environment variables in Vercel:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Then trigger the first deployment.

## GitHub Repo Setup

If you have not created the repo yet:

1. Create an empty repository on GitHub.
2. Copy the repository URL.
3. Run:

```bash
git init
git add .
git commit -m "Initial ScamShield MVP"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

Once the code is on GitHub, import that repository into Vercel.

## Demo Notes

For the strongest demo:

- use one of the seeded suspicious examples on the home page
- show the result card and the extracted scam signals
- save the result to history
- open the `Agents` page to explain the platform roadmap

Short pitch:

> ScamShield helps users in Vietnam check suspicious links and payment flows before they send money. Today we ship one real workflow end-to-end, and the rest of the platform is already scaffolded for expansion.

## Important Limitation

ScamShield currently flags **risk signals**, not legal proof of fraud.

This is an MVP:

- no live domain reputation lookup
- no QR scanning
- no audio analysis
- no remote database
- no auth or billing yet

## Next Logical Improvements

- add a visible disclaimer in the results UI
- add fallback demo mode when no OpenAI key is configured
- add Supabase/Postgres for persistent case history
- add external trust signals for URLs and payment flows
- add browser extension or mobile assistant UX

## License

No license has been added yet. If you want this repo to be public, add one before publishing.
