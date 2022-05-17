import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import {
  getOurWorkImageDelete,
  getOurWorkImages,
  getOurWorkImageUpdate,
  getOurWorkImageCreate,
} from "../../redux/home-reducer";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "./../../utils/utils";
import { FieldHelpers, TableHelpers } from "./../../utils/helpers";

const HomeOurWork = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");
  
  let images = null;
  images = useSelector((state) =>
    state.home.ourWork ? state.home.ourWork : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOurWorkImages());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getOurWorkImageCreate({
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
          })
        )
      : dispatch(
          getOurWorkImageUpdate({
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
    (images && images.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Uy | Bizning ish</ModalHeader>
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
                    errors.title_uz = "Sarlavha Uz manzili noto‘g‘ri ";
                  }
                }
                if (!values.title_ru) {
                  if (!values.title_ru) {
                    errors.title_ru = "Sarlavha Ru manzili noto‘g‘ri ";
                  }
                }
                if (!values.title_en) {
                  if (!values.title_en) {
                    errors.title_en = "Sarlavha En manzili noto‘g‘ri ";
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
                  <FieldHelpers
                    name={"title_uz"}
                    placeholder={"Sarlavha Uz"}
                    labelName={"Sarlavha Uz"}
                  />
                  <FieldHelpers
                    name={"title_ru"}
                    placeholder={"Sarlavha Ru"}
                    labelName={"Sarlavha Ru"}
                  />
                  <FieldHelpers
                    name={"title_en"}
                    placeholder={"Sarlavha En"}
                    labelName={"Sarlavha En"}
                  />
                  <FieldHelpers
                    name={"title_krl"}
                    placeholder={"Sarlavha Krl"}
                    labelName={"Sarlavha Krl"}
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
              <th>
                {images && images.length < 5 && (
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Qo'shish
                  </Button>
                )}
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
                      <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                    </td>
                    <TableHelpers word={el.title_uz} />
                    <TableHelpers word={el.title_ru} />
                    <TableHelpers word={el.title_en} />
                    <TableHelpers word={el.title_krl} />
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
                        handleAdd={() => dispatch(getOurWorkImageDelete(el.id))}
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

export default HomeOurWork;
