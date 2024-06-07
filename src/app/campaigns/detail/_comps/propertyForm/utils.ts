


export const getPropTypeOps =(
  {data, isSuccess}: {data: {data: ICampaignConfig[]}, isSuccess?: boolean}
) : {
  propertyTypeOps: IOption[], isSuccess?: boolean
} =>
{
  return {
    propertyTypeOps : data.data.map(config=> ({value: config.configKey, display:config.configValue})),
    isSuccess
  }
}

