import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null);
  
  const passgenerator = useCallback(()=>{
    let pass ="";
    let str = "abcdefghijklmnopqrstuvwxyz";
    console.log(numberAllowed , charAllowed);
    if (numberAllowed) str+= "0123456789"
    if (charAllowed) str+= "[]{}/!@#$%^&*()"
    console.log(str);
    console.log(length);
    for (let i = 1; i < length; i++) {
      let rendom = Math.floor(Math.random()*str.length+1);
      console.log(rendom);
       pass += str.charAt(rendom);
    }
    
    setPassword(pass);
    
  }, [length, charAllowed, numberAllowed])



  const copytexttoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect( ()=>{
    passgenerator()
  }, [length, charAllowed, numberAllowed])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          
      />
      <button
      
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      onClick={copytexttoClipboard}
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={100}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
            setNumberAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
                setCharAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>
</>
  )
}

export default App
