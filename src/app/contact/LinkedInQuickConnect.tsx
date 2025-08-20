import React, { useState } from "react";
import Button from "@/components/Button";
import teamJson from "@/data/team.json";

const teamOptions = teamJson.team.map((member: { id: string; name: string; socialLinks: { linkedin: string } }) => ({
  id: member.id,
  name: member.name,
  linkedin: member.socialLinks.linkedin,
}));

export default function LinkedInQuickConnect() {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleSelect(linkedin: string) {
    window.open(linkedin, "_blank");
    setShowDropdown(false);
  }

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="secondary"
        size="md"
        className="w-full font-spaceGrotesk"
        onClick={() => setShowDropdown((v) => !v)}
      >
        Connect on LinkedIn
        <span className="ml-2">▼</span>
      </Button>
      {showDropdown && (
        <div className="absolute left-0 top-full mt-2 w-full bg-[var(--background-secondary)] border border-yellow-500 rounded-lg shadow-lg z-10 p-2">
          {teamOptions.map((member) => (
            <button
              key={member.id}
              className="w-full text-left px-3 py-2 rounded font-spaceGrotesk text-[var(--accent-yellow)] hover:bg-yellow-100"
              onClick={() => handleSelect(member.linkedin)}
            >
              {member.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
