import jalaali from 'jalaali-js';
import { getHolidayInfo, isHolidayDate } from './persianHolidays';

export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

export const getPersianDate = (date: Date = new Date()): PersianDate => {
  return jalaali.toJalaali(date);
};

export const getPersianDateString = (date: Date = new Date()): string => {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
};

export const getPersianDayName = (date: Date = new Date()): string => {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  return days[date.getDay()];
};

export const getPersianMonthName = (month: number): string => {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return months[month - 1];
};

export const formatTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
};

export const isHoliday = (jy: number, jm: number, jd: number): boolean => {
  return isHolidayDate(jy, jm, jd);
};

export const isFriday = (date: Date): boolean => {
  return date.getDay() === 5; // Friday
};

export const getHolidayName = (jy: number, jm: number, jd: number): string | null => {
  const holiday = getHolidayInfo(jy, jm, jd);
  return holiday ? holiday.name : null;
};