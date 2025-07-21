// Add this at the top of the file if you haven't already, for TypeScript support
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url: string };
      }
    }
  }
  
  "use client";
  
  export default function SplineRobotNew() {
    return (
      <spline-viewer
        url="https://prod.spline.design/hFaKCEniTn9gijel/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      ></spline-viewer>
    );
  }