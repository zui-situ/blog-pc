const udate = {
  MOMENT_PM: '下午',
  MOMENT_AM: '上午',
  MOMENT_AGO: (args: { date: string }) => `${args.date}前`,
  MOMENT_JUST_NOW: '刚刚',
  MOMENT_MINUTES: '分钟',
  MOMENT_HOURS: '小时',
  MOMENT_WEEKS: '周',
  MOMENT_DAYS: '天',
  MOMENT_MONTHS: '个月',
  MOMENT_YEAR: '年'
}
export default udate
