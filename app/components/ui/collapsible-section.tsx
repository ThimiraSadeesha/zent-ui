"use client";

import React, { ReactNode, useState } from "react";

interface CollapsibleSectionProps {
    title: string;
    icon?: string;
    badge?: string | number;
    defaultExpanded?: boolean;
    children: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    icon,
    badge,
    defaultExpanded = false,
    children,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="rounded-lg bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm overflow-hidden">
            {/* Header - Clickable */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/30 transition"
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-2xl">{icon}</span>}
                    <h2 className="text-xl font-semibold text-neutral-200">{title}</h2>
                    {badge !== undefined && (
                        <span className="px-2 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm">
                            {badge}
                        </span>
                    )}
                </div>
                <div className="text-neutral-400 transition-transform duration-200" style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Content - Collapsible */}
            <div
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                    maxHeight: isExpanded ? '10000px' : '0',
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                <div className="p-4 pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
