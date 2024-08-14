export const INIT_DATA = {
    title: "",
    category: "",
    desc: "",
    img: "",
  };
  export function EditLatestProjectsReducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'INIT_Project':
        return { ...state, ...action.project };
      default:
        return state;
    }
  }