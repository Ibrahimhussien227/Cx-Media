import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type errorRespData = {
  message: string,
  error: string,
  debug: string;
}


export const getErrorMessage =(error: FetchBaseQueryError | SerializedError)=>{
  if (!('status' in error)) { // then it's SerializedError
    return error.message as string;
  }

  // then it's FetchBaseQueryError
  if ('data' in error){
    const errorData = error.data as errorRespData;
    return errorData.message
  }
  return 'An error occured'
}