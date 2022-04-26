import { CategoryCode, CategoryName, Home } from '@/constants/router'
import { getCategoryRoute } from '@/transforms/route'

export interface MenuItem {
  code: string
  icon: string
  name: string
  route?: string
}

export const menus: Array<MenuItem> = [
  {
    route: '/',
    icon: 'icon-home',
    name: Home.HOME_NAME,
    code: Home.HOME_CODE
  },
  {
    route: getCategoryRoute(CategoryCode.FRONT_END),
    icon: 'icon-html',
    name: CategoryName.FRONT_END,
    code: CategoryCode.FRONT_END
  },
  {
    route: getCategoryRoute(CategoryCode.BAKC_END),
    icon: 'icon-server',
    name: CategoryName.BAKC_END,
    code: CategoryCode.BAKC_END
  },
  {
    route: getCategoryRoute(CategoryCode.PROJECT),
    icon: 'icon-project',
    name: CategoryName.PROJECT,
    code: CategoryCode.PROJECT
  },
  {
    route: getCategoryRoute(CategoryCode.TALK),
    icon: 'icon-history',
    name: CategoryName.TALK,
    code: CategoryCode.TALK
  }
]
