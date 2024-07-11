import { Cost } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatPercent= (data: number) => {
  return (data/ 100).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits:2,
  });
};


export const formatCurrencyGT = (amount: number) => {
  return (amount / 100).toLocaleString('en-GT', {
    style: 'currency',
    currency: 'GTQ',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(date);
};

export const formatDateGT = (
  dateStr: string,
  locale: string = 'fr-CA',
) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat(locale).format(date);

  return formatter
};

export const DollarToQt = (
  investment: number,
) => {
   const quetzales = investment*7.9;
   return(quetzales.toFixed(2))
};

export const floatToNumber = (
  data: string,
) => {
  console.log(data)
  const numericdata = Number(data*100)
  console.log(numericdata)
  return(numericdata)
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
