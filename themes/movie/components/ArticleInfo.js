import { useGlobal } from '@/lib/global'
import Link from 'next/link'

export const ArticleInfo = ({ post }) => {
  const { locale, isDarkMode } = useGlobal() // 从全局状态获取深浅模式

  const dynamicStyle = {
    titleColor: isDarkMode ? '#fff' : '#000', // 标题颜色
    timeColor: isDarkMode ? '#ccc' : '#000', // 时间颜色
  }

  return (
    <section className="w-full mx-auto mb-6">
      {/* 标题 */}
      <h2
        className="text-left break-words"
        style={{
          fontSize: 'clamp(20px, 5vw, 32px)', // 动态调整字体大小
          fontWeight: 800,                    // 加粗标题
          lineHeight: '1.8',                  // 增大行高适配中英文混排
          wordBreak: 'break-word',            // 长单词断行
          whiteSpace: 'normal',               // 允许换行
          color: dynamicStyle.titleColor,     // 动态颜色
        }}
      >
        {post?.title || locale.COMMON.NO_TITLE}
      </h2>

      {/* 分类和时间 */}
      <div className="flex gap-3 font-medium text-sm items-center justify-start flex-wrap mt-2">
        {/* 时间 */}
        {post?.publishDay && (
          <span
            className="text-sm"
            style={{
              color: dynamicStyle.timeColor, // 动态颜色
            }}
          >
            {post?.publishDay}
          </span>
        )}

        {/* 分类 */}
        {post?.type !== 'Page' && post?.category && (
          <Link
            href={`/category/${post.category}`}
            passHref
            className="cursor-pointer text-md text-green-600 hover:text-green-700 transition">
            {post?.category}
          </Link>
        )}
      </div>
    </section>
  )
}
