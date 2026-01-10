import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

export default function SplashScreen() {
  const { darkMode } = useTheme();

  return (
    <div
      role="status"
      aria-busy="true"
      className={`relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 blur-3xl opacity-30 ${
          darkMode
            ? "bg-gradient-to-br from-gray-500 via-slate-500 to-black-500"
            : "bg-gradient-to-br from-gray-300 via-slate-300 to-white-300"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center animate-[fadeIn_0.6s_ease-out]">
        {/* Logo */}
        <div className="mb-6 animate-[scalePulse_2.4s_ease-in-out_infinite]">
          <Image
            src={darkMode ? "/logos/logo-dark.svg" : "/logos/logo-light.svg"}
            alt="PrivGPT Studio Logo"
            width={290}
            height={53}
            priority
            className="w-[240px] h-auto"
          />
        </div>

        {/* Loader Dots */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400 animate-[dotPulse_1.4s_infinite]" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400 animate-[dotPulse_1.4s_infinite_0.2s]" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400 animate-[dotPulse_1.4s_infinite_0.4s]" />
        </div>

        {/* Text */}
        <p
          className={`mt-5 text-sm tracking-wide ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Preparing your workspace
        </p>

        {/* Progress Bar */}
        <div className="mt-6 w-48 h-[2px] overflow-hidden rounded-full bg-gray-300/40">
          <div className="h-full w-1/3 bg-gray-400 animate-[progress_1.6s_linear_infinite]" />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scalePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        @keyframes dotPulse {
          0%,
          80%,
          100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
