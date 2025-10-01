export function setToken(token){ localStorage.setItem('md_token', token); }
export function getToken(){ return localStorage.getItem('md_token'); }
export function clearToken(){ localStorage.removeItem('md_token'); }
