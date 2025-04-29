"use client";

interface NavigationDotsProps {
  totalSections: number;
  activeSection: number;
  onDotClick: (index: number) => void;
}

export default function NavigationDots({
  totalSections,
  activeSection,
  onDotClick
}: NavigationDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={`nav-dot-${index}`}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 
            ${activeSection === index ? "bg-[var(--accent-red)] w-4 h-4" : "bg-gray-400"}`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
} 