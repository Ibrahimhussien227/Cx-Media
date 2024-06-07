export const getDirtyFields = <
  TData extends Record<keyof TDirtyItems, unknown>,
  TDirtyItems extends Record<string, unknown>
>(
  data: TData,
  dirtyItems: TDirtyItems
): Partial<TData> => {
  const dirtyItemsEntries = Object?.entries(dirtyItems);

  return dirtyItemsEntries.reduce((dirtyData, [name, value]) => {
    if (typeof value !== "object") {
      return { ...dirtyData, [name]: data[name] };
    }

    return {
      ...dirtyData,
      [name]: getDirtyFields(
        data[name] as TData,
        dirtyItems[name] as TDirtyItems
      ),
    };
  }, {});
};
