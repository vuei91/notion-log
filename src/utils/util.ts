export const removeDuplicatesById = (
  list: { id: number; [key: string]: any }[],
) => {
  const seen = new Set<number>();
  return list.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};
