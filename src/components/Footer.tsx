
interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`flex items-center sticky bottom-0 justify-between bg-white border-t border-gray-200 px-8 py-5 ${className}`}
    >
      {/* Left side - Copyright */}
      <p className="text-xs font-medium text-slate-500 uppercase">
        <span className="inline text-xs font-medium uppercase">
          Copyright ©
        </span>
        <span className="ml-1">{currentYear}</span>
      </p>

      {/* Right side - Links */}
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="text-xs font-semibold text-slate-700 uppercase hover:text-slate-900 transition-colors duration-300"
        >
          Help
        </a>
        <a
          href="#"
          className="text-xs font-semibold text-slate-700 uppercase hover:text-slate-900 transition-colors duration-300"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-xs font-semibold text-slate-700 uppercase hover:text-slate-900 transition-colors duration-300"
        >
          Privacy
        </a>
      </div>
    </footer>
  );
}
