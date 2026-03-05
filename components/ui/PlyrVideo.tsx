"use client";

import { useEffect, useRef } from "react";

export function PlyrVideo({
  src,
  maxHeight,
}: {
  src: string;
  maxHeight?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    let player: { destroy: () => void } | null = null;
    let cancelled = false;

    import("plyr").then(({ default: Plyr }) => {
      if (cancelled || !videoRef.current) return;
      player = new Plyr(videoRef.current, {
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
        resetOnEnd: true,
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-3 hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)]"
      style={
        {
          "--plyr-color-main": "var(--foreground)",
          "--plyr-video-background": "transparent",
          "--plyr-range-fill-background": "var(--foreground)",
          maxHeight: maxHeight ?? "100%",
          maxWidth: "100%",
          flexShrink: 1,
          display: "flex",
          alignItems: "flex-end",
        } as React.CSSProperties
      }
    >
      <video ref={videoRef} src={src} muted playsInline />
    </div>
  );
}
