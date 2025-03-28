import { Sandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

export function Code({ files, entryFile }) {
  const [editorHeight, setEditorHeight] = useState(400);
  const [editorWidth, setEditorWidth] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setEditorWidth(100);
      } else {
        setEditorWidth(80);
      }

      if (files && files["/index.html"]) {
        const linesOfCode = files["/index.html"].code.split("\n").length;
        const calculatedHeight = Math.max(400, linesOfCode * 20 + 40);
        setEditorHeight(calculatedHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [files]);

  return (
    <div className="w-full mx-auto rounded-2xl shadow-lg bg-black/50 p-4">
      <Sandpack
        template="vanilla"
        theme={{
          colors: {
            surface1: "#1e1b29", // Dark background
            surface2: "#312450", // Dark purple panels
            surface3: "#3d2e65", // Slightly lighter purple
            clickable: "#a78bfa", // Light purple for active tabs
            base: "#ffffff",
            disabled: "#777",
            hover: "#c4a7f0",
          },
          syntax: {
            plain: "#e0def4",
            comment: "#908caa",
            keyword: "#c4a7f0",
            tag: "#f28fad",
            punctuation: "#f8c8dc",
            definition: "#ebbcba",
            property: "#f6c177",
            static: "#9ccfd8",
            string: "#9ccfd8",
          },
          font: {
            body: "Inter, sans-serif",
            mono: "Fira Code, monospace",
            size: "14px",
          },
        }}
        options={{
          showTabs: true,
          editorHeight: editorHeight,
          editorWidthPercentage: editorWidth,
          showNavigator: true,
          showLineNumbers: true,
          activeFile: `/${entryFile}`,
          resizablePanels: true,
          showOpenInCodeSandbox: false,
          classes: {
            "sp-wrapper": "rounded-2xl",
            "sp-layout": "border border-purple-600/50 rounded-xl",
            "sp-tabs": "bg-purple-800/40 text-white",
            "sp-tab-button": "hover:bg-purple-600/40",
            "sp-editor": "bg-black/50 border border-purple-600/50 rounded-xl",
          },
        }}
        files={files}
        customSetup={{
          entry: entryFile,
        }}
      />
    </div>
  );
}
