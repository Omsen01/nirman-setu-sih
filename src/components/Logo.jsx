export default function Logo({ size = 42, width, className = '' }) {
  const isWide = width != null
  return (
    <img
      src="/logo.png"
      alt="Nirman SETU"
      width={isWide ? width : undefined}
      height={isWide ? undefined : size}
      style={{
        width: isWide ? width : 'auto',
        height: isWide ? 'auto' : size,
        objectFit: 'contain',
        display: 'block',
        borderRadius: 8,
      }}
      className={`ns-logo ${className}`}
    />
  )
}