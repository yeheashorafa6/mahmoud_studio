export const INIT_DATA = {
  category: "",
  desc: "",
  img: "",
};

export const AddServiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.payload.name]: action.payload.value };
    case "SET_IMAGE":
      return { ...state, img: action.payload };
    default:
      return state;
  }
};
