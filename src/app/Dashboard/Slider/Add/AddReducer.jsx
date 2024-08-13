export const INIT_DATA = {
    title : "",
    img : "",
    imgMobile : ""
}


export const AddReducer = (state,action)=>{
    switch(action.type){
        case "SET_DATA" :
        return {...state , [action.payload.name] : action.payload.value}
    }
}