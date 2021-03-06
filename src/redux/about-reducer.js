import { globalAPI } from "../api/api";
import { aboutAPI } from "./../api/aboutApi";
const SET_ABOUT_API_DATA = "/about/SET_ABOUT_API_DATA";
const SET_ABOUT_COMPANY_DATA = "/about/SET_ABOUT_COMPANY_DATA";
const SET_ABOUT_MEETING_DATA = "/about/SET_ABOUT_MEETING_DATA";
const SET_ABOUT_MEETING_DELETE = "/about/SET_ABOUT_MEETING_DELETE";
const SET_ABOUT_ORGANIZATION_HISTORY_DATA =
  "/about/SET_ABOUT_ORGANIZATION_HISTORY_DATA";
const SET_ABOUT_ORGANIZATION_HISTORY_DELETE =
  "/about/SET_ABOUT_ORGANIZATION_HISTORY_DELETE";

const SET_ABOUT_TEAM_MEMBERS_DATA = "/about/SET_ABOUT_TEAM_MEMBERS_DATA";
const SET_ABOUT_TEAM_MEMBERS_DELETE = "/about/SET_ABOUT_TEAM_MEMBERS_DELETE";
const REACT_APP_FILES_URL = process.env.REACT_APP_FILES_URL;

let initialState = {
  aboutData: null,
  organizationHistoryData: null,
  meeting: null,
  team: null,
  company: null,
};

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ABOUT_API_DATA:
      return {
        ...state,
        aboutData: action.aboutData,
      };
    case SET_ABOUT_ORGANIZATION_HISTORY_DATA:
      return {
        ...state,
        organizationHistoryData: action.organizationHistoryData,
      };
    case SET_ABOUT_ORGANIZATION_HISTORY_DELETE:
      let organizationHistoryData = [...state.organizationHistoryData];
      // eslint-disable-next-line
      organizationHistoryData = organizationHistoryData.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
      });
      break;

    case SET_ABOUT_MEETING_DATA:
      return {
        ...state,
        meeting: action.meeting,
      };
    case SET_ABOUT_MEETING_DELETE:
      let meeting = [...state.meeting];
      // eslint-disable-next-line
      meeting = meeting.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
        return state;
      });
      break;

    case SET_ABOUT_TEAM_MEMBERS_DATA:
      return {
        ...state,
        team: action.team,
      };
    case SET_ABOUT_TEAM_MEMBERS_DELETE:
      let team = [...state.team];
      // eslint-disable-next-line
      team = team.filter((el) => {
        if (el.id !== action.id) {
          return el;
        }
        return state;
      });
      break;
    case SET_ABOUT_COMPANY_DATA:
      return {
        ...state,
        company: action.company,
      };
    default:
      return state;
  }
};

// action creator

// header

export const setAboutHeaderData = (aboutData) => ({
  type: SET_ABOUT_API_DATA,
  aboutData,
});

// about company

export const setAboutCompanyData = (company) => ({
  type: SET_ABOUT_COMPANY_DATA,
  company,
});

// organization history

export const setAboutOrganizationHistoryData = (organizationHistoryData) => ({
  type: SET_ABOUT_ORGANIZATION_HISTORY_DATA,
  organizationHistoryData,
});
export const setAboutOrganizationHistoryDelete = (id) => ({
  type: SET_ABOUT_ORGANIZATION_HISTORY_DELETE,
  id,
});

// meeting

export const setAboutMeetingData = (meeting) => ({
  type: SET_ABOUT_MEETING_DATA,
  meeting,
});
export const setAboutMeetingDelete = (id) => ({
  type: SET_ABOUT_MEETING_DELETE,
  id,
});

// team members

export const setAboutTeamMembersData = (team) => ({
  type: SET_ABOUT_TEAM_MEMBERS_DATA,
  team,
});
export const setAboutTeamMembarsDelete = (id) => ({
  type: SET_ABOUT_TEAM_MEMBERS_DELETE,
  id,
});

// thunk

// header
export const getAboutHeader = () => (dispatch) => {
  return aboutAPI.setAboutHeader().then((res) => {
    dispatch(setAboutHeaderData(res));
  });
};
export const getAboutHeaderCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setCreateAboutHeader(data).then((res) => {
    dispatch(getAboutHeader());
  });
};
export const getAboutHeaderUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setUpdateAboutHeader(data).then((res) => {
    dispatch(getAboutHeader());
  });
};

// organization history

export const getAboutOrganizationHistory = () => (dispatch) => {
  return aboutAPI.setAboutOrganizationHistory().then((res) => {
    dispatch(setAboutOrganizationHistoryData(res));
  });
};

export const getAboutOrganizationHistoryCreate = (data) => async (dispatch) => {
  // console.log(data.selectedImage());
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;


  return await aboutAPI.setCreateOrganizationHistory(data).then((res) => {
    dispatch(getAboutOrganizationHistory());
  });
};

export const getAboutOrganizationHistoryUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setUpdateOrganizationHistory(data).then((res) => {
    dispatch(getAboutOrganizationHistory());
  });
};

export const getAboutOrganizationHistoryDelete = (id) => (dispatch) => {
  return aboutAPI.setOrganizationHistoryDelete(id).then((res) => {
    dispatch(getAboutOrganizationHistory());
    dispatch(setAboutOrganizationHistoryDelete(id));
  });
};

// meeting

export const getAboutMeeting = () => (dispatch) => {
  return aboutAPI.setMeeting().then((res) => {
    dispatch(setAboutMeetingData(res));
  });
};

export const getAboutMeetingCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setMeetingCreate(data).then((res) => {
    dispatch(getAboutMeeting());
  });
};

export const getAboutMeetingUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setMeetingUpdate(data).then((res) => {
    dispatch(getAboutMeeting());
  });
};

export const getAboutMeetingDelete = (id) => (dispatch) => {
  return aboutAPI.setMeetingDelete(id).then((res) => {
    dispatch(getAboutMeeting());
    dispatch(setAboutMeetingDelete(id));
  });
};

// team members

export const getAboutTeamMembars = () => (dispatch) => {
  return aboutAPI.setTeamMembers().then((res) => {
    dispatch(setAboutTeamMembersData(res));
  });
};

export const getAboutTeamMembersCreate = (data) => async (dispatch) => {
  if (data.selectedImage) {
    let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    });

    let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
    data.photoUrl = path;
  }
  delete data.selectedImage;
  return await aboutAPI.setTeamMembersCreate(data).then((res) => {
    dispatch(getAboutTeamMembars());
  });
};

export const getAboutTeamMembersUpdate = (data) => async (dispatch) => {
  if (data.selectedImage) {
    let image =
      data.selectedI &&
      (await globalAPI.uploadImage(data.selectedImage).then((res) => {
        return res;
      }));

    let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
    data.photoUrl = path || data.photoUrl;
  }
  delete data.selectedImage;
  delete data.selectedI;

  return await aboutAPI.setTeamMembersUpdate(data).then((res) => {
    dispatch(getAboutTeamMembars());
  });
};

export const getAboutTeamMembersDelete = (id) => (dispatch) => {
  return aboutAPI.setTeamMembersDelete(id).then((res) => {
    dispatch(getAboutTeamMembars());
    dispatch(setAboutTeamMembarsDelete(id));
  });
};

// about company

export const getAboutCompany = () => (dispatch) => {
  return aboutAPI.setAboutCompany().then((res) => {
    dispatch(setAboutCompanyData(res));
  });
};
export const getAboutCompanyCreate = (data) => async (dispatch) => {
  let image = await globalAPI.uploadImage(data.selectedImage).then((res) => {
    return res;
  });

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setAboutCompanyCreate(data).then((res) => {
    dispatch(getAboutCompany());
  });
};
export const getAboutCompanyUpdate = (data) => async (dispatch) => {
  let image =
    data.selectedI &&
    (await globalAPI.uploadImage(data.selectedImage).then((res) => {
      return res;
    }));

  let path = image.dbPath && REACT_APP_FILES_URL + image.dbPath;
  data.photoUrl = path;

  return await aboutAPI.setAboutCompanyUpdate(data).then((res) => {
    dispatch(getAboutCompany());
  });
};
