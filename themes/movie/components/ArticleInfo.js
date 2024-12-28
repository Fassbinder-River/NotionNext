import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'

export const ArticleInfo = props => {
  const { post } = props
  const { locale } = useGlobal()

  return (
    <section className="w-full mx-auto mb-6">
      {/* 标题 */}
      <h2
        className="text-left break-words"
        style={{
          fontSize: 'clamp(24px, 5vw, 36px)', // 动态调整字体大小
          fontWeight: 800,                   // 使用较粗的字体权重
          lineHeight: '1.8',                 // 增大行高适配中英文混排
          wordBreak: 'break-word',           // 长单词断行
          whiteSpace: 'normal',              // 允许换行
          color: 'var(--text-color, #000)',  // 动态适配深浅主题颜色
        }}
      >
        {post?.title || locale.COMMON.NO_TITLE}
      </h2>

      {/* 分类和标签 */}
      <div className="flex flex-wrap gap-3 font-medium text-sm items-center justify-start mt-4">
        {/* 归档日期 */}
        {post?.publishDate && (
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400">
            {post?.publishDay}
          </Link>
        )}

        {/* 分类 */}
        {post?.type !== 'Page' && post?.category && (
          <Link
            href={`/category/${post?.category}`}
            passHref
            className="cursor-pointer text-md text-green-600 hover:text-green-700">
            {post?.category}
          </Link>
        )}

        {/* 标签 */}
        {post?.tags?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">{locale.COMMON.TAGS}:</span>
            {post.tags.map(tag => (
              <Link
                href={`/tag/${tag}`}
                key={tag}
                className="text-yellow-500 hover:text-yellow-600">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
