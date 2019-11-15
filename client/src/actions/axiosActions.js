import axios from "axios";
import { axiosWithAuth } from "../components/axiosWithAuth";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FETCH = "LOGIN_FETCH";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const DATA_LOADING = "DATA_LOADING";
export const DATA_FETCH = "DATA_FETCH";
export const DATA_FAILED = "DATA_FAILED";

export const COLOR_EDITE = "COLOR_EDITE ";

export const COLOR_DELETE = "COLOR_DELETE ";

export const loginAuth = values => dispatch => {
  dispatch({ type: LOGIN_LOADING });
  axios
    .post("http://localhost:5000/api/login", values)
    .then(respon => dispatch({ type: LOGIN_FETCH, payload: respon.data }));
};

export const fetchData = () => dispatch => {
  const authAxios = axiosWithAuth();

  dispatch({ type: DATA_LOADING });
  authAxios
    .get("http://localhost:5000/api/colors")
    .then(respon => dispatch({ type: DATA_FETCH, payload: respon.data }));
};

export const updateColor = color => dispatch => {
  const authAxios = axiosWithAuth();
  authAxios.put(`http://localhost:5000/api/colors/${color.id}`, color);
  // .then(dispatch({ type: COLOR_EDITE, payload: color }));
};

export const deleteColor = del => dispatch => {
  const authAxios = axiosWithAuth();

  authAxios.delete(`http://localhost:5000/api/colors/${del.id}`);
  // .then(dispatch({ type: COLOR_DELETE, payload: del }));
};
