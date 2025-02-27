export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative mb-8 ml-2 text-4xl font-medium">
      <span className="bg-muted absolute -top-3 -left-3 -z-10 size-16 rounded-full" />
      {children}
    </h3>
  )
}
