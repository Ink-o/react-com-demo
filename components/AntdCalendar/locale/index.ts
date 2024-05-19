import zhCN from "./zh-CN";
import enUS from "./en-US";
import { CalendarType } from "./interface";

// 映射语言包
const allLocales: Record<string, CalendarType>= {
  'zh-CN': zhCN,
  'en-US': enUS
}

export default allLocales;
