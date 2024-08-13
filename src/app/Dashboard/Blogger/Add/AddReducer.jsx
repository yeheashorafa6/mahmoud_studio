export const INIT_STATE = {
    title: "",
    category: "",
    desc: "",
    bloggerContent: "",
    img: "",
    imgDetalis: "",
  };
  
  export const AddReducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return {
          ...state,
          [action.payload.name]: action.payload.value
        };
      default:
        return state;
    }
  };