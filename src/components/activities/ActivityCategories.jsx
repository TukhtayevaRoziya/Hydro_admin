import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "../../utils/utils";
import { getPhotos, getPhotosUpdate } from "../../redux/activities-reducer";
import { instance } from "./../../api/api";
import {
  getPhotosCreate,
  getPhotosDelete,
  getActivities,
} from "./../../redux/activities-reducer";

export const ActivityCategories = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.activityPage ? state.activityPage : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getActivities());
  }, [dispatch]);

  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    if (modalType === "create") {
      dispatch(
        getPhotosCreate({
          selectedImage,
          mainActivity: {
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            activityCategoryID: data.activityCategoryID
              ? parseInt(data.activityCategoryID)
              : 15,
          },
        })
      );
    } else {
      dispatch(
        getPhotosUpdate({
          id: imageId.id,
          selectedImage,
          selectedI,
          mainActivity: {
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            activityCategoryID: data.activityCategoryID
              ? parseInt(data.activityCategoryID)
              : 15,
          },
        })
      );
      instance
        .put(`mainActivitiesAPI/${imageId.mainActivity.id}`, {
          id: imageId.mainActivity.id,
          title_uz: data.title_uz,
          title_ru: data.title_ru,
          title_en: data.title_en,
          title_krl: data.title_krl,
          description_uz: data.description_uz,
          description_ru: data.description_ru,
          description_en: data.description_en,
          description_krl: data.description_krl,
          activityCategoryID: data.activityCategoryID
          ? parseInt(data.activityCategoryID)
          : 15,
          activityCategory: null,
          activityHeader: null,
          activityPhoto: null
        })
        .catch((err) => console.log(err));
    }

    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Kategoriya</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={onSubmit}
            initialValues={
              imageId && {
                title_uz: imageId && imageId.mainActivity.title_uz,
                title_ru: imageId && imageId.mainActivity.title_ru,
                title_en: imageId && imageId.mainActivity.title_en,
                title_krl: imageId && imageId.mainActivity.title_krl,
                description_uz: imageId && imageId.mainActivity.description_uz,
                description_ru: imageId && imageId.mainActivity.description_ru,
                description_en: imageId && imageId.mainActivity.description_en,
                description_krl:
                  imageId && imageId.mainActivity.description_krl,
                activityCategoryID: 15,
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
              if (!values.description_uz) {
                if (!values.description_uz) {
                  errors.description_uz = "Tavsif Uz manzili noto‘g‘ri";
                }
              }
              if (!values.description_ru) {
                if (!values.description_ru) {
                  errors.description_ru = "Tavsif Ru manzili noto‘g‘ri";
                }
              }
              if (!values.description_en) {
                if (!values.description_en) {
                  errors.description_en = "Tavsif En manzili noto‘g‘ri";
                }
              }
              if (!values.description_krl) {
                if (!values.description_krl) {
                  errors.description_krl = "Tavsif Krl manzili noto‘g‘ri";
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
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="activityCategoryID">
                    {({ input, meta }) => (
                      <div>
                        <label>Kategoriya</label>
                        <Input
                          type="select"
                          {...input}
                          name="activityCategoryID"
                          placeholder="Kategoriya"
                        >
                          <option value="15">Yakunlangan</option>
                          <option value="16">Jarayondagi</option>
                          <option value="17">Kelgusidagi</option>
                        </Input>
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="title_uz">
                    {({ input, meta }) => (
                      <div>
                        <label>Title Uz</label>
                        <Input type="text" {...input} placeholder="Title Uz" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="title_ru">
                    {({ input, meta }) => (
                      <div>
                        <label>Title Ru</label>
                        <Input type="text" {...input} placeholder="Title Ru" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="title_en">
                    {({ input, meta }) => (
                      <div>
                        <label>Title En</label>
                        <Input type="text" {...input} placeholder="Title En" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="title_krl">
                    {({ input, meta }) => (
                      <div>
                        <label>Title Krl</label>
                        <Input type="text" {...input} placeholder="Title Krl" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
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
                        <Input type="text" {...input} placeholder="Tavsif Uz" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
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
                        <Input type="text" {...input} placeholder="Tavsif Ru" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
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
                        <Input type="text" {...input} placeholder="Tavsif En" />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
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
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <Button type="submit" disabled={submitting} className="sendBtn">
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
            <th>Rasmsasas</th>
            <th>Nomi Uz</th>
            <th>Nomi Ru</th>
            <th>Nomi En</th>
            <th>Nomi Krl</th>
            <th>Tavsifi Uz</th>
            <th>Tavsifi Ru</th>
            <th>Tavsifi En</th>
            <th>Tavsifi Krl</th>
            <th>
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setModalType("create");
                }}
              >
                Qo`shish
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.photos &&
            images.photos.length > 0 &&
            images.photos.map((el, i) => {
              return (
                <tr key={el.id}>
                  {/* eslint-disable-next-line */}
                  <td scope="row">{i + 1}</td>
                  <td>
                    <div className="TdInDiv1">
                      <img
                        style={{ width: "30px" }}
                        src={el.photoLink}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <div className="TdInDiv1">{el.mainActivity.title_uz}</div>
                  </td>
                  <td>
                    <div className="TdInDiv1">{el.mainActivity.title_ru}</div>
                  </td>
                  <td>
                    <div className="TdInDiv1">{el.mainActivity.title_en}</div>
                  </td>
                  <td>
                    <div className="TdInDiv1">{el.mainActivity.title_krl}</div>
                  </td>
                  <td>
                    <div className="TdInDiv1">
                      {el.mainActivity.description_uz}
                    </div>
                  </td>
                  <td>
                    <div className="TdInDiv1">
                      {el.mainActivity.description_ru}/
                    </div>
                  </td>
                  <td>
                    <div className="TdInDiv1">
                      {el.mainActivity.description_en}
                    </div>
                  </td>
                  <td>
                    <div className="TdInDiv1">
                      {el.mainActivity.description_krl}
                    </div>
                  </td>
                  <td className="btn_delete_edit">
                    <Button
                      onClick={() => {
                        setImageId(el);
                        setModalOpen(true);
                        setModalType("update");
                      }}
                    >
                      <BorderColorIcon />
                    </Button>{" "}
                    <DeleteBtn
                      handleAdd={() => dispatch(getPhotosDelete(el.id))}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
