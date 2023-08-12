'use client';
import { useRef, useEffect } from "react";

const useOutsideClick = (callback, dependencies) =>{

  const ref = useRef();

  const validateDependencies = (event) => {

    if(dependencies === undefined) return true;

    let flag = true;
    
    for (let i = 0; i < dependencies.length; i++) {
      if(dependencies[i].current.contains(event.target)){
        flag = false;
        break;
      }  
    }

    return flag;
  }

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target) && validateDependencies(event)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
}

export default useOutsideClick;