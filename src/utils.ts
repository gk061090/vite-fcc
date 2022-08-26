import spacetime, { Spacetime } from "spacetime";

export enum DateFormat {
  Dmy = "dd.MM.yyyy",
  Ymd = "yyyy-MM-dd",
  Iso = "iso",
}

const getNextWorkingDay = (
  dateST: Spacetime,
  holidays: string[]
): Spacetime => {
  if (!holidays.includes(dateST.unixFmt(DateFormat.Ymd))) {
    return dateST;
  }

  return getNextWorkingDay(dateST.add(1, "day"), holidays);
};

export const getMinDatePicker = (holidays: string[]): Date => {
  const todayST = spacetime.today();

  if (!holidays.includes(todayST.unixFmt(DateFormat.Ymd))) {
    return todayST.toNativeDate();
  }

  return getNextWorkingDay(todayST.add(1, "day"), holidays).toNativeDate();
};

export const TZ = "Europe/Moscow";
export const BUSINESS_LIMIT_HOUR = 17;

export const getMinMaxEarlyRepaymentDatePicker = (
  holidays: string[]
): { minDate: Date; maxDate: Date } => {
  const todayST = spacetime.today();
  const minDate = getMinDatePicker(holidays);
  const nextDate = getNextWorkingDay(
    todayST.add(1, "day"),
    holidays
  ).toNativeDate();

  const moscowHours = spacetime.now(TZ).hour();
  const preparedMinDate =
    moscowHours < BUSINESS_LIMIT_HOUR ? minDate : nextDate;

  return { minDate: preparedMinDate, maxDate: nextDate };
};
