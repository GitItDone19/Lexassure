export default function Logo({
  size = "md",
  variant = "light"
}: {
  size?: "sm" | "md" | "lg"
  variant?: "light" | "dark"
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  }

  const assureColor = variant === "dark"
    ? "text-white"
    : "text-black"

  return (
    <div className="flex items-center">
      <span className={`font-bold ${sizes[size]} tracking-tight`} style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
        <span className="text-[#28a2fc]">Lex</span>
        <span className={assureColor}>assure</span>
      </span>
    </div>
  )
}
