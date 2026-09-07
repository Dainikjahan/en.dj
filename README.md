# Dainik Jahan English

Standalone English edition of Dainik Jahan.

## Publication boundary

This repository is intentionally independent from the Bengali Dainik Jahan application. It has its own frontend, editorial content namespace, deployment configuration, and Firebase environment variables.

- Language: English only
- Framework: Next.js 15 App Router
- Runtime: React 19
- Data: Firebase Firestore
- Production Firebase project: supplied through environment variables, never hard-coded

The English edition must never read from or publish into the Bengali edition's content collection.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Firebase web configuration for the English publication.
