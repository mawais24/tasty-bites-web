"use client";

import { useState, useEffect, useRef } from "react";
import type { MenuCategory } from "@/lib/menu";

const SCROLL_OFFSET = 144; // navbar (72px) + tab bar (~56px) + padding (16px)

export default function MenuTabs({ categories: menuCategories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(menuCategories[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isManualScrollRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Scroll spy — tracks which section is nearest the top of the visible area
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      let currentId = menuCategories[0].id;
      for (const cat of menuCategories) {
        const el = document.getElementById(`section-${cat.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET + 24) {
          currentId = cat.id;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuCategories]);

  // Auto-scroll the tab bar so the active tab is always visible
  useEffect(() => {
    const btn = tabRefs.current[activeId];
    const nav = navRef.current;
    if (!btn || !nav) return;

    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const navScroll = nav.scrollLeft;
    const navWidth = nav.offsetWidth;

    if (btnLeft < navScroll + 16) {
      nav.scrollTo({ left: btnLeft - 16, behavior: "smooth" });
    } else if (btnLeft + btnWidth > navScroll + navWidth - 16) {
      nav.scrollTo({ left: btnLeft + btnWidth - navWidth + 16, behavior: "smooth" });
    }
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    isManualScrollRef.current = true;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);

    setActiveId(id);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-18 z-40 bg-white border-b border-espresso/10 shadow-sm">
      <div
        ref={navRef}
        className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {menuCategories.map((category) => {
          const isActive = activeId === category.id;
          const isHighlight = category.highlight;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[category.id] = el;
              }}
              onClick={() => scrollToSection(category.id)}
              className={`shrink-0 px-3.5 py-2 text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                isActive
                  ? isHighlight
                    ? "bg-gold text-espresso"
                    : "bg-espresso text-cream"
                  : isHighlight
                    ? "text-gold hover:text-espresso border border-gold/40 hover:bg-gold/10"
                    : "text-warm-brown hover:text-espresso"
              }`}
            >
              {category.tabLabel ?? category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
