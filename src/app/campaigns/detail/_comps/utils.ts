

export const convertConfigsToOptions =(data?: ICampaignConfig[], selectedVal?:string)=>{
  if (!data){
    return [{value: selectedVal || 'N/A', display: selectedVal || "N/A"}]
  }
  return data.map(config=> ({value: config.configKey, display:config.configValue}))
}


export const getTrackedFieldObj =(apiValue: any, value: any)=>{
  return ({
    isFilled: Boolean(value),
    hasChanged: apiValue !== value
  });
}

export const roundToXDecimals =(num:number, x:number)=> {
  return +num.toFixed(x);
}
