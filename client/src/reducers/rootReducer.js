import {
  LOGIN_LOADING,
  LOGIN_FETCH,
  LOGIN_FAILED,
  DATA_LOADING,
  DATA_FETCH,
  DATA_FAILED,
  COLOR_EDITE,
  COLOR_DELETE
} from "../actions/axiosActions";

const initiallstate = {
  data: [],
  isloading: false,
  error: null,
  token: null
};
export const rootReducer = (state = initiallstate, actions) => {
  console.log(state);
  switch (actions.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isloading: true,
        error: null
      };

    case LOGIN_FETCH:
      sessionStorage.setItem("token", actions.payload.payload);

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
      console.log(state);
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

    default:
      return state;
  }
};
