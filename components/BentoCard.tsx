import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  badge?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function BentoCard({
  children,
  className = "",
  colSpan = "col-span-1",
  badge,
  title,
  subtitle,
  icon,
}: BentoCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${colSpan} ${className}`}
    >
      {(title || badge || icon) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-800 font-bold border border-emerald-200/50">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs font-semibold text-slate-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
