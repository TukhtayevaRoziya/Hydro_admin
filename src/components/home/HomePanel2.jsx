import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import {
  getHomePanel2Delete,
  getHomePanel2Data,
  getHomePanel2Update,
  getHomePanel2Create,
} from "../../redux/home-reducer";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "./../../utils/utils";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

const HomePanel2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.home.homePanel2 ? state.home.homePanel2 : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePanel2Data());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getHomePanel2Create({
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
          })
        )
      : dispatch(
          getHomePanel2Update({
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
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
    (images && images.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Uy 2</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  title_uz: imageId && imageId.title_uz,
                  title_ru: imageId && imageId.title_ru,
                  title_en: imageId && imageId.title_en,
                  title_krl: imageId && imageId.title_krl,
                  description_uz: imageId && imageId.description_uz,
                  description_ru: imageId && imageId.description_ru,
                  description_en: imageId && imageId.description_en,
                  description_krl: imageId && imageId.description_krl,
                }
              }
              validate={(values) => {
                const errors = {};
                if (!values.title_uz) {
                  if (!values.title) {
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
                  if (!values.title_en) {
                    errors.title_en = "Sarlavha Krl manzili noto‘g‘ri";
                  }
                }
                if (!values.description_uz) {
                  errors.description_uz = "Tavsif Uz manzili noto‘g‘ri ";
                }
                if (!values.description_ru) {
                  errors.description_ru = "Tavsif Ru manzili noto‘g‘ri ";
                }
                if (!values.description_en) {
                  errors.description_en = "Tavsif En manzili noto‘g‘ri ";
                }
                if (!values.description_krl) {
                  errors.description_krl = "Tavsif Krl manzili noto‘g‘ri ";
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
                          <label>Image</label>
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
                  <FieldHelpers
                    name={"title_uz"}
                    labelName={"Sarlavha Uz"}
                    placeholder={"Sarlavha Uz"}
                  />
                  <FieldHelpers
                    name={"title_ru"}
                    labelName={"Sarlavha Ru"}
                    placeholder={"Sarlavha Ru"}
                  />
                  <FieldHelpers
                    name={"title_en"}
                    labelName={"Sarlavha En"}
                    placeholder={"Sarlavha En"}
                  />
                  <FieldHelpers
                    name={"title_krl"}
                    labelName={"Sarlavha Krl"}
                    placeholder={"Sarlavha Krl"}
                  />

                  <FieldHelpers
                    name={"description_uz"}
                    labelName={"Tavsif Uz"}
                    placeholder={"Tavsif Uz"}
                  />
                  <FieldHelpers
                    name={"description_ru"}
                    labelName={"Tavsif Ru"}
                    placeholder={"Tavsif Ru"}
                  />
                  <FieldHelpers
                    name={"description_en"}
                    labelName={"Tavsif En"}
                    placeholder={"Tavsif En"}
                  />
                  <FieldHelpers
                    name={"description_krl"}
                    labelName={"Tavsif Krl"}
                    placeholder={"Tavsif Krl"}
                  />

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
              <th>Tavsif Uz</th>
              <th>Tavsif Ru</th>
              <th>Tavsif En</th>
              <th>Tavsif Krl</th>
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
              images.length > 0 &&
              images.map((el, i) => {
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
                    <td>
                      <img
                        style={{ width: "30px" }}
                        src={el.iconLinkName}
                        alt=""
                      />
                    </td>
                    <TableHelpers word={el.title_uz} />
                    <TableHelpers word={el.title_ru} />
                    <TableHelpers word={el.title_en} />
                    <TableHelpers word={el.title_krl} />

                    <TableHelpers word={el.description_uz} />
                    <TableHelpers word={el.description_ru} />
                    <TableHelpers word={el.description_en} />
                    <TableHelpers word={el.description_krl} />
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
                        handleAdd={() => dispatch(getHomePanel2Delete(el.id))}
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

export default HomePanel2;
