import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

interface MDXRemoteProps {
  source: string
}

export async function MDXRemote({ source }: MDXRemoteProps) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(source)

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: String(result) }}
    />
  )
}
