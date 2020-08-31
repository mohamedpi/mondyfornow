const initialState = {
  games :[],
  visible:false
}

export default function (state = initialState ,action)
{
  switch(action.type)
  {
    case "GET_GAMES" :
    return {...state,games : action.payload}
    case "VISIBLE_MODAL":
    return {...state,visible:action.payload}

    default :
    return state
  }

}
