const initialState = {

  visible:false,
  liked:[],

}

export default function (state = initialState ,action)
{
  switch(action.type)
  {


    case "VISIBLE_MODAL":
    return {...state,visible:action.payload}

     case 'LIKED_MODAL':
   {
  return {...state,liked:action.payload}
   }
    default :
    return state
  }

}
