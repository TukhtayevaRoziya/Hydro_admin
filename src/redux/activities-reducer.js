import { globalAPI } from "../api/api";
import { activitiesAPI } from "./../api/activitiesApi";
const SET_ACTIVITIES = "/activities/SET_ACTIVITIES";
//categories unnecessary
const SET_CATEGORIES = "/activities/SET_CATEGORIES";
const SET_CATEGORIES_DELETE = "/activities/SET_CATEGORIES_DELETE";
// categories
const SET_PHOTOS = "/activities/SET_PHOTOS";
const SET_PHOTOS_DELETE = "/activities/SET_PHOTOS_DELETE";
const REACT_APP_FILES_URL = process.env.REACT_APP_FILES_URL;

let initialState = {
  header: null,
  categories: null,
  photos: null,
};

export const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        header: action.header,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_CATEGORIES_DELETE:
      let categories = [...state.categories];
      // eslint-disable-next-line
      categories = categories.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
      });
      break;
    case SET_PHOTOS:
      return {
        ...state,
        photos: action.photos,
      };
    case SET_PHOTOS_DELETE:
      let photos = [...state.photos];
      // eslint-disable-next-line
      photos = photos.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
      });
      return {
        ...state,
        photos,
      };
    default:
      return state;
  }
};

export const setActivitiesData = (header) => ({ type: SET_ACTIVITIES, header });

// categories unnecessary

export const setActivitiesCategoriesData = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});
export const setActivitiesCategoriesDeleteAC = (id) => ({
  type: SET_CATEGORIES_DELETE,
  id,
});

// categories

export const setPhotosData = (photos) => ({
  type: SET_PHOTOS,
  photos,
});
export const setPhotosDeleteAC = (id) => ({
  type: SET_PHOTOS_DELETE,
  id,
});

export const getActivities = () => (dispatch) => {
  return activitiesAPI.setactivities().then((res) => {
    dispatch(setActivitiesData(res));
  });
};
export const getActivitiesCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await activitiesAPI.setActivitiesCreate(data).then((res) => {
    dispatch(setActivitiesData());
  });
};
export const getActivitiesUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI
      .uploadImage(data.selectedImage)
      .then((res) => {
        return res;
      }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await activitiesAPI
    .setActivitiesUpdate(data)
    .then((res) => {
      dispatch(getActivities());
    });
};

// categories unnecessary

export const getActivitiesCategories = () => (dispatch) => {
  return activitiesAPI.setCategories().then((response) => {
    dispatch(setActivitiesCategoriesData(response));
  });
};
export const getActivitiesCategoriesCreate = (data) => async (dispatch) => {
  return await activitiesAPI.setCategoriesCreate(data).then((response) => {
    dispatch(getActivitiesCategories());
  });
};
export const getActivitiesCategoriesUpdate = (data) => async (dispatch) => {
  return await activitiesAPI.setCategoriesUpdate(data).then((response) => {
    dispatch(getActivitiesCategories());
  });
};
export const getActivitiesCategoriesDelete = (id) => (dispatch) => {
  return activitiesAPI.setCategoriesDelete(id).then((response) => {
    dispatch(getActivitiesCategories());
    dispatch(setActivitiesCategoriesDeleteAC(id));
  });
};

// categories

export const getPhotos = () => (dispatch) => {
  return activitiesAPI.setPhotos().then((response) => {
    dispatch(setPhotosData(response));
  });
};
export const getPhotosCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoLink = path;
  return await activitiesAPI.setPhotosCreate(data).then((response) => {
    dispatch(getPhotos());
  });
};
export const getPhotosUpdate = (data) => async (dispatch) => {
  const req = {};
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  req.photoLink = path || data.photoLink;
  req.id = data.id;
  req.activityID = data.id;
  const {
    title_uz,
    title_ru,
    title_en,
    title_krl,
    description_uz,
    description_ru,
    description_en,
    description_krl,
    activityCategoryID,
  } = data;
  req.mainActivity = {
    id: data.id,
    title_uz,
    title_ru,
    title_en,
    title_krl,
    description_uz,
    description_ru,
    description_en,
    description_krl,
    activityCategoryID,
    activityCategory: {
      id: activityCategoryID,
      mainActivity: [],
      activityHeader: [],
    },
    activityPhoto: [],
  };
  return await activitiesAPI.setPhotosUpdate(req).then((response) => {
    dispatch(getPhotos());
  });
};
export const getPhotosDelete = (id) => (dispatch) => {
  return activitiesAPI.setPhotosDelete(id).then((response) => {
    dispatch(getPhotos());
    dispatch(setPhotosDeleteAC(id));
  });
};
