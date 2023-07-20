export function formatDate(date: Date) {
  const formattedDate = Intl.DateTimeFormat("pt-BR").format(date);
  return formattedDate;
} 