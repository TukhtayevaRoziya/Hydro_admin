import { instance } from "./api";

export const aboutAPI = {
  // header
  setAboutHeader() {
    return instance.get(`aboutHeadersAPI`).then(async (response) => {
      return await response.data;
    });
  },
  setCreateAboutHeader(data) {
    const { title_uz, title_ru, title_en, title_krl, photoUrl } = data;
    return instance
      .post(`aboutHeadersAPI`, {
        title_uz,
        title_ru,
        title_en,
        title_krl,
        photoUrl,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
  setUpdateAboutHeader(data) {
    const {
      id,
      title_uz,
      title_ru,
      title_en,
      title_krl,
      photoUrl,
      originalPath,
    } = data;
    return instance
      .put(`aboutHeadersAPI/1`, {
        id,
        title_uz,
        title_ru,
        title_en,
        title_krl,
        photoUrl: photoUrl ? photoUrl : originalPath,
      })
      .then(async (response) => {
        return await response.data;
      });
  },

  // organization history

  setAboutOrganizationHistory() {
    return instance.get(`aboutPhotoesAPI`).then(async (response) => {
      return await response.data;
    });
  },
  setCreateOrganizationHistory(data) {
    const { photoUrl } = data;
    return instance
      .post(`aboutPhotoesAPI`, { photoUrl })
      .then(async (response) => {
        return await response.data;
      });
  },
  setUpdateOrganizationHistory(data) {
    const { id, photoUrl, originalPath } = data;
    return instance
      .put(`aboutPhotoesAPI/${id}`, {
        id,
        photoUrl: photoUrl ? photoUrl : originalPath,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
  setOrganizationHistoryDelete(id) {
    return instance.delete(`aboutPhotoesAPI/${id}`).then(async (response) => {
      return await response.data;
    });
  },

  // meeting

  setMeeting() {
    return instance.get(`aboutPanel6API`).then(async (response) => {
      return await response.data;
    });
  },
  setMeetingCreate(data) {
    const {
      title_uz,
      title_ru,
      title_en,
      title_krl,
      description_uz,
      description_ru,
      description_en,
      description_krl,
      photoUrl,
    } = data;
    return instance
      .post(`aboutPanel6API`, {
        title_uz,
        title_ru,
        title_en,
        title_krl,
        description_uz,
        description_ru,
        description_en,
        description_krl,
        photoUrl,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
  setMeetingUpdate(data) {
    const {
      id,
      title_uz,
      title_ru,
      title_en,
      title_krl,
      description_uz,
      description_ru,
      description_en,
      description_krl,
      photoUrl,
      originalPath,
    } = data;
    return instance
      .put(`aboutPanel6API/${id}`, {
        id,
        title_uz,
        title_ru,
        title_en,
        title_krl,
        description_uz,
        description_ru,
        description_en,
        description_krl,
        photoUrl: photoUrl ? photoUrl : originalPath,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
  setMeetingDelete(id) {
    return instance.delete(`aboutPanel6API/${id}`).then(async (response) => {
      return await response.data;
    });
  },
  // team members
  setTeamMembers() {
    return instance.get(`mainStaffsAPI`).then(async (response) => {
      return await response.data;
    });
  },

  setTeamMembersCreate(data) {
    return instance
      .post(`mainStaffsAPI`, { ...data })
      .then(async (response) => {
        return await response.data;
      });
      },
  setTeamMembersUpdate(data) {
    return instance
      .put(`mainStaffsAPI/${data.id}`, { ...data })
      .then(async (response) => {
        return await response.data;
      });
  },
  setTeamMembersDelete(id) {
    return instance.delete(`mainStaffsAPI/${id}`).then(async (response) => {
      return await response.data;
    });
  },
  
  // about company

  setAboutCompany() {
    return instance.get(`aboutPanel5API`).then(async (response) => {
      return await response.data;
    });
  },
  setAboutCompanyCreate(data) {
    const {
      title_uz,
      title_ru,
      title_en,
      title_krl,
      photoUrl1,
      photoUrl2,
      photoUrl3,
      photoUrl4,
      description_uz,
      description_ru,
      description_en,
      description_krl,
      amount1Discript,
      amount2Discript,
      amount3Discript,
      amount4Discript,
      amount1,
      amount2,
      amount3,
      amout4,
    } = data;
    return instance
      .post(`aboutPanel5API`, {
        title_uz,
        title_ru,
        title_en,
        title_krl,
        photoUrl1,
        photoUrl2,
        photoUrl3,
        photoUrl4,
        description_uz,
        description_ru,
        description_en,
        description_krl,
        amount1Discript,
        amount2Discript,
        amount3Discript,
        amount4Discript,
        amount1,
        amount2,
        amount3,
        amout4,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
  setAboutCompanyUpdate(data) {
    const {
      id,
      title_uz,
      title_ru,
      title_en,
      title_krl,
      photoUrl,
      originalPath1,
      photoUrl2,
      originalPath2,
      photoUrl3,
      originalPath3,
      photoUrl4,
      originalPath4,
      description_uz,
      description_ru,
      description_en,
      description_krl,
      amount1Discript,
      amount2Discript,
      amount3Discript,
      amount4Discript,
      amount1,
      amount2,
      amount3,
      amount4,
    } = data;
    return instance
      .put(`aboutPanel5API/1`, {
        id,
        title_uz,
        title_ru,
        title_en,
        title_krl,
        photoUrl1: photoUrl ? photoUrl : originalPath1,
        photoUrl2: photoUrl2 ? photoUrl2 : originalPath2,
        photoUrl3: photoUrl3 ? photoUrl3 : originalPath3,
        photoUrl4: photoUrl4 ? photoUrl4 : originalPath4,
        description_uz,
        description_ru,
        description_en,
        description_krl,
        amount1Discript,
        amount2Discript,
        amount3Discript,
        amount4Discript,
        amount1,
        amount2,
        amount3,
        amount4,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
};
