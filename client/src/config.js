export const API_BASE = (function(){
  // TODO: set your backend URL here (Render service)
  // e.g. return "https://math-duel-server.onrender.com";
  return process.env.REACT_APP_API_BASE || "http://localhost:3000";
})();
