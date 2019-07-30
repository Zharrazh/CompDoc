export const getInt = (value: string, defautlValue: number = 0) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? defautlValue : parsed;
};
