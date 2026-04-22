interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  sizes?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, sizes } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Logo Hooky Code"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={className}
      src="/logo.webp"
      sizes={sizes}
    />
  )
}
