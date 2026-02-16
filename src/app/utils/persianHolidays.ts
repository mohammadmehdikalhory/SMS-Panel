// تعطیلات و مناسبت‌های رسمی ایران برای سال‌های 1404-1406
export interface Holiday {
  date: string; // format: YYYY/MM/DD
  name: string;
  isHoliday: boolean; // آیا تعطیل رسمی است؟
}

export const persianHolidays: Holiday[] = [
  // 1404
  { date: '1404/01/01', name: 'عید نوروز', isHoliday: true },
  { date: '1404/01/02', name: 'عید نوروز', isHoliday: true },
  { date: '1404/01/03', name: 'عید نوروز', isHoliday: true },
  { date: '1404/01/04', name: 'عید نوروز', isHoliday: true },
  { date: '1404/01/12', name: 'روز جمهوری اسلامی ایران', isHoliday: true },
  { date: '1404/01/13', name: 'روز طبیعت (سیزده به‌در)', isHoliday: true },
  { date: '1404/02/02', name: 'ولادت امام حسین (ع) و روز پاسدار', isHoliday: false },
  { date: '1404/02/14', name: 'رحلت حضرت امام خمینی (ره)', isHoliday: true },
  { date: '1404/02/15', name: 'قیام 15 خرداد', isHoliday: true },
  { date: '1404/03/03', name: 'شهادت امام علی (ع)', isHoliday: true },
  { date: '1404/03/10', name: 'عید سعید فطر', isHoliday: true },
  { date: '1404/03/11', name: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true },
  { date: '1404/03/14', name: 'شهادت امام جعفر صادق (ع)', isHoliday: false },
  { date: '1404/05/17', name: 'عید سعید قربان', isHoliday: true },
  { date: '1404/05/25', name: 'عید سعید غدیر خم', isHoliday: true },
  { date: '1404/07/07', name: 'تاسوعای حسینی', isHoliday: true },
  { date: '1404/07/08', name: 'عاشورای حسینی', isHoliday: true },
  { date: '1404/07/20', name: 'اربعین حسینی', isHoliday: true },
  { date: '1404/08/15', name: 'رحلت رسول اکرم (ص) و شهادت امام حسن مجتبی (ع)', isHoliday: true },
  { date: '1404/08/17', name: 'شهادت امام رضا (ع)', isHoliday: true },
  { date: '1404/09/27', name: 'میلاد رسول اکرم (ص) و امام جعفر صادق (ع)', isHoliday: false },
  { date: '1404/11/22', name: 'پیروزی انقلاب اسلامی', isHoliday: true },
  { date: '1404/12/15', name: 'شهادت حضرت فاطمه زهرا (س)', isHoliday: false },
  { date: '1404/12/29', name: 'روز ملی شدن صنعت نفت', isHoliday: true },
  
  // 1405
  { date: '1405/01/01', name: 'عید نوروز', isHoliday: true },
  { date: '1405/01/02', name: 'عید نوروز', isHoliday: true },
  { date: '1405/01/03', name: 'عید نوروز', isHoliday: true },
  { date: '1405/01/04', name: 'عید نوروز', isHoliday: true },
  { date: '1405/01/12', name: 'روز جمهوری اسلامی ایران', isHoliday: true },
  { date: '1405/01/13', name: 'روز طبیعت (سیزده به‌در)', isHoliday: true },
  { date: '1405/01/22', name: 'ولادت امام حسین (ع) و روز پاسدار', isHoliday: false },
  { date: '1405/02/14', name: 'رحلت حضرت امام خمینی (ره)', isHoliday: true },
  { date: '1405/02/15', name: 'قیام 15 خرداد', isHoliday: true },
  { date: '1405/02/23', name: 'شهادت امام علی (ع)', isHoliday: true },
  { date: '1405/02/30', name: 'عید سعید فطر', isHoliday: true },
  { date: '1405/03/01', name: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true },
  { date: '1405/03/04', name: 'شهادت امام جعفر صادق (ع)', isHoliday: false },
  { date: '1405/05/07', name: 'عید سعید قربان', isHoliday: true },
  { date: '1405/05/15', name: 'عید سعید غدیر خم', isHoliday: true },
  { date: '1405/06/27', name: 'تاسوعای حسینی', isHoliday: true },
  { date: '1405/06/28', name: 'عاشورای حسینی', isHoliday: true },
  { date: '1405/08/06', name: 'اربعین حسینی', isHoliday: true },
  { date: '1405/09/04', name: 'رحلت رسول اکرم (ص) و شهادت امام حسن مجتبی (ع)', isHoliday: true },
  { date: '1405/09/06', name: 'شهادت امام رضا (ع)', isHoliday: true },
  { date: '1405/10/17', name: 'میلاد رسول اکرم (ص) و امام جعفر صادق (ع)', isHoliday: false },
  { date: '1405/11/22', name: 'پیروزی انقلاب اسلامی', isHoliday: true },
  { date: '1405/12/05', name: 'شهادت حضرت فاطمه زهرا (س)', isHoliday: false },
  { date: '1405/12/29', name: 'روز ملی شدن صنعت نفت', isHoliday: true },
  
  // 1406
  { date: '1406/01/01', name: 'عید نوروز', isHoliday: true },
  { date: '1406/01/02', name: 'عید نوروز', isHoliday: true },
  { date: '1406/01/03', name: 'عید نوروز', isHoliday: true },
  { date: '1406/01/04', name: 'عید نوروز', isHoliday: true },
  { date: '1406/01/11', name: 'ولادت امام حسین (ع) و روز پاسدار', isHoliday: false },
  { date: '1406/01/12', name: 'روز جمهوری اسلامی ایران', isHoliday: true },
  { date: '1406/01/13', name: 'روز طبیعت (سیزده به‌در)', isHoliday: true },
  { date: '1406/02/12', name: 'شهادت امام علی (ع)', isHoliday: true },
  { date: '1406/02/14', name: 'رحلت حضرت امام خمینی (ره)', isHoliday: true },
  { date: '1406/02/15', name: 'قیام 15 خرداد', isHoliday: true },
  { date: '1406/02/19', name: 'عید سعید فطر', isHoliday: true },
  { date: '1406/02/20', name: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true },
  { date: '1406/02/23', name: 'شهادت امام جعفر صادق (ع)', isHoliday: false },
  { date: '1406/04/26', name: 'عید سعید قربان', isHoliday: true },
  { date: '1406/05/04', name: 'عید سعید غدیر خم', isHoliday: true },
  { date: '1406/06/16', name: 'تاسوعای حسینی', isHoliday: true },
  { date: '1406/06/17', name: 'عاشورای حسینی', isHoliday: true },
  { date: '1406/07/25', name: 'اربعین حسینی', isHoliday: true },
  { date: '1406/08/23', name: 'رحلت رسول اکرم (ص) و شهادت امام حسن مجتبی (ع)', isHoliday: true },
  { date: '1406/08/25', name: 'شهادت امام رضا (ع)', isHoliday: true },
  { date: '1406/10/06', name: 'میلاد رسول اکرم (ص) و امام جعفر صادق (ع)', isHoliday: false },
  { date: '1406/11/22', name: 'پیروزی انقلاب اسلامی', isHoliday: true },
  { date: '1406/11/24', name: 'شهادت حضرت فاطمه زهرا (س)', isHoliday: false },
  { date: '1406/12/29', name: 'روز ملی شدن صنعت نفت', isHoliday: true },
];

export const getHolidayInfo = (year: number, month: number, day: number): Holiday | null => {
  const dateKey = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
  return persianHolidays.find(h => h.date === dateKey) || null;
};

export const isHolidayDate = (year: number, month: number, day: number): boolean => {
  const holiday = getHolidayInfo(year, month, day);
  return holiday?.isHoliday || false;
};
