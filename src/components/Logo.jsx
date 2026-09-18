export default function Logo({ size = 42, className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nirman SETU logo"
    >
      <defs>
        <linearGradient id="ns-bridge" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
        <linearGradient id="ns-water" x1="0" y1="0" x2="0" y2="64">
          <stop offset="0%" stopColor="#00BFA6" />
          <stop offset="100%" stopColor="#009E8B" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="18" fill="#0F2341" />

      <path
        d="M14 44 V36 C14 26 20 20 32 20 C44 20 50 26 50 36 V44"
        stroke="url(#ns-bridge)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 44 V47 C14 49 18 50 24 50 C30 50 34 47 40 47 C44 47 46 50 50 50 V47"
        stroke="#FFB800"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="24" y="13" width="4" height="7" rx="1.5" fill="url(#ns-bridge)" />
      <rect x="36" y="13" width="4" height="7" rx="1.5" fill="url(#ns-bridge)" />
      <path
        d="M2 52 C14 56 30 56 42 54 C50 53 56 52 62 52 V62 H2 Z"
        fill="url(#ns-water)"
        opacity="0.85"
      />
    </svg>
  )
}