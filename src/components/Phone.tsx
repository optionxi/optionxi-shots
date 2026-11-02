import type { ReactNode } from "react";

/** Screen content is designed at 390x844 and scaled to the requested width. */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
const FRAME = 12;
export const PHONE_W = SCREEN_W + FRAME * 2; // 414
export const PHONE_H = SCREEN_H + FRAME * 2; // 868

type Props = {
  width: number;
  frame?: "pixel" | "iphone" | "none";
  image?: string;
  lightStatus?: boolean;
  children?: ReactNode;
};

const METAL = {
  pixel: "linear-gradient(135deg,#e7e7ea 0%,#9a9aa2 22%,#4a4a52 50%,#9a9aa2 78%,#d9d9de 100%)",
  iphone: "linear-gradient(135deg,#6b6b73 0%,#2a2a30 30%,#17171b 55%,#3a3a42 80%,#74747c 100%)",
};

export default function Phone({ width, frame = "pixel", image, lightStatus, children }: Props) {
  const s = width / PHONE_W;
  const tone = lightStatus ? "#fff" : "#0B0B10";
  const bare = frame === "none";
  const iphone = frame === "iphone";
  const screenRadius = bare ? 44 : iphone ? 52 : 48;

  return (
    <div style={{ width: PHONE_W * s, height: PHONE_H * s }}>
      <div className="relative" style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${s})`, transformOrigin: "top left" }}>
        {!bare && (
          <>
            <span className="absolute -right-[4px] top-[190px] h-[78px] w-[5px] rounded-r-md bg-gradient-to-b from-zinc-400 to-zinc-600" />
            <span className="absolute -right-[4px] top-[300px] h-[130px] w-[5px] rounded-r-md bg-gradient-to-b from-zinc-400 to-zinc-600" />
            {iphone && <span className="absolute -left-[4px] top-[210px] h-[58px] w-[5px] rounded-l-md bg-gradient-to-b from-zinc-600 to-zinc-800" />}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: iphone ? 66 : 60,
                background: METAL[iphone ? "iphone" : "pixel"],
                boxShadow: "0 60px 90px -20px rgba(0,0,0,.55), 0 30px 40px -20px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.3)",
              }}
            />
            <div className="absolute bg-black" style={{ inset: 3, borderRadius: iphone ? 63 : 57 }} />
          </>
        )}

        <div
          className="absolute overflow-hidden bg-white"
          style={{
            left: FRAME,
            top: FRAME,
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: screenRadius,
            boxShadow: bare ? "0 50px 80px -20px rgba(0,0,0,.5)" : undefined,
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-full w-full object-cover object-top" />
          ) : (
            children
          )}

          {/* status bar (hidden over your own screenshots, they already have one) */}
          {!image && (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[52px] items-center justify-between text-[15px] font-semibold"
              style={{ color: tone, paddingInline: iphone ? 38 : 30 }}
            >
              <span>9:41</span>
              <span className="flex items-center gap-[6px]">
                <svg width="18" height="12" viewBox="0 0 18 12" fill={tone}>
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke={tone} strokeWidth="2" strokeLinecap="round">
                  <path d="M1.5 4.2a10 10 0 0 1 14 0" />
                  <path d="M4.2 7a6 6 0 0 1 8.6 0" />
                  <circle cx="8.5" cy="10" r="1" fill={tone} stroke="none" />
                </svg>
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                  <rect x="0.6" y="0.6" width="22" height="11.8" rx="3.4" stroke={tone} strokeOpacity=".45" />
                  <rect x="2" y="2" width="19" height="9" rx="2.2" fill={tone} />
                  <rect x="24" y="4" width="2" height="5" rx="1" fill={tone} fillOpacity=".5" />
                </svg>
              </span>
            </div>
          )}

          {!bare && !image &&
            (iphone ? (
              <span className="absolute left-1/2 top-[11px] z-30 h-[32px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
            ) : (
              <span className="absolute left-1/2 top-[15px] z-30 h-[18px] w-[18px] -translate-x-1/2 rounded-full bg-black ring-[3px] ring-black/90" />
            ))}

          {!image && !bare && (
            <span className="absolute bottom-[8px] left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full" style={{ background: tone, opacity: 0.85 }} />
          )}

          {!bare && (
            <span
              className="pointer-events-none absolute inset-0 z-40"
              style={{ background: "linear-gradient(115deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,0) 28%)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
