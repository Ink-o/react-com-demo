import { CSSProperties, ReactNode, useState } from 'react';
import './index.scss'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'
import React from 'react'
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import LocaleContext from './LocaleContext'
import dayjs from 'dayjs';

interface IAntdCalendarProps {
  value: Dayjs,
  style?: CSSProperties,
  className?: string | string[],
  // 定制日期显示，完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode,
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode,
  // 国际化相关
  locale?: string,
  onChange?: (date: Dayjs) => void
}

const AntdCalendar = (props: IAntdCalendarProps) => {
  const {
    style,
    className,
    locale,
    value,
    onChange,
  } = props

  const classNames = cs('calendar', className)

  // 接管外部传入进来的 value
  const [curVal, setCurVal] = useState(value)
  // 当前展示日期的值
  const [curMonth, setCurMonth] = useState(value)

  // 将当前选中的 value 和日期展示
  function changeDate(date: Dayjs) {
    setCurVal(date)
    setCurMonth(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    changeDate(date)
  }

  function prevMonthHandler() {
    // 针对当前月 - 1个月
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  function nextMonthHandler() {
    // 针对当前月 + 1个月
    setCurMonth(curMonth.add(1, 'month'));
  }

  // 处理当天
  function todayHandler() {
    const date = dayjs(Date.now())
    changeDate(date)
  }

  // 通过 context 透传设置好的语言包
  return <LocaleContext.Provider value={{
    locale: locale || navigator.language
  }}>
    <div className={classNames} style={style}>
      <Header todayHandler={todayHandler} curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler}/>
      <MonthCalendar {...props} value={curVal} curMonth={curMonth} selectHandler={selectHandler}/>
    </div>
  </LocaleContext.Provider>
}

export default AntdCalendar

export type {
  IAntdCalendarProps
}