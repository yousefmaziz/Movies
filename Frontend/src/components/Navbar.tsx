import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/Categories" },
    { label: "Watchlist", to: "/watchlist" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        className="fixed top-0 z-20 w-full border-b border-zinc-800/60 bg-[#0c0c0e]/90 backdrop-blur-md text-white"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 lg:px-8 h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-4 w-1 rounded-full bg-red-500" />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: "-0.01em",
              }}
              className="text-sm font-black text-white"
            >
              MovieHub
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive(to)
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Open menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        className={`fixed top-0 right-0 h-screen w-60 bg-[#0c0c0e] border-l border-zinc-800/60 z-40 transform transition-transform duration-200 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-12 border-b border-zinc-800/60">
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-sm font-black text-white"
          >
            MovieHub
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <ul className="flex flex-col gap-1 p-3">
          {links.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {isActive(to) && (
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                )}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
