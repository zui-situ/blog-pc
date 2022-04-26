/* eslint-disable no-bitwise */
import { defineComponent, PropType } from 'vue'
import { dateToYMD } from '@/utils/moment'
import udate from '@/constants/udate'

export default defineComponent({
  name: 'Udate',
  props: {
    to: {
      type: String as PropType<'YMD' | 'YMDm' | 'ago'>,
      required: true
    },
    date: {
      type: [String, Number, Date] as PropType<string | number | Date>,
      required: true
    },
    separator: {
      type: String,
      default: '-'
    }
  },
  setup(props) {
    return () => {
      // date
      const date = props.date instanceof Date ? props.date : new Date(props.date)

      // YYYY-MM-DD
      if (props.to === 'YMD') {
        return dateToYMD(date, props.separator)
      }

      // YYYY-MM-DD mm
      if (props.to === 'YMDm') {
        const ymd = dateToYMD(date, props.separator)
        const meridiem = date.getHours() > 11 ? udate.MOMENT_PM : udate.MOMENT_AM
        return `${ymd} ${meridiem}`
      }

      // timeAgo
      if (props.to === 'ago') {
        const pluralize = (time: number, label: string) => {
          const ago = `${time} ${label}`
          return udate.MOMENT_AGO({ date: ago })
        }

        const between = Date.now() / 1000 - Number(date) / 1000
        const hourS = 3600
        const dayS = hourS * 24
        const weekS = dayS * 7
        const monthS = dayS * 30
        const yearS = monthS * 12

        if (between < hourS) {
          return ~~(between / 60) === 0
            ? udate.MOMENT_JUST_NOW
            : pluralize(~~(between / 60), udate.MOMENT_MINUTES)
        }
        if (between < dayS) {
          return pluralize(~~(between / hourS), udate.MOMENT_HOURS)
        }
        if (between < weekS) {
          return pluralize(~~(between / dayS), udate.MOMENT_DAYS)
        }
        if (between < monthS) {
          return pluralize(~~(between / weekS), udate.MOMENT_WEEKS)
        }
        if (between < yearS) {
          return pluralize(~~(between / monthS), udate.MOMENT_MONTHS)
        }
        return pluralize(~~(between / yearS), udate.MOMENT_YEAR)
      }

      return null
    }
  }
})
