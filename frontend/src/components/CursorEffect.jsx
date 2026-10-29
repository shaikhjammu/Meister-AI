import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleMouseMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    }

    function handleMouseLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 overflow-hidden"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(236, 72, 153, 0.08), rgba(253, 230, 138, 0.05), transparent 80%)`,
      }}
    />
  );
}
