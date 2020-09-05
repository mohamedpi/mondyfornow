import React from "react"


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
