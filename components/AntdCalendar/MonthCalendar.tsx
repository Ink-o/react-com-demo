import type { IAntdCalendarProps } from '.'
import type { Dayjs } from 'dayjs'
import React, { useContext } from 'react'
import allLocales from './locale'
import LocaleContext from './LocaleContext'
import cs from 'classnames'

interface IMonthCalendarProps extends IAntdCalendarProps{
  selectHandler?: (date: Dayjs) => void,
  curMonth: Dayjs
}

// 月份
function MonthCalendar(props: IMonthCalendarProps) {
  const {
    dateRender,
    dateInnerContent,
    value,
    selectHandler,
    curMonth
  } = props

  // 保存 key
  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  // 获取当前使用的语言
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]

  // 获取当月的天数
  const getAllDays = (date: Dayjs) => {
    // 当月的第一天
    const startDate = date.startOf('month')
    // 获取当月第一天对应周几
    const day = startDate.day()

    // 固定生成 42 个方格（6 行 7 列）
    const daysInfo: {
      date: Dayjs,
      currentMonth: boolean,
    }[] = Array(6 * 7)

    // 根据当月第一天是周几。补全前面的上个月的日期
    for (let i = 0; i < day; i++) {
      // 减去特定的天数就能拿到上个月对应的日期了
      daysInfo[i] = {
        date: startDate.subtract(day - i, 'day'),
        currentMonth: false
      }
    }

    // 补全剩下的空格，可能有包含下个月的日期
    for (let i = day; i < daysInfo.length; i++) {
      // 月初加上特定的天数
      const calcDate = startDate.add(i - day, 'day');
      console.log('calcDate.month',  calcDate.month);
      daysInfo[i] = {
        date: calcDate,
        currentMonth: calcDate.month() === date.month()
      }
    }

    return daysInfo
  }

  // 渲染出方块格
  const renderDays = (daysInfo: {
      date: Dayjs,
      currentMonth: boolean,
    }[],
  ) => {
    const rows: React.ReactElement[][] = []
    for (let i = 0; i < 6; i++) {
      const row: React.ReactElement[] = []
      for (let j = 0; j < 7; j++) {
        const item = daysInfo[7 * i + j]
        // 生成具体对应月的日期
        row[j] = (
          <div
            key={`${item.date.month()}-${item.date.date()}`}
            className={"calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')}
            // 处理日期选中
            onClick={() => selectHandler?.(item.date)}
          >
            {/* 有传入 dateRender 的话，直接执行 dateRender 回调作为整个日期单元格的渲染 */}
            {
              dateRender ? dateRender(item.date) : (
                <div className="calendar-month-body-cell-date">
                  <div className={
                    cs(
                      'calendar-month-body-cell-date-value',
                      // 记录选中的日期
                      value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ? 'calendar-month-body-cell-date-selected' : ''
                    )
                  }>{item.date.date()}</div>
                  {/* 有传入 dateInnerContent 的话，直接再渲染多一栏 */}
                  <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
                </div>
              )
            }
          </div>
        )
      }
      rows.push(row)
    }
    return rows.map((row, index) => {
      return <div key={index} className='calendar-month-body-row'>{row}</div>
    })
  }

  // 根据当前的月去展示当月的日期
  const allDays = getAllDays(curMonth)
  return <div className='calendar-month'>
    <div className='calendar-month-week-list'>
      {
        weekList.map(week => {
          return <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        })
      }
    </div>
    <div className="calendar-month-body">
      {
        renderDays(allDays)
      }
    </div>
  </div>
}

export default MonthCalendar