import React,{useEffect,useState} from 'react'
import { API_BASE } from '../config'
import { getToken, clearToken } from '../auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Dashboard(){
  const [profile,setProfile]=useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    async function load(){
      try{
        const token = getToken()
        if(!token) return nav('/login')
        const res = await fetch(API_BASE + '/api/user/me', { headers: { Authorization: 'Bearer '+token } })
        const data = await res.json()
        if(!res.ok){ clearToken(); return nav('/login') }
        setProfile(data)
      }catch(e){ console.error(e); }
    }
    load()
  },[])

  if(!profile) return <div className="container"><div className="card">Loading...</div></div>

  return (
    <div className="container">
      <div className="card">
        <h3>Welcome, {profile.username}</h3>
        <div>IQ Points: <strong>{profile.iqPoints}</strong></div>
        <div>Games played: {profile.gamesPlayed} | wins: {profile.gamesWon}</div>
        <div className="row" style={{marginTop:12}}>
          <Link to="/game"><button className="col">Play Duel</button></Link>
          <button className="col" onClick={()=>{ clearToken(); nav('/login') }}>Logout</button>
        </div>
      </div>
    </div>
  )
}
