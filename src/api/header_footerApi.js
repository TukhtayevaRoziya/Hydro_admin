import { instance } from "./api";

export const header_footerAPI = {
  setHeaderFooter() {
    return instance.get(`aboutCompaniesAPI`).then(async (response) => {
      return await response.data;
    });
  },
  setHeaderFooterUpdate(data) {
    const {
      id,
      description_uz,
      description_ru,
      description_en,
      description_krl,
      phone,
      email,
      address,
      telegramLink,
      instagramLink,
      youtubeLink,
      faceBookLink,
      footerText,
      photoUrl,
      originalPath
    } = data;
    return instance
      .put(`aboutCompaniesAPI/5`, {
        id,
        description_uz,
        description_ru,
        description_en,
        description_krl,
        phone,
        email,
        address,
        telegramLink,
        instagramLink,
        youtubeLink,
        faceBookLink,
        footerText,
        photoUrl: photoUrl ? photoUrl : originalPath,
      })
      .then(async (response) => {
        return await response.data;
      });
  },
};
