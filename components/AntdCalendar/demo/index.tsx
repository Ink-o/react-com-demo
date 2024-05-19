import AntdCalendar from '..'
import dayjs from 'dayjs'
import React from 'react'

export default () => {
  return <AntdCalendar value={dayjs('2023-11-08')} locale='en-US'/>
}