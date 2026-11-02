import Phone from "./Phone";
import { DARK_SCREENS, SCREENS } from "./screens";
import { CANVAS, DEFAULT_FRAME, type Callout, type PhoneItem, type Scene as SceneT } from "@/scenes";

type PickHandler = (phoneIndex: number, file: File) => void;

function PhoneView({
  p,
  override,
  onPick,
}: {
  p: PhoneItem;
  override?: string;
  onPick?: (file: File) => void;
}) {
  const key = p.screen ?? "placeholder";
  const Body = SCREENS[key];
  const width = p.width;
  const height = (width / 414) * 868; // PHONE_W x PHONE_H ratio

  return (
    <div className="absolute" style={{ left: p.x, top: p.y, transform: `rotate(${p.rotate ?? 0}deg)` }}>
      <div className="relative" style={{ width, height }}>
        <Phone width={width} frame={p.frame ?? DEFAULT_FRAME} image={override ?? p.image} lightStatus={DARK_SCREENS.includes(key)}>
          <Body />
        </Phone>

        {/* click-to-upload overlay (stripped from the exported PNG) */}
        {onPick && (
          <label
            data-no-export
            className="group absolute inset-0 z-50 flex cursor-pointer items-center justify-center rounded-[60px] transition hover:bg-black/45"
          >
            <span className="rounded-full bg-white px-[36px] py-[20px] text-[40px] font-bold text-black opacity-0 transition group-hover:opacity-100">
              Click to replace
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onPick(f);
                e.target.value = ""; // allow re-picking the same file
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}

const CARD_SHADOW = "shadow-[0_40px_70px_-20px_rgba(0,0,0,.45)]";

function CalloutView({ c }: { c: Callout }) {
  const pos = { left: c.x, top: c.y, transform: `rotate(${c.rotate ?? 0}deg)` };

  if (c.kind === "toast") {
    return (
      <div className={`absolute z-20 flex w-[560px] items-center gap-[26px] rounded-[44px] bg-white p-[30px] ${CARD_SHADOW}`} style={pos}>
        <span className="h-[84px] w-[84px] shrink-0 rounded-full" style={{ background: c.color ?? "#F5A524" }} />
        <div className="text-[#0B0B10]">
          <b className="block font-display text-[40px] leading-tight">{c.title}</b>
          {c.body && <span className="text-[30px] text-zinc-500">{c.body}</span>}
        </div>
      </div>
    );
  }

  if (c.kind === "stat") {
    return (
      <div className={`absolute z-20 rounded-[44px] bg-white px-[44px] py-[30px] ${CARD_SHADOW}`} style={pos}>
        <b className="block font-display text-[100px] font-extrabold leading-none text-[#0B0B10]">{c.title}</b>
        {c.body && <span className="text-[32px] font-semibold text-zinc-500">{c.body}</span>}
      </div>
    );
  }

  const bg = c.color ?? "#FFFFFF";
  const light = ["#fff", "#ffffff"].includes(bg.toLowerCase());
  return (
    <div
      className={`absolute z-20 w-[520px] rounded-[48px] rounded-br-[10px] px-[40px] py-[34px] ${CARD_SHADOW}`}
      style={{ ...pos, background: bg, color: light ? "#0B0B10" : "#fff" }}
    >
      <b className="block font-display text-[42px] leading-[1.08]">{c.title}</b>
      {c.body && <span className="mt-[8px] block text-[30px] opacity-70">{c.body}</span>}
    </div>
  );
}

export default function Scene({
  scene,
  images,
  onPick,
}: {
  scene: SceneT;
  /** uploaded overrides, keyed by phone index */
  images?: Record<number, string>;
  onPick?: PickHandler;
}) {
  const center = scene.textAlign === "center";
  return (
    <div className="relative overflow-hidden" style={{ width: CANVAS.width, height: CANVAS.height, background: scene.background, color: scene.textColor }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 60% at 50% 100%, rgba(255,255,255,.16), transparent 60%)" }} />

      <div className={`absolute left-[88px] right-[88px] z-10 ${center ? "text-center" : ""}`} style={{ top: scene.textTop ?? 130 }}>
        <h1 className="whitespace-pre-line font-display text-[104px] font-extrabold leading-[0.96] tracking-[-0.035em]">{scene.headline}</h1>
        {scene.subline && (
          <p className={`mt-[34px] max-w-[780px] font-sans text-[46px] font-medium leading-[1.2] opacity-80 ${center ? "mx-auto" : ""}`}>{scene.subline}</p>
        )}
      </div>

      {scene.phones.map((p, i) => (
        <PhoneView key={i} p={p} override={images?.[i]} onPick={onPick ? (f) => onPick(i, f) : undefined} />
      ))}
      {scene.callouts?.map((c, i) => (
        <CalloutView key={i} c={c} />
      ))}
    </div>
  );
}