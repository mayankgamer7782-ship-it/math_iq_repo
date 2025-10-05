import React,{useState} from 'react'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword(){
  const query = new URLSearchParams(window.location.search)
  const token = query.get('token')
  const id = query.get('id')
  const [password,setPassword]=useState('')
  const [status,setStatus]=useState('')

  async function submit(e){
    e.preventDefault()
    setStatus('submitting')
    const res = await fetch(API_BASE + '/api/auth/reset', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, token, password }) })
    if(res.ok) setStatus('ok'); else { const d=await res.json(); setStatus('error:'+ (d.error||'')) }
  }

  if(!token || !id) return <div className="container"><div className="card">Invalid reset link.</div></div>

  return (
    <div className="container">
      <div className="card">
        <h3>Choose new password</h3>
        <form onSubmit={submit}>
          <input placeholder="new password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit">Set password</button>
        </form>
        {status==='ok' && <div className="small">Password updated. You may login.</div>}
        {status.startsWith('error') && <div className="small" style={{color:'crimson'}}>Error: {status}</div>}
      </div>
    </div>
  )
}
