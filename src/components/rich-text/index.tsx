'use client'

import { MediaBlock } from '@/blocks/media-block/component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/call-to-action/component'
import { cn } from '@/utilities/ui'
import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | CTABlockProps>

export const getLocalizedPath = (
  pathname: keyof typeof routing.pathnames,
  locale: string,
): string => {
  const pathConfig = routing.pathnames[pathname]
  return pathConfig[locale as keyof typeof pathConfig] || pathname
}

const internalDocToHref =
  (locale: string) =>
  ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!
    if (typeof value !== 'object') {
      throw new Error('Expected value to be an object')
    }
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`

    switch (relationTo) {
      case 'pages':
        return `${prefix}/${value.slug}`
      case 'projects':
        return `${prefix}${getLocalizedPath('/projects', locale)}/${value.slug}`
      case 'files':
        return `${value.url}`
      default:
        return ''
    }
  }

const jsxConverters =
  (locale: string): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref: internalDocToHref(locale) }),
    blocks: {
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-span-3 col-start-1"
          imgClassName="m-0 mx-auto"
          {...node.fields}
          enableGutter={false}
        />
      ),
      cta: ({ node }) => <CallToActionBlock {...node.fields} enableGutter={false} />,
    },
  })

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const locale = useLocale()
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters(locale)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          prose: enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
