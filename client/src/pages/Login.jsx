import React, {useState} from 'react'
import { API_BASE } from '../config'
import { setToken } from '../auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setErr('')
    try{
      const res = await fetch(API_BASE + '/api/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password })})
      const data = await res.json()
      if(!res.ok) return setErr(data.error||'Login failed')
      setToken(data.token)
      nav('/dashboard')
    }catch(err){ setErr('Network error') }
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Login</h3>
        <form onSubmit={submit}>
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {err && <div className="small" style={{color:'crimson'}}>{err}</div>}
        <div className="small"><a href="/request-reset">Forgot password?</a></div>
      </div>
    </div>
  )
}
