/* ====================================================================
   SCREENSHOT SCENES  —  this is the only file you need to edit.

   • Every scene is its own block below (home, mood, chart, ...).
   • Change text / colors / positions right here. The page updates live.
   • Remove something? Delete its line:
        - no subline        → delete `subline`
        - no callout        → delete it from `callouts` (or use [])
        - no phone          → delete it from `phones`
        - no scene at all   → delete it from the SCENES list at the bottom
   • Order of the PNGs = order in the SCENES list at the bottom.

   Your screenshots live in /public/shots. Swap one by changing the
   `image` path. No image? Leave `image` out and a placeholder shows.

   Canvas is 1080 x 1920. x / y are pixels from the top-left corner.
   `cx(width)` gives the x that centers something of that width.
   ==================================================================== */

export const CANVAS = { width: 1080, height: 1920 };
export const cx = (width: number) => Math.round((CANVAS.width - width) / 2);

/** Phone frame used by every phone. "iphone" | "pixel" | "none" (screen only).
 *  A single phone can still override it with its own `frame`. */
export const DEFAULT_FRAME: "pixel" | "iphone" | "none" = "iphone";

/** Name shown inside the built-in placeholder screens (not your real screenshots). */
export const APP_NAME = "YourApp";

/* ---------- types (you don't need to touch these) ---------- */

export type ScreenKey = "placeholder" | "home" | "mood" | "chart" | "alerts" | "plans";

export type PhoneItem = {
  /** your own screenshot, e.g. "/shots/home.png" (files live in /public/shots) */
  image?: string;
  /** a built-in placeholder screen (ignored when `image` is set). Default: "placeholder" */
  screen?: ScreenKey;
  x: number;
  y: number;
  /** phone width in px (height follows) */
  width: number;
  /** degrees, negative = tilt left */
  rotate?: number;
  frame?: "pixel" | "iphone" | "none";
};

export type Callout = {
  /** toast = notification card, bubble = speech bubble, stat = big number */
  kind: "toast" | "bubble" | "stat";
  title: string;
  body?: string;
  x: number;
  y: number;
  rotate?: number;
  /** toast: dot color · bubble: background color */
  color?: string;
};

export type Scene = {
  /** PNG file name (without .png) */
  file: string;
  /** any CSS background: "#6A2BF2" or "linear-gradient(160deg,#111,#334)" */
  background: string;
  textColor: string;
  /** use \n for a line break. Keep to 2 lines, ~16 characters per line */
  headline: string;
  subline?: string;
  textAlign?: "left" | "center";
  /** distance of the text from the top, default 130 */
  textTop?: number;
  phones: PhoneItem[];
  callouts?: Callout[];
};

/* ====================================================================
   1 · PRACTICE TRADING
   ==================================================================== */
const practice: Scene = {
  file: "01-practice-trading",
  background: "#6A2BF2",
  textColor: "#0B0B10",
  headline: "Practice trading,\nrisk-free.",
  subline: "₹3,00,000 virtual cash, daily.",
  phones: [{ image: "/shots/home.png", x: cx(780), y: 660, width: 780 }],
  callouts: [
    { kind: "toast", title: "Order · BUY 10", body: "Practice only", color: "#22A06B", x: 24, y: 1690, rotate: -4 },
  ],
};

/* ====================================================================
   2 · MARKET MOOD  (two phones)
   ==================================================================== */
const mood: Scene = {
  file: "02-market-mood",
  background: "#E2583E",
  textColor: "#120A07",
  headline: "Know the\nmarket mood.",
  subline: "Twelve gauges, one clear read.",
  phones: [
    { image: "/shots/sentiments.png", x: -150, y: 960, width: 640, rotate: -8 }, // back
    { image: "/shots/mood.png", x: 300, y: 700, width: 720 },                    // front
  ],
  callouts: [
    { kind: "stat", title: "71%", body: "confidence", x: 40, y: 1450, rotate: -6 },
  ],
};

/* ====================================================================
   3 · MARKET CHART  (two phones)
   ==================================================================== */
const chart: Scene = {
  file: "03-market-chart",
  background: "#D7F34A",
  textColor: "#0B0B10",
  headline: "See every signal\non the chart.",
  subline: "Prices with signals on top.",
  phones: [
    { image: "/shots/chart-detail.png", x: -150, y: 960, width: 640, rotate: -8 },
    { image: "/shots/chart.png", x: 300, y: 700, width: 720 },
  ],
  callouts: [],
};

/* ====================================================================
   4 · TOOLS
   ==================================================================== */
const tools: Scene = {
  file: "04-tools",
  background: "#0F1B3D",
  textColor: "#FFFFFF",
  headline: "Every tool\nin one place.",
  subline: "Screeners, alerts, backtests.",
  phones: [{ image: "/shots/tools.png", x: cx(780), y: 660, width: 780, rotate: 0 }],
};

/* ====================================================================
   5 · LIVE TRADES
   ==================================================================== */
const live: Scene = {
  file: "05-live-trades",
  background: "linear-gradient(170deg,#13A15B 0%,#0B6B3C 100%)",
  textColor: "#F4FFF8",
  headline: "Track your\ntrades live.",
  subline: "Profit, loss and your exit plan.",
  phones: [{ image: "/shots/live.png", x: 200, y: 700, width: 760, rotate: -6 }],
};

/* ====================================================================
   6 · ALERTS
   ==================================================================== */
const alerts: Scene = {
  file: "06-alerts",
  background: "#F5A524",
  textColor: "#0B0B10",
  headline: "Instant price\nalerts.",
  subline: "Set your own targets, get notified.",
  phones: [{ image: "/shots/alerts.png", x: cx(780), y: 660, width: 780 }],
  callouts: [
    { kind: "toast", title: "Target hit", body: "Crosses today's high", color: "#22A06B", x: 480, y: 1500, rotate: 3 },
  ],
};

/* ====================================================================
   7 · AI STOCK ANALYSIS
   ==================================================================== */
const aiStock: Scene = {
  file: "07-ai-stock",
  background: "#1B1038",
  textColor: "#FFFFFF",
  headline: "AI reads the\nstock for you.",
  subline: "Trend and strength, simply.",
  phones: [{ image: "/shots/ai-stock.png", x: 190, y: 700, width: 760, rotate: 6 }],
};

/* ====================================================================
   8 · STOCK PICKS
   ==================================================================== */
const picks: Scene = {
  file: "08-stock-picks",
  background: "#FF7AB8",
  textColor: "#0B0B10",
  headline: "See how picks\nplayed out.",
  subline: "Daily accuracy, day by day.",
  phones: [{ image: "/shots/picks.png", x: cx(780), y: 660, width: 780 }],
};

/* ---------------------- extras (beyond the first 8) ------------------- */

/* 9 · DEPLOY ALGO */
const deploy: Scene = {
  file: "09-deploy-algo",
  background: "#4F46E5",
  textColor: "#FFFFFF",
  headline: "Deploy once.\nGet alerted.",
  subline: "Your algo runs in the cloud, 24/7.",
  phones: [{ image: "/shots/deploy.png", x: cx(780), y: 660, width: 780 }],
  callouts: [
    { kind: "toast", title: "Algo triggered", body: "Order placed", color: "#F5A524", x: 500, y: 1520, rotate: 3 },
  ],
};

/* 10 · BACKTEST */
const backtest: Scene = {
  file: "10-backtest",
  background: "#0E7C7B",
  textColor: "#FFFFFF",
  headline: "Backtest your\nideas first.",
  subline: "Save algos and see how they did.",
  phones: [{ image: "/shots/backtest.png", x: 200, y: 700, width: 760, rotate: -6 }],
};

/* 11 · SCREENER */
const screener: Scene = {
  file: "11-screener",
  background: "#1F1F24",
  textColor: "#FFFFFF",
  headline: "Find stocks with\nsimple rules.",
  subline: "Quick filters, or write your own.",
  phones: [{ image: "/shots/screener.png", x: cx(780), y: 660, width: 780 }],
};

/* 12 · TRADING REPORT */
const report: Scene = {
  file: "12-trading-report",
  background: "#BFF3D4",
  textColor: "#0B0B10",
  headline: "Your trading\nreport.",
  subline: "Profit calendar and growth.",
  phones: [{ image: "/shots/report.png", x: 190, y: 700, width: 760, rotate: 6 }],
};

/* 13 · ALGO SIGNALS */
const algoSignals: Scene = {
  file: "13-algo-signals",
  background: "#0B3B8C",
  textColor: "#FFFFFF",
  headline: "Algo signals,\nas they fire.",
  subline: "Every signal with time and strike.",
  phones: [{ image: "/shots/algo-signals.png", x: cx(780), y: 660, width: 780 }],
};

/* 14 · STOCK DETAIL + WATCHLIST  (two phones) */
const stock: Scene = {
  file: "14-stock-detail",
  background: "#38BDF8",
  textColor: "#06141F",
  headline: "Understand a\nstock fast.",
  subline: "Price, range and a quick read.",
  phones: [
    { image: "/shots/stock-sheet.png", x: -150, y: 960, width: 640, rotate: -8 },
    { image: "/shots/stock.png", x: 300, y: 700, width: 720 },
  ],
};

/* 15 · WAIT DAYS */
const waitDay: Scene = {
  file: "15-know-when-to-wait",
  background: "#2DD4BF",
  textColor: "#04201C",
  headline: "Know when\nto wait.",
  subline: "Honest reads, even on slow days.",
  phones: [{ image: "/shots/mood-closed.png", x: cx(780), y: 660, width: 780 }],
};

/* 16 · NOTIFICATIONS  (two phones) */
const notifications: Scene = {
  file: "16-notifications",
  background: "#3B82F6",
  textColor: "#FFFFFF",
  headline: "Never miss a\nmarket move.",
  subline: "General and premium alerts.",
  phones: [
    { image: "/shots/notifications-premium.png", x: -150, y: 960, width: 640, rotate: -8 },
    { image: "/shots/notifications.png", x: 300, y: 700, width: 720 },
  ],
};

/* ====================================================================
   WHICH SCENES TO EXPORT, in order. Delete / reorder lines freely.
   Google Play shows up to 8 phone screenshots, so the first 8 are the
   ones to upload. The rest are extras. Add a new scene by copying a block
   above, renaming it, and listing it here.
   ==================================================================== */
export const SCENES: Scene[] = [
  // ---- Play Store picks (first 8) ----
  practice,
  mood,
  chart,
  tools,
  live,
  alerts,
  aiStock,
  picks,
  // ---- extras ----
  deploy,
  backtest,
  screener,
  report,
  algoSignals,
  stock,
  waitDay,
  notifications,
];
