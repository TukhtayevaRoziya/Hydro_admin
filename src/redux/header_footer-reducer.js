import { globalAPI } from "../api/api";
import { activitiesAPI } from "./../api/activitiesApi";
import { header_footerAPI } from './../api/header_footerApi';

// categories
const SET_HEADER_FOOTER = "/header_footer/SET_HEADER_FOOTER";
const REACT_APP_FILES_URL = process.env.REACT_APP_API_URL;

let initialState = {
  header: null,
};

export const headerFooterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_FOOTER:
      return {
        ...state,
        header: action.header,
      };
    default:
      return state;
  }
};

export const setHeaderFooterData = (header) => ({ type: SET_HEADER_FOOTER, header });

export const getHeaderFooter = () => (dispatch) => {
  return header_footerAPI.setHeaderFooter().then((res) => {
    dispatch(setHeaderFooterData(res));
  });
};

export const getHeaderFooterUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && 'https://api.hydro.softcity.uz/' + image.dbPath;
  data.photoUrl = path;

  return await header_footerAPI.setHeaderFooterUpdate(data).then((res) => {
    dispatch(getHeaderFooter());
  });
};