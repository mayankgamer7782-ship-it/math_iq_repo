import React, {useState} from 'react'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  const nav=useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await fetch(API_BASE + '/api/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username,email,password })})
      const data = await res.json()
      if(!res.ok) return setMsg(data.error||'Registration failed')
      setMsg('Registered! Please login.')
      setTimeout(()=>nav('/login'),1000)
    }catch(err){ setMsg('Network error') }
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Register</h3>
        <form onSubmit={submit}>
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        {msg && <div className="small">{msg}</div>}
      </div>
    </div>
  )
}
