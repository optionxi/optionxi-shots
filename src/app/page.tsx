"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import Scene from "@/components/Scene";
import { CANVAS, SCENES } from "@/scenes";

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function Page() {
  const [scale, setScale] = useState(0.3);
  const [busy, setBusy] = useState<string | null>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  // previews always fit the window height; scroll sideways for more scenes
  useEffect(() => {
    const fit = () => setScale(Math.max(0.2, Math.min(0.5, (window.innerHeight - 230) / CANVAS.height)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  async function render(i: number): Promise<string> {
    const node = nodes.current[i];
    if (!node) throw new Error("scene not mounted");
    const opts = { width: CANVAS.width, height: CANVAS.height, pixelRatio: 1, cacheBust: true, style: { transform: "none" } };
    await toPng(node, opts); // warm-up pass so fonts and images get embedded
    return toPng(node, opts);
  }

  async function downloadOne(i: number) {
    setBusy(String(i));
    try {
      const blob = await (await fetch(await render(i))).blob();
      saveBlob(blob, `${SCENES[i].file}.png`);
    } finally {
      setBusy(null);
    }
  }

  async function downloadAll() {
    setBusy("all");
    try {
      const zip = new JSZip();
      for (let i = 0; i < SCENES.length; i++) {
        const data = (await render(i)).split(",")[1];
        zip.file(`${SCENES[i].file}.png`, data, { base64: true });
      }
      saveBlob(await zip.generateAsync({ type: "blob" }), "store-screenshots.zip");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0C0F] text-zinc-100">
      <header className="sticky top-0 z-50 flex items-center justify-between gap-6 border-b border-white/10 bg-[#0C0C0F]/85 px-8 py-4 backdrop-blur">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-2xl font-extrabold tracking-tight">Shots</span>
          <span className="hidden text-sm text-zinc-500 md:block">
            {SCENES.length} scenes · edit <code className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300">src/scenes.ts</code>, the page updates live · Google Play shows up to 8
          </span>
        </div>
        <button
          onClick={downloadAll}
          disabled={busy !== null}
          className="rounded-full bg-[#D7F34A] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-95 disabled:opacity-50"
        >
          {busy === "all" ? "Exporting…" : `Download all (${SCENES.length}) .zip`}
        </button>
      </header>

      <main className="flex gap-10 overflow-x-auto px-10 py-10">
        {SCENES.map((s, i) => (
          <section key={s.file} className="shrink-0">
            <div
              className="overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] ring-1 ring-white/10"
              style={{ width: CANVAS.width * scale, height: CANVAS.height * scale }}
            >
              <div
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                style={{ width: CANVAS.width, height: CANVAS.height, transform: `scale(${scale})`, transformOrigin: "top left" }}
              >
                <Scene scene={s} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                <span className={`mr-2 ${i < 8 ? "text-[#D7F34A]" : "text-zinc-600"}`}>{String(i + 1).padStart(2, "0")}</span>
                {s.file}.png
              </span>
              <button
                onClick={() => downloadOne(i)}
                disabled={busy !== null}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-40"
              >
                {busy === String(i) ? "Exporting…" : "Download"}
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
