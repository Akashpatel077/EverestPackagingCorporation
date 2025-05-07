/**
 * Formats a date string or Date object to DD/MM/YYYY format
 * @param date - Date string or Date object to format
 * @returns Formatted date string in DD/MM/YYYY format
 */
export const formatDate = (date: string | Date): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
