

export const convertObjToFormData =(obj: { [key: string]: any | File | File[] })=>{
  const formData = new FormData();
  for (let key in obj){
    if (obj[key] instanceof Array){
      const filesArr = obj[key] as Blob[];
      for (let file of filesArr){
        formData.append(key, file)
      }
    } else {
      if (!obj[key] || typeof obj[key] === 'object' && !(obj[key] instanceof Blob)) continue; // if null or undefined
      formData.append(key, obj[key] as string | Blob)
    }
  }
  return formData
}