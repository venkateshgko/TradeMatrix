# TradeMatrix Frontend

React + TypeScript + Vite + Tailwind CSS + Zustand + TanStack Query + Lightweight Charts.

## Requirements

- Node.js 20+ recommended
- npm

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually:

http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Architecture

- `src/components` - reusable UI
- `src/pages` - route-level screens
- `src/layouts` - application layouts
- `src/store` - Zustand application state
- `src/hooks` - TanStack Query hooks
- `src/api` - API functions
- `src/types` - TypeScript models
- `src/data` - temporary mock data
- `src/components/charts` - Lightweight Charts integration

## Next backend step

Replace `src/api/marketApi.ts` with calls to your Java Spring Boot REST API and add a WebSocket client for live prices/order updates.

Do not use the mock prices for real trading or financial decisions.
