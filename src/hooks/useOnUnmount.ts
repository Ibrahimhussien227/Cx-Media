import { useEffect, useRef } from "react";



const useOnUnmount =(func: ()=> void)=> {
  const componentWillUnmount = useRef(false);
  // This is componentWillUnmount
  useEffect(() => {
    componentWillUnmount.current = false
    return () => {
        componentWillUnmount.current = true
    }
  }, [])

  useEffect(() => {
    return () => {
        // This line only evaluates to true after the componentWillUnmount happens 
        if (componentWillUnmount.current) {
            func()
        }
    }

  }, [func])
}

export default useOnUnmount;