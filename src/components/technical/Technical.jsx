import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {} from "../../redux/contact-reducer";
import {
  getTechnicalHeader,
  getTechnicalUpdate,
  getTechnicalCreate,
} from "./../../redux/technical-reducer";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

export const Technical = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.technicalPage ? state.technicalPage : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnicalHeader());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(getTechnicalCreate({ selectedImage, title_uz: data.title }))
      : dispatch(
          getTechnicalUpdate({
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
    (images && images.header && images.header.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Sarlavha</ModalHeader>
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
                if (size <= 5242880) {
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
              <th>Rasm</th>
              <th>Sarlavha Uz</th>
              <th>Sarlavha Ru</th>
              <th>Sarlavha En</th>
              <th>Sarlavha Krl</th>
              <th>-----</th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.header.length > 0 &&
              images.header.map((el, i) => {
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
                    <td>
                      <Button
                        onClick={() => {
                          setImageId(el);
                          setModalOpen(true);
                        }}
                      >
                        <BorderColorIcon />
                      </Button>
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
