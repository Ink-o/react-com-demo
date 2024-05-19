import { createContext } from 'react'

export interface LocaleContextType {
  locale: string
}

// 记录当前使用的语言包
const LocaleContext = createContext<LocaleContextType>({
  locale: 'zh-CN'
})

export default LocaleContext