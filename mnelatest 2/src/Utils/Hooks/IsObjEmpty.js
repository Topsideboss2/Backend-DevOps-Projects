import { useCallback, useState } from "react"

export default function IsEmptyObj(obj) {
    console.log("perm",obj)
    const {isEmpty,setIsEmpty} =useState(true)
    const checkEmpty=useCallback(() =>Object.keys(obj).length === 0? setIsEmpty(prev=>   prev ):setIsEmpty(prev=>   !prev ), []);
    return [isEmpty,checkEmpty]

}

// export default function Toggle(initialState,id) {
  
//     const [state, setState] = useState(initialState);
//     const toggle = useCallback(() => setState(prev=>   !prev ), []);
//     return [state, toggle]
// }