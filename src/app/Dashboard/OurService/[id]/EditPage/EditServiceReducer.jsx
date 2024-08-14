export const INIT_DATA = {
    category: "",
    desc: "",
    img: "",
  };
  
  export const EditServiceReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "INIT_SERVICE":
        return { ...state, ...action.service };
      default:
        return state;
    }
  };
  