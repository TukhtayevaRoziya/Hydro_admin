import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getMainPartners,
  getMainPartnersUpdate,
} from "../../redux/corporative-reducer";
import {
  getMainPartnersCreate,
  getMainPartnersDelete,
} from "./../../redux/corporative-reducer";
import { DeleteBtn } from "./../../utils/utils";

export const MainPartners = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.corporativePage ? state.corporativePage : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainPartners());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getMainPartnersCreate({
            selectedImage,
            name: data.name,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            urlLink: data.urlLink,
            partnersCategoryID: data.partnersCategoryID || 2,
          })
        )
      : dispatch(
          getMainPartnersUpdate({
            selectedImage,
            name: data.name,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            id: imageId.id,
            originalPath: imageId.photoUrl,
            selectedI,
            urlLink: data.urlLink,
            partnersCategoryID: data.partnersCategoryID,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    (images && images.partners && images.partners.length > 0 && (
      <div onClick={() => setSidebarOpen(false)}>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Hamkorlar</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  name: imageId && imageId.name,
                  description_uz: imageId && imageId.description_uz,
                  description_ru: imageId && imageId.description_ru,
                  description_en: imageId && imageId.description_en,
                  description_krl: imageId && imageId.description_krl,
                  urlLink: imageId && imageId.urlLink,
                  partnersCategoryID: imageId && imageId.partnersCategoryID,
                }
              }
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  if (!values.name) {
                    errors.name = "Nom manzili noto‘g‘ris";
                  }
                }
                if (!values.description_uz) {
                  errors.description_uz = "Tavsif Uz manzili noto‘g‘ri";
                }
                if (!values.description_ru) {
                  errors.description_ru = "Tavsif Ru manzili noto‘g‘ri";
                }
                if (!values.description_en) {
                  errors.description_en = "Tavsif En manzili noto‘g‘ri";
                }
                if (!values.description_krl) {
                  errors.description_krl = "Tavsif Krl manzili noto‘g‘ri";
                }
                if (!values.urlLink) {
                  errors.urlLink = "Url havola manzili noto‘g‘ri";
                }
                if (size <= 3145728) {
                  console.log(size);
                } else {
                  if (!values.image) {
                    errors.image = "Rasm hajmi katta";
                  }
                }
                return errors;
              }}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Field name="image">
                      {({ input, meta }) => (
                        <div>
                          <label>Rasm</label>
                          <Input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                              const formData = new FormData();
                              setSize(event.target.files[0].size);
                              formData.append(
                                "selectedFile",
                                event.target.files[0]
                              );
                              setSelectedImage(formData);
                              setSelectedI(true);
                            }}
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="partnersCategoryID">
                      {({ input, meta }) => (
                        <div>
                          <label>Hamkorlar</label>
                          <Input
                            type="select"
                            {...input}
                            name="2"
                            placeholder="Kategoriya"
                          >
                            <option value="2">Mahalliy</option>
                            <option value="3">Xalqaro</option>
                          </Input>
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="name">
                      {({ input, meta }) => (
                        <div>
                          <label>Nom</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Kompaniya nomi"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="description_uz">
                      {({ input, meta }) => (
                        <div>
                          <label>Tavsif Uz</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Tavsif Uz"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="description_ru">
                      {({ input, meta }) => (
                        <div>
                          <label>Tavsif Ru</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Tavsif Ru"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="description_en">
                      {({ input, meta }) => (
                        <div>
                          <label>Tavsif En</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Tavsif En"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="description_krl">
                      {({ input, meta }) => (
                        <div>
                          <label>Tavsif Krl</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Tavsif Krl"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="urlLink">
                      {({ input, meta }) => (
                        <div>
                          <label>Url havolasi</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Url havolasi"
                          />
                          {meta.error && meta.touched && (
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="sendBtn"
                  >
                    Jo'natish
                  </Button>
                </form>
              )}
            />
          </ModalBody>
        </Modal>
        <table hover className={"fl-table"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Rasmlar</th>
              <th>Name</th>
              <th>Tavsif Uz</th>
              <th>Tavsif Ru</th>
              <th>Tavsif En</th>
              <th>Tavsif Krl</th>
              <th>Url havola</th>
              <th>
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Yaratish
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.partners.length > 0 &&
              images.partners.map((el, i) => {
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
                    <td>
                      <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                    </td>

                    <td>
                      <div className="TdInDiv">{el.name}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.description_uz || "-----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.description_ru || "-----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.description_en || "-----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.description_krl || "-----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.urlLink || "-----"}</div>
                    </td>
                    <td className="btn_delete_edit">
                      <Button
                        onClick={() => {
                          setImageId(el);
                          setModalOpen(true);
                        }}
                      >
                        <BorderColorIcon />
                      </Button>{" "}
                      <DeleteBtn
                        handleAdd={() => dispatch(getMainPartnersDelete(el.id))}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )) || (
      <div className="dis">
        <div className="spinner"></div>
      </div>
    )
  );
};
