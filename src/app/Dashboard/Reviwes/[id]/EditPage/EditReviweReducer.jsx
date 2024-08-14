export const INIT_DATA = {
    username: "",
    job: "",
    desc: "",
    img: "",
  };

  export const EditReviweReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "INIT_REVIWE":
        return { ...state, ...action.reviwes };
      default:
        return state;
    }
  };
  