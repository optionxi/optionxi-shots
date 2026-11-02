import type { ReactNode } from "react";
import { APP_NAME, type ScreenKey } from "@/scenes";

/* Placeholder app screens, each designed at 390x844.
   Replace them with real screenshots via `image` in scenes.ts,
   or edit the markup below to match your own UI. */

const Icon = ({ d, size = 22, stroke = "currentColor", fill = "none", w = 2 }: { d: string; size?: number; stroke?: string; fill?: string; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  home: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  search: "M11 19a8 8 0 1 1 5.3-14M21 21l-4.3-4.3",
  live: "M3 17l6-6 4 4 8-9",
  tools: "M12 3v9h9a9 9 0 1 1-9-9z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  bell: "M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 0 0 4 0",
  cloud: "M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z",
  check: "M5 12l5 5 9-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
  up: "M3 17l6-6 4 4 8-9",
  down: "M3 7l6 6 4-4 8 9",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
};

function TabBar({ active }: { active: "home" | "search" | "live" | "tools" | "user" }) {
  const tabs: { k: typeof active; label: string }[] = [
    { k: "home", label: "Home" },
    { k: "search", label: "Search" },
    { k: "live", label: "Live" },
    { k: "tools", label: "Tools" },
    { k: "user", label: "Profile" },
  ];
  return (
    <div className="absolute inset-x-[14px] bottom-[26px] z-10 flex h-[68px] items-center justify-between rounded-[30px] border border-black/5 bg-white/90 px-[6px] shadow-[0_10px_30px_-10px_rgba(20,20,60,.3)] backdrop-blur">
      {tabs.map((t) => (
        <div
          key={t.k}
          className={`flex h-[54px] w-[66px] flex-col items-center justify-center gap-[3px] rounded-[22px] text-[11px] font-semibold ${
            t.k === active ? "bg-indigo-100 text-indigo-600" : "text-zinc-500"
          }`}
        >
          <Icon d={ICONS[t.k]} size={22} fill={t.k === active ? "currentColor" : "none"} />
          {t.label}
        </div>
      ))}
    </div>
  );
}

const Screen = ({ children, bg = "#F4F5FA" }: { children: ReactNode; bg?: string }) => (
  <div className="relative h-full w-full overflow-hidden pt-[56px] font-sans text-zinc-900" style={{ background: bg }}>
    {children}
  </div>
);

/* ---------- Home ---------- */
function Home() {
  return (
    <Screen bg="#FAFAFD">
      <div className="mx-[16px] rounded-[30px] border border-indigo-100 bg-white p-[22px] shadow-[0_20px_40px_-24px_rgba(60,60,200,.35)]">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-[7px] rounded-full bg-indigo-50 px-[12px] py-[7px] text-[12px] font-semibold text-indigo-600">
            <i className="h-[7px] w-[7px] rounded-full bg-indigo-600" /> Cloud infrastructure live
          </span>
          <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-gradient-to-br from-blue-600 to-violet-700 text-white shadow-lg shadow-indigo-500/40">
            <Icon d={ICONS.cloud} fill="currentColor" stroke="none" />
          </span>
        </div>
        <h2 className="mt-[22px] font-display text-[27px] font-extrabold leading-[1.05] tracking-tight">
          Deploy once.
          <br />
          Get alerted on every trigger.
        </h2>
        <p className="mt-[10px] text-[14px] leading-[1.4] text-zinc-500">
          We run your algorithm in the cloud 24/7 and send a notification the moment it triggers.
        </p>
        <div className="mt-[22px] flex h-[112px] items-center justify-center rounded-[22px] bg-indigo-50/70">
          <div className="h-[56px] w-[92px] rounded-[30px] border-2 border-blue-400 bg-blue-50" />
        </div>
        <div className="mt-[18px] flex items-center justify-between">
          <span className="flex h-[44px] items-center gap-[8px] rounded-full bg-gradient-to-r from-blue-600 to-violet-700 px-[20px] text-[14px] font-bold text-white">
            Deploy now <Icon d={ICONS.arrow} size={16} />
          </span>
          <div className="flex gap-[18px] text-right">
            <div><b className="block font-display text-[19px]">99.9%</b><span className="text-[11px] text-zinc-500">Uptime</span></div>
            <div><b className="block font-display text-[19px]">&lt;10ms</b><span className="text-[11px] text-zinc-500">Latency</span></div>
          </div>
        </div>
      </div>

      <div className="mx-[16px] mt-[16px] rounded-[26px] border border-emerald-300 bg-white p-[18px]">
        <div className="flex items-center gap-[12px]">
          <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-600 text-white"><Icon d={ICONS.flag} size={20} /></span>
          <div>
            <b className="block font-display text-[19px]">Upgrade your plan</b>
            <span className="text-[13px] text-zinc-500">Never miss a move</span>
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </Screen>
  );
}

/* ---------- Market mood ---------- */
function Mood() {
  const R = 46, C = 2 * Math.PI * R;
  return (
    <Screen>
      <div className="flex items-center gap-[12px] px-[16px]">
        <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[16px] border border-zinc-200 bg-white text-lg">‹</span>
        <div className="flex-1">
          <b className="block font-display text-[24px] leading-none">Market mood</b>
          <span className="text-[12px] text-zinc-500"><i className="mr-[6px] inline-block h-[7px] w-[7px] rounded-full bg-emerald-400" />Live, updates by itself</span>
        </div>
        <span className="flex h-[40px] items-center gap-[6px] rounded-[16px] bg-indigo-500 px-[14px] text-[13px] font-bold text-white"><Icon d={ICONS.live} size={16} stroke="#fff" />Chart</span>
      </div>

      <div className="mx-[16px] mt-[16px] rounded-[28px] bg-gradient-to-br from-blue-500 to-indigo-500 p-[20px] text-white shadow-[0_24px_40px_-20px_rgba(59,100,240,.7)]">
        <span className="text-[12px] text-white/70">Latest read, 2 days ago</span>
        <div className="mt-[6px] flex items-center justify-between">
          <div className="max-w-[190px]">
            <h3 className="font-display text-[26px] font-extrabold leading-[1.05]">↗ Likely going up</h3>
            <p className="mt-[8px] text-[13px] leading-[1.35] text-white/85">Buyers are in control. 11 of 12 market gauges say up.</p>
          </div>
          <div className="relative flex h-[116px] w-[116px] items-center justify-center">
            <svg viewBox="0 0 116 116" className="absolute inset-0 -rotate-90">
              <circle cx="58" cy="58" r={R} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="7" />
              <circle cx="58" cy="58" r={R} fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * 0.29} />
            </svg>
            <b className="font-display text-[28px]">71%</b>
          </div>
        </div>
        <div className="mt-[16px] flex items-center gap-[16px]">
          <span className="rounded-full bg-white px-[16px] py-[11px] text-[13px] font-bold text-blue-600">See it on the chart</span>
          <span className="text-[13px] font-semibold">Tell me more?</span>
        </div>
      </div>

      <div className="mx-[16px] mt-[14px] flex rounded-[22px] border border-zinc-200 bg-white p-[5px] text-[13px] font-bold">
        <span className="flex-1 rounded-[17px] bg-indigo-500 py-[11px] text-center text-white">All</span>
        <span className="flex-1 py-[11px] text-center text-zinc-500">Going up</span>
        <span className="flex-1 py-[11px] text-center text-zinc-500">Going down</span>
      </div>

      <div className="mx-[16px] mt-[12px] flex gap-[8px] text-[12px] font-semibold">
        <span className="rounded-full border border-zinc-200 bg-white px-[14px] py-[9px]">Any date</span>
        <span className="rounded-full border border-indigo-300 bg-indigo-100 px-[14px] py-[9px] text-indigo-600">High confidence</span>
        <span className="rounded-full border border-zinc-200 bg-white px-[14px] py-[9px]">Fresh moves</span>
      </div>

      <div className="mx-[16px] mt-[14px] rounded-[26px] border border-zinc-200 bg-white p-[18px]">
        <div className="flex justify-between">
          <div>
            <b className="font-display text-[18px]">Likely going up</b>
            <div className="text-[12px] text-zinc-500">12:21 PM, 2 days ago</div>
          </div>
          <div className="text-right"><b className="font-display text-[24px] text-emerald-500">71%</b></div>
        </div>
        <p className="mt-[10px] text-[14px]">11 of 12 market gauges say up.</p>
        <div className="mt-[10px] flex gap-[12px] text-[12px] font-semibold">
          <span className="text-blue-600">● 11 say up</span><span className="text-emerald-500">● 0 unsure</span><span className="text-rose-500">● 1 say down</span>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Chart ---------- */
function Chart() {
  const pts = [10, 14, 11, 18, 16, 24, 21, 30, 27, 36, 33, 44, 40, 52, 58];
  const w = 358, h = 260;
  const max = 64;
  const line = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" ");
  return (
    <Screen bg="#0E1220">
      <div className="px-[20px] text-white">
        <div className="flex items-center justify-between">
          <div>
            <b className="block font-display text-[26px]">{APP_NAME} Index</b>
            <span className="text-[12px] text-white/50">Live · 1h</span>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-[12px] py-[7px] text-[13px] font-bold text-emerald-300">+2.41%</span>
        </div>
        <div className="mt-[14px] font-display text-[44px] font-extrabold tracking-tight">24,318.40</div>

        <div className="mt-[20px] rounded-[26px] bg-white/5 p-[16px]">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#34D399" stopOpacity=".45" />
                <stop offset="1" stopColor="#34D399" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,.08)" />
            ))}
            <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#g)" />
            <polyline points={line} fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={w} cy={h - (58 / max) * h} r="6" fill="#34D399" />
          </svg>
          <div className="mt-[12px] flex justify-between text-[12px] font-semibold text-white/50">
            {["1H", "1D", "1W", "1M", "1Y"].map((t, i) => (
              <span key={t} className={i === 0 ? "rounded-full bg-white/15 px-[12px] py-[5px] text-white" : "px-[12px] py-[5px]"}>{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-[16px] space-y-[10px]">
          {[["Signal", "Fresh move: up"], ["Trend", "Short-term up"], ["Trend", "Long-term up"]].map(([a, b]) => (
            <div key={b} className="flex items-center justify-between rounded-[20px] bg-white/5 px-[16px] py-[14px] text-[14px]">
              <span className="text-white/60">{a}</span><b>{b}</b>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="live" />
    </Screen>
  );
}

/* ---------- Alerts ---------- */
function Alerts() {
  const items = [
    { t: "Algo triggered", b: "Order placed", time: "now", c: "bg-amber-100 text-amber-600" },
    { t: "Market mood changed", b: "Likely going up, 71%", time: "2m", c: "bg-blue-100 text-blue-600" },
    { t: "Fresh move detected", b: "Broke above recent high", time: "14m", c: "bg-emerald-100 text-emerald-600" },
    { t: "Daily summary", b: "3 signals, 2 orders", time: "1h", c: "bg-violet-100 text-violet-600" },
    { t: "Strategy paused", b: "Resume anytime", time: "3h", c: "bg-rose-100 text-rose-600" },
  ];
  return (
    <Screen>
      <div className="px-[20px]">
        <b className="font-display text-[28px]">Alerts</b>
        <div className="mt-[16px] space-y-[12px]">
          {items.map((i) => (
            <div key={i.t} className="flex items-center gap-[14px] rounded-[24px] border border-zinc-200 bg-white p-[16px]">
              <span className={`flex h-[46px] w-[46px] items-center justify-center rounded-full ${i.c}`}><Icon d={ICONS.bell} size={20} /></span>
              <div className="flex-1">
                <b className="block text-[15px]">{i.t}</b>
                <span className="text-[13px] text-zinc-500">{i.b}</span>
              </div>
              <span className="text-[12px] text-zinc-400">{i.time}</span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="live" />
    </Screen>
  );
}

/* ---------- Plans ---------- */
function Plans() {
  return (
    <Screen bg="#FAFAFD">
      <div className="px-[20px]">
        <div className="flex items-center gap-[12px]">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-emerald-600 text-white"><Icon d={ICONS.flag} size={22} /></span>
          <div>
            <b className="block font-display text-[26px] leading-none">Upgrade your plan</b>
            <span className="text-[14px] text-zinc-500">Never miss a move</span>
          </div>
        </div>
        <div className="mt-[26px] flex gap-[12px]">
          <div className="relative flex-1 rounded-[24px] border-2 border-emerald-600 bg-emerald-50 p-[16px]">
            <span className="absolute -top-[12px] left-[28px] rounded-full bg-emerald-600 px-[12px] py-[4px] text-[11px] font-extrabold tracking-wide text-white">BEST VALUE</span>
            <div className="flex items-center justify-between"><b className="text-[17px]">Pro</b><span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-600 text-white"><Icon d={ICONS.check} size={13} w={3} /></span></div>
            <div className="mt-[10px] font-display text-[30px] font-extrabold">₹800<span className="text-[13px] font-medium text-zinc-500"> /mo</span></div>
          </div>
          <div className="flex-1 rounded-[24px] border border-zinc-200 bg-zinc-50 p-[16px]">
            <div className="flex items-center justify-between"><b className="text-[17px]">Max</b><span className="h-[22px] w-[22px] rounded-full border-2 border-zinc-300" /></div>
            <div className="mt-[10px] font-display text-[30px] font-extrabold">₹1500<span className="text-[13px] font-medium text-zinc-500"> /mo</span></div>
          </div>
        </div>
        <div className="mt-[24px] space-y-[12px]">
          {["Realtime notifications for all features", "Unlimited strategy deployments", "Priority cloud execution", "Advanced market mood filters"].map((f) => (
            <div key={f} className="flex items-center gap-[12px] text-[15px] font-semibold">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Icon d={ICONS.check} size={16} w={3} /></span>
              {f}
            </div>
          ))}
        </div>
        <div className="mt-[28px] flex h-[56px] items-center justify-center rounded-full bg-emerald-600 text-[16px] font-bold text-white">Continue with Pro</div>
      </div>
    </Screen>
  );
}

/* ---------- Placeholder (shown until you set `image`) ---------- */
function Placeholder() {
  return (
    <Screen bg="#EEF0F6">
      <div className="absolute inset-[18px] top-[64px] bottom-[34px] flex flex-col items-center justify-center gap-[16px] rounded-[34px] border-[3px] border-dashed border-zinc-300 text-zinc-400">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M21 16l-5-5-8 8" />
        </svg>
        <b className="font-display text-[22px] text-zinc-500">Your screenshot here</b>
        <span className="px-[40px] text-center text-[14px] leading-[1.4]">
          Set <code className="rounded bg-zinc-200 px-1">image: &quot;/shots/name.png&quot;</code> in src/scenes.ts
        </span>
      </div>
    </Screen>
  );
}

export const SCREENS: Record<ScreenKey, () =>  React.JSX.Element> = {
  placeholder: Placeholder,
  home: Home,
  mood: Mood,
  chart: Chart,
  alerts: Alerts,
  plans: Plans,
};

/** screens that need white status-bar icons */
export const DARK_SCREENS: ScreenKey[] = ["chart"];
