import { usersAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  accessToken: JSON.parse(localStorage.getItem("accessToken")),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (user, accessToken) => ({
  type: SET_USER_DATA,
  payload: { user, accessToken },
});

export const getAuthUser = (email, password) => (dispatch) => {
  return usersAPI.login(email, password).then((response) => {
    let { user, accessToken } = response;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    dispatch(setAuthUserData(user, accessToken));
    window.location.reload(true);
  });
};

export const checkToken = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      window.localStorage.clear();
    }, expirationTime * 1000);
  };
};

export default authReducer;
