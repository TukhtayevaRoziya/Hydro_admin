import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getEconomicImages,
  geEconomicImageCreate,
  getEconomicDelete,
  getEconomicUpdate,
} from "./../../redux/economic-reducer";
import { DeleteBtn } from "./../../utils/utils";

export const Economic = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.economicPage ? state.economicPage : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEconomicImages());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          geEconomicImageCreate({
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
          })
        )
      : dispatch(
          getEconomicUpdate({
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            id: imageId.id,
            originalPath: imageId.photoUrl,
            selectedI,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    (images && images.images && images.images.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Shartnomalar</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  title_uz: imageId && imageId.title_uz,
                  title_ru: imageId && imageId.title_ru,
                  title_en: imageId && imageId.title_en,
                  title_krl: imageId && imageId.title_krl,
                }
              }
              validate={(values) => {
                const errors = {};
                if (!values.title_uz) {
                  if (!values.title_uz) {
                    errors.title_uz = "Sarlavha Uz manzili noto‘g‘ri";
                  }
                }
                if (!values.title_ru) {
                  if (!values.title_ru) {
                    errors.title_ru = "Sarlavha Ru manzili noto‘g‘ri";
                  }
                }
                if (!values.title_en) {
                  if (!values.title_en) {
                    errors.title_en = "Sarlavha En manzili noto‘g‘ri";
                  }
                }
                if (!values.title_krl) {
                  if (!values.title_krl) {
                    errors.title_krl = "Sarlavha Krl manzili noto‘g‘ri";
                  }
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
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Field name="image">
                      {({ meta }) => (
                        <div>
                          <label>Rasm</label>
                          <Input
                            type="file"
                            name="myEconomicImage"
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
                    <Field name="title_uz">
                      {({ input, meta }) => (
                        <div>
                          <label>Sarlavha Uz</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Sarlavha Uz"
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
                    <Field name="title_ru">
                      {({ input, meta }) => (
                        <div>
                          <label>Sarlavha Ru</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Sarlavha Ru"
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
                    <Field name="title_en">
                      {({ input, meta }) => (
                        <div>
                          <label>Sarlavha En</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Sarlavha En"
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
                    <Field name="title_krl">
                      {({ input, meta }) => (
                        <div>
                          <label>Sarlavha Krl</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Sarlavha Krl"
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
              <th>Sarlavha Uz</th>
              <th>Sarlavha Ru</th>
              <th>Sarlavha En</th>
              <th>Sarlavha Krl</th>
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
              images.images.length > 0 &&
              images.images.map((el, i) => {
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
                    <td>
                      <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                    </td>

                    <td>
                      <div className="TdInDiv">{el.title_uz}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.title_ru}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.title_en}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.title_krl}</div>
                    </td>
                    <td className="btn_delete_edit">
                      <Button
                        onClick={() => {
                          setImageId(el);
                          setModalOpen(true);
                        }}
                      >
                        <BorderColorIcon />
                      </Button>
                      <DeleteBtn
                        handleAdd={() => dispatch(getEconomicDelete(el.id))}
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
