import  { useCallback, useState } from 'react'

export default function Toggle(initialState,{
    setting,projects,reports,accesscontrol}) {
  
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(prev=>   !prev ), []);
    return [state, toggle]
}
