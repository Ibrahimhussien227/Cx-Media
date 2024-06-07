export const getPropTypeOps = (
  data: { configKey: string; configValue: string }[]
) => {
  return data.map((config) => ({
    value: config.configKey,
    display: config.configValue,
  }));
};
