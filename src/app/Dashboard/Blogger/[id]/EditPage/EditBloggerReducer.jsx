export const INIT_DATA = {
    title: "",
    category: "",
    img: "",
    imgDetalis: "",
    desc: "",
    bloggerContent: "",
  };
  
  export function EditBloggerReducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'INIT_POST':
        return { ...state, ...action.post };
      default:
        return state;
    }
  }