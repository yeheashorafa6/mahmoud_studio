export const INIT_DATA = {
  title: "",
  tag: "",
  audio: "",
};

export const AddAudioReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.payload.name]: action.payload.value };
    case "SET_AUDIO":
      return { ...state, audio: action.payload };
  }
};
