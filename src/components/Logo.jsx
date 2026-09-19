export default function Logo({ size = 42, className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="Nirman SETU"
      height={size}
      style={{ width: 'auto', objectFit: 'contain', display: 'block', borderRadius: 8 }}
      className={`ns-logo ${className}`}
    />
  )
}