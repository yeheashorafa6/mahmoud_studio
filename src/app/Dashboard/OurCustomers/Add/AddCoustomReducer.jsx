export const INIT_DATA = {
    title : "",
    link : "",
    img : "",
}

export const AddCoustomReducer = (state,action)=>{
    switch(action.type){
        case "SET_DATA" : 
        return {...state , [action.payload.name] : action.payload.value}
        case "SET_IMAGE":
            return {...state, img : action.payload}
        default :
        return state;
    }
}