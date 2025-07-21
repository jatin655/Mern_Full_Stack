"use client";
import { useEffect, useRef } from "react";

export default function SplineRobot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current && !ref.current.querySelector("spline-viewer")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js";
      script.onload = () => {
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", "https://prod.spline.design/h9a-3GOvdwztbPTi/scene.splinecode");
        viewer.style.width = "100%";
        viewer.style.height = "100%";
        ref.current!.appendChild(viewer);

        // Hide the badge after the viewer loads
        setTimeout(() => {
          const shadow = viewer.shadowRoot;
          if (shadow) {
            const badge = shadow.querySelector('[part="branding"]');
            if (badge) badge.setAttribute("style", "display:none !important");
          }
        }, 1000);
      };
      document.body.appendChild(script);
    }
  }, []);

  return <div ref={ref} style={{ width: "420px", height: "600px" }} />;
}