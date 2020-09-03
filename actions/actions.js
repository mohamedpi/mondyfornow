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

export  const  setLiked = (payload) =>{
return {  type :"LIKED_MODAL",
  payload
}
}

export  const  setPanier= (payload) =>{
return {  type :"PANIER_MODAL",
  payload
}
}
