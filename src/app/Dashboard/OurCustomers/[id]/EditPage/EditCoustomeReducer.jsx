export const INIT_DATA = {
    title : "",
    link : "",
    img : "",
}

export const EditCoustomeReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "INIT_COUSTOME":
        return { ...state, ...action.coustomeData };
      default:
        return state;
    }
  };
  