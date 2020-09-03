const initialState = {
  games :[],
  visible:false,
  liked:[],
  panier:[]
}

export default function (state = initialState ,action)
{
  switch(action.type)
  {
    case "GET_GAMES" :
    return {...state,games : action.payload}

    case "VISIBLE_MODAL":
    return {...state,visible:action.payload}

     case 'LIKED_MODAL':
   {
  return {...state,liked:action.payload}
   }
   case 'PANIER_MODAL':
 {
return {...state,panier:action.payload}
 }
    default :
    return state
  }

}
