import { format } from 'date-fns';

const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);

  return format(dateFormatted, 'dd/MM/yyyy');
};

export default formatDate;