import { globalAPI } from "../api/api";
import { corporativeAPI } from "../api/corporativeApi";
const SET_CORPORATIVE_HEADER = "/corporative/SET_CORPORATIVE_HEADER";
const SET_HEADER_DELETE = "/corporative/SET_HEADER_DELETE";
const SET_CORPORATIVE_PARTNERS = "/corporative/SET_CORPORATIVE_PARTNERS";
const SET_CORPORATIVE_PARTNERS_DELETE =
  "/corporative/SET_CORPORATIVE_PARTNERS_DELETE";
const REACT_APP_FILES_URL = process.env.REACT_APP_FILES_URL;

let initialState = {
  header: null,
  partners: null,
};

export const corporativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CORPORATIVE_HEADER:
      return {
        ...state,
        header: action.header,
      };
    case SET_HEADER_DELETE:
      let header = [...state.header];
      header = header.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
        return null;
      });
      return {
        ...state,
        header
      };
    case SET_CORPORATIVE_PARTNERS:
      return {
        ...state,
        partners: action.partners,
      };
    case SET_CORPORATIVE_PARTNERS_DELETE:
      let partners = [...state.partners];
      partners = partners.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
        return null;
      });
      return {
        ...state,
        partners,
      };
    default:
      return state;
  }
};

export const setCorporativeHeaderData = (header) => ({
  type: SET_CORPORATIVE_HEADER,
  header,
});
export const setHeaderDeleteAC = (id) => ({
  type: SET_HEADER_DELETE,
  id,
});

export const setCorporativePartnersData = (partners) => ({
  type: SET_CORPORATIVE_PARTNERS,
  partners,
});
export const setCorporativeHeaderDelete = (id) => ({
  type: SET_CORPORATIVE_PARTNERS_DELETE,
  id,
});

export const getCorporativeHeader = () => (dispatch) => {
  return corporativeAPI.setHeader().then((res) => {
    dispatch(setCorporativeHeaderData(res));
  });
};
export const getCorporativeHeaderCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await corporativeAPI.setHeaderCreate(data).then((res) => {
    dispatch(getCorporativeHeader());
  });
};
export const getCorporativeHeaderUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await corporativeAPI.setHeaderUpdate(data).then((res) => {
    dispatch(getCorporativeHeader());
  });
};

export const getHeaderDelete = (id) => (dispatch) => {
  return corporativeAPI.setHeaderDelete(id).then((response) => {
    dispatch(getCorporativeHeader());
    dispatch(setHeaderDeleteAC(id));
  });
};

// main partners

export const getMainPartners = () => (dispatch) => {
  return corporativeAPI.setMainPartners().then((response) => {
    dispatch(setCorporativePartnersData(response));
  });
};
export const getMainPartnersCreate = (data) => async (dispatch) => {
  let image = await globalAPI
    .uploadImage(data.selectedImage)
    .then((response) => {
      return response;
    });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await corporativeAPI.setMainPartnersCreate(data).then((response) => {
    dispatch(getMainPartners());
  });
};
export const getMainPartnersUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((response) => {
      return response;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await corporativeAPI.setMainPartnersUpdate(data).then((response) => {
    dispatch(getMainPartners());
  });
};
export const getMainPartnersDelete = (id) => (dispatch) => {
  return corporativeAPI.setMainPartnersDelete(id).then((response) => {
    dispatch(getMainPartners());
    dispatch(setCorporativeHeaderDelete(id));
  });
};
