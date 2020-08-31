import React from "react"

export  const  getGames = (payload) =>{
return {  type :"GET_GAMES",
  payload
}
}

export  const  setVisibility = (payload) =>{
return {  type :"VISIBLE_MODAL",
  payload
}
}
