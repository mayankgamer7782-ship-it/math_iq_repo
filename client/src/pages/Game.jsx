import React,{useState,useEffect} from 'react'
import { API_BASE } from '../config'
import { getToken } from '../auth'
import { useNavigate } from 'react-router-dom'

// Simple local duel that also can POST result to backend
export default function Game(){
  const [q,setQ]=useState({text:'',answer:0})
  const [val,setVal]=useState('')
  const [correct,setCorrect]=useState(0)
  const [target] = useState(10)
  const nav = useNavigate()

  useEffect(()=>{ next() },[])

  async function next(){
    // ask backend for a question
    try{
      const token = getToken()
      const res = await fetch(API_BASE + '/api/game/question', { headers: token ? { Authorization: 'Bearer '+token } : {} })
      if(res.ok){ const d = await res.json(); setQ(d); return; }
    }catch(e){}
    // fallback local question
    setQ({text:'2+2=?', answer:4})
  }

  async function submit(e){
    e.preventDefault()
    if(Number(val)===q.answer) setCorrect(c=>c+1)
    setVal('')
    if(correct+1>=target){
      // post result to backend
      try{
        const token = getToken()
        await fetch(API_BASE + '/api/game/result',{method:'POST', headers:{'Content-Type':'application/json', ...(token?{Authorization:'Bearer '+token}: {})}, body: JSON.stringify({ result: 'win', correct: target })})
      }catch(e){}
      alert('You finished the duel!')
      nav('/dashboard')
      return
    }
    next()
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Math Duel</h3>
        <div>{q.text}</div>
        <form onSubmit={submit}>
          <input value={val} onChange={e=>setVal(e.target.value)} placeholder="answer" />
          <button type="submit">Submit</button>
        </form>
        <div className="small">Correct: {correct} / {target}</div>
      </div>
    </div>
  )
}
