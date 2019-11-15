import {
  LOGIN_LOADING,
  LOGIN_FETCH,
  LOGIN_FAILED,
  DATA_LOADING,
  DATA_FETCH,
  DATA_FAILED,
  COLOR_DELETE
} from "../actions/axiosActions";

const initiallstate = {
  data: [],
  isloading: false,
  error: null,
  token: null
};
export const rootReducer = (state = initiallstate, actions) => {
  switch (actions.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isloading: true,
        error: null
      };

    case LOGIN_FETCH:
      sessionStorage.setItem("token", actions.payload.payload);
      console.log(actions.payload);
      return {
        ...state,
        token: actions.payload.payload,
        isloading: false,
        error: null
      };
    case LOGIN_FAILED:
      return {
        data: [],
        isloading: false,
        error: actions.payload
      };

    case DATA_LOADING:
      return {
        ...state,
        isloading: true,
        error: null
      };

    case DATA_FETCH:
      console.log(actions.payload);
      return {
        ...state,
        data: actions.payload,
        isloading: false,
        error: null
      };
    case DATA_FAILED:
      return {
        data: [],
        isloading: false,
        error: actions.payload
      };
    case COLOR_DELETE:
      console.log(state.data.filter(item => item.id !== actions.payload.id));
      return {
        ...state
      };
    // data: state.data.filter(item => item.id !== actions.payload.id)

    default:
      return state;
  }
};
