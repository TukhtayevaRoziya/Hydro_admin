import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getAboutCompany,
  getAboutCompanyUpdate,
  getAboutCompanyCreate,
} from "./../../redux/about-reducer";

export const AboutCompany = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) => (state.aboutPage ? state.aboutPage : null));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutCompany());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(getAboutCompanyCreate({ selectedImage, title_uz: data.title }))
      : dispatch(
          getAboutCompanyUpdate({
            id: imageId.id,
            selectedImage,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            photoUrl1: data.photoUrl1,
            photoUrl2: data.photoUrl2,
            photoUrl3: data.photoUrl3,
            originalPath1: imageId.photoUrl1,
            originalPath2: imageId.photoUrl2,
            originalPath3: imageId.photoUrl3,
            amount1Discript: data.amount1Discript,
            amount2Discript: data.amount2Discript,
            amount3Discript: data.amount3Discript,
            amount4Discript: data.amount4Discript,
            amount1: data.amount1,
            amount2: data.amount2,
            amount3: data.amount3,
            amount4: data.amount4,
            selectedI,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };
  return (
    (images && images.company && images.company.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Kompaniya haqida</ModalHeader>
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
                  photoUrl1: imageId && imageId.photoUrl1,
                  // photoUrl2: imageId && imageId.photoUrl2,
                  // photoUrl3: imageId && imageId.photoUrl3,
                  amount1Discript: imageId && imageId.amount1Discript,
                  amount2Discript: imageId && imageId.amount2Discript,
                  amount3Discript: imageId && imageId.amount3Discript,
                  amount4Discript: imageId && imageId.amount4Discript,
                  amount1: imageId && imageId.amount1,
                  amount2: imageId && imageId.amount2,
                  amount3: imageId && imageId.amount3,
                  amount4: imageId && imageId.amount4,
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
                    errors.title_krl = "Sarlavha Krl manzili noto‘g‘ri ";
                  }
                }
                if (!values.description_uz) {
                  if (!values.description_uz) {
                    errors.description_uz = "Tavsif Uz manzili noto‘g‘ri ";
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
                    errors.description_krl = "Tavsif Krl manzili noto‘g‘ri ";
                  }
                }
                if (!values.amount1Discript) {
                  if (!values.amount1Discript) {
                    errors.amount1Discript =
                      "Miqdor tavsif 1 manzili noto‘g‘ri ";
                  }
                }
                if (!values.amount2Discript) {
                  if (!values.amount2Discript) {
                    errors.amount2Discript =
                      "Miqdor tavsif 2 manzili noto‘g‘ri";
                  }
                }
                if (!values.amount3Discript) {
                  if (!values.amount3Discript) {
                    errors.amount3Discript =
                      "Miqdor tavsif 3 manzili noto‘g‘ri ";
                  }
                }
                if (!values.amount4Discript) {
                  if (!values.amount4Discript) {
                    errors.amount4Discript =
                      "Miqdor tavsif 4 manzili noto‘g‘ri ";
                  }
                }
                if (!values.amount1) {
                  if (!values.amount1) {
                    errors.amount1 = "Miqdor 1 manzili noto‘g‘ri ";
                  }
                }
                if (!values.amount2) {
                  if (!values.amount2) {
                    errors.amount2 = "Miqdor 2 manzili noto‘g‘ri";
                  }
                }
                if (!values.amount3) {
                  if (!values.amount3) {
                    errors.amount3 = "Miqdor 3 manzili noto‘g‘ri";
                  }
                }
                if (!values.amount4) {
                  if (!values.amount4) {
                    errors.amount4 = "Miqdor 4 manzili noto‘g‘ri";
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
                          <label>Title Krl</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Title Krl"
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
                            placeholder="Description Uz"
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
                  <div></div>
                  <div>
                    <Field name="photoUrl1">
                      {({ input, meta }) => (
                        <div>
                          <label>Rasm 1</label>
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
                    <Field name="amount1Discript">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor tavsifi 1</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor tavsifi 1"
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
                    <Field name="amount2Discript">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor tavsifi 2</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor tavsifi 2"
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
                    <Field name="amount3Discript">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor tavsifi 3</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor tavsifi 3"
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
                    <Field name="amount4Discript">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor tavsifi 4</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor tavsifi 4"
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
                    <Field name="amount1">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor 1</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor 1"
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
                    <Field name="amount2">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor 2</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor 2"
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
                    <Field name="amount3">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor 3</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Miqdor 3"
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
                    <Field name="amount4">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor 4</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Amount 4"
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
                    style={{ width: "100%", marginTop: "20px" }}
                    type="submit"
                    disabled={submitting}
                  >
                    Jo`natish
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
              <th>Rasm 1</th>
              {/* <th>Image 2</th>
                            <th>Image 3</th> */}
              <th>Sarlavha Uz</th>
              <th>Sarlavha Ru</th>
              <th>Sarlavha En</th>
              <th>Sarlavha Krl</th>
              <th>Tavsifi Uz</th>
              <th>Tavsifi Ru</th>
              <th>Tavsifi En</th>
              <th>Tavsifi Krl</th>

              <th>Miqdor Tavsifi 1</th>
              <th>Miqdor Tavsifi 2</th>
              <th>Miqdor Tavsifi 3</th>
              <th>Miqdor Tavsifi 4</th>
              <th>Miqdor 1</th>
              <th>Miqdor 2</th>
              <th>Miqdor 3</th>
              <th>Miqdor 4</th>
              <th>-----</th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.company.length > 0 &&
              images.company.map((el, i) => {
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
                    <td>
                      <img
                        style={{ width: "30px" }}
                        src={el.photoUrl1}
                        alt=""
                      />
                    </td>
                    {/* <td><img style={{ width: '30px' }} src={el.photoUrl2} alt="" /></td>
                                <td><img style={{ width: '30px' }} src={el.photoUrl3} alt="" /></td> */}

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
                    <td>
                      <div className="TdInDiv">{el.description_uz}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.description_ru}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.description_en}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.description_krl}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.amount1Discript || "----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.amount2Discript || "----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.amount3Discript || "----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">
                        {el.amount4Discript || "----"}
                      </div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.amount1 || "----"}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.amount2 || "----"}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.amount3 || "----"}</div>
                    </td>
                    <td>
                      <div className="TdInDiv">{el.amount4 || "----"}</div>
                    </td>
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
