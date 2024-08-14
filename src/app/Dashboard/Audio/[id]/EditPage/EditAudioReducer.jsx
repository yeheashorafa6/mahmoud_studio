export const INIT_DATA = {
    title: "",
    tag: "",
    audio: "",
  };
  
  export const EditAudioReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "INIT_AUDIO":
        return { ...state, ...action.audioData };
      default:
        return state;
    }
  };
