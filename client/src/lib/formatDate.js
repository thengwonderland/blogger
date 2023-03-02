const formatDate = (date, locale = 'en-US') => {
  if (!date) return null;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString(locale, options);
};

export default formatDate;