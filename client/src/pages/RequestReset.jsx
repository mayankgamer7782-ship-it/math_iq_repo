import React,{useState} from 'react'
import { API_BASE } from '../config'

export default function RequestReset(){
  const [email,setEmail]=useState('')
  const [status,setStatus]=useState('')

  async function submit(e){
    e.preventDefault()
    setStatus('sending')
    const res = await fetch(API_BASE + '/api/auth/forgot', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) })
    if(res.ok) setStatus('sent'); else setStatus('error');
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Request password reset</h3>
        <form onSubmit={submit}>
          <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button type="submit">Send reset link</button>
        </form>
        {status==='sent' && <div className="small">Check your email (spam box too).</div>}
      </div>
    </div>
  )
}
