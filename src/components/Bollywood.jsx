import React,{useState} from 'react'

export default function Bollywood() {

  const [a,b] = useState(true)


  return (
    <div className='mt-2'>
      {a}
      

      <div>
      <button onClick={()=>b(!a)} className='bg-blue-500 px-2 py-1 rounded-md'>
        click
      </button>
      {a ? "Hide" : "Show"}
      </div>
    </div>
  )
}
