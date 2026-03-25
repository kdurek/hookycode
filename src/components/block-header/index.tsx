import { cn } from '@/utilities/ui'
import React from 'react'

export type Props = {
  title: string
  className?: string
}

export const BlockHeader: React.FC<Props> = (props) => {
  const { title, className } = props

  return <h2 className={cn('text-2xl font-semibold', className)}>{title}</h2>
}
