export const INIT_DATA = {
    title: "",
    category: "",
    desc: "",
    imageUrl: "",
  };
  export function EditProjectsRuducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'INIT_Project':
        return { ...state, ...action.project };
      default:
        return state;
    }
  }