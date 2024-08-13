export const INIT_DATA = {
  title: "",
  category: "",
  desc: "",
  imageUrl: "",
};

export const AddReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.payload.name]: action.payload.value };
    case "SET_IMAGE_URL":
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};
