import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMovieGlobal } from '..'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 网站顶部
 * @returns
 */
export const Header = props => {
  const { collapseRef } = useMovieGlobal() // 移除 searchModal，不再使用搜索框
  const router = useRouter()
  const { customNav, customMenu } = props
  const { locale } = useGlobal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  // 定义导航链接
  let links = [
    {
      id: 1,
      icon: 'fa-solid fa-house',
      name: locale.NAV.INDEX,
      href: '/',
      show: siteConfig('MOVIE_MENU_INDEX', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('MOVIE_MENU_ARCHIVE', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i
    }
  }

  // 如果开启自定义菜单，则覆盖 Page 生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  return (
    <>
      <header className="w-full px-8 h-20 z-20 flex lg:flex-row md:flex-col justify-between items-center">
        {/* 左侧 Logo */}
        <Link
          href="/"
          className="logo whitespace-nowrap text-2xl md:text-3xl font-bold text-gray-dark no-underline flex items-center">
          {siteConfig('TITLE')}
        </Link>

        <div className="md:w-auto text-center flex space-x-2">
          {/* 右侧菜单 */}
          <nav
            id="nav-mobile"
            className="leading-8 justify-center w-full hidden md:flex">
            {links?.map(
              (link, index) =>
                link && link.show && <MenuItemDrop key={index} link={link} />
            )}
          </nav>

          {/* 移动端按钮 */}
          <div className="md:hidden">
            <div onClick={toggleMenuOpen} className="w-8 cursor-pointer">
              {isOpen ? (
                <i className="fas fa-times" />
              ) : (
                <i className="fas fa-bars" />
              )}
            </div>
          </div>
        </div>
      </header>

      <Collapse
        className="block md:hidden"
        collapseRef={collapseRef}
        type="vertical"
        isOpen={isOpen}>
        {/* 移动端菜单 */}
        <menu id="nav-menu-mobile" className="my-auto justify-start">
          {links?.map(
            (link, index) =>
              link &&
              link.show && (
                <MenuItemCollapse
                  onHeightChange={param =>
                    collapseRef.current?.updateCollapseHeight(param)
                  }
                  key={index}
                  link={link}
                />
              )
          )}
        </menu>
      </Collapse>
    </>
  )
}
