export const INIT_DATA = {
    title: "",
    img: "",
    imgMobile: "",
  };
  
  export const EditSliderReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "INIT_SLIDE":
        return { ...state, ...action.initialData };
      default:
        return state;
    }
  };
