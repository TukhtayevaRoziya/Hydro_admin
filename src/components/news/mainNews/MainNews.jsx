import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "../../../utils/utils";
import { FieldHelpers, TableHelpers } from "../../../utils/helpers";

import {
  getMainNews,
  getMainNewsCreator,
  getMainNewsDelete,
  getMainNewsUpdate,
} from "../../../redux/news-reducer";

export const MainNews = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) => (state.newsPage ? state.newsPage : null));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainNews());
  }, [dispatch]);

  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    modalType === "create"
      ? dispatch(
          getMainNewsCreator({
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            selectedImage,
            newsCategoryID: data.newsCategoryID
              ? parseInt(data.newsCategoryID)
              : 15,
          })
        )
      : dispatch(
          getMainNewsUpdate({
            id: imageId.id,
            selectedImage,
            selectedI,
            title_uz: data.title_uz,
            title_ru: data.title_ru,
            title_en: data.title_en,
            title_krl: data.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            originalPath: imageId.photoUrl,
            newsCategoryID: data.newsCategoryID
              ? parseInt(data.newsCategoryID)
              : 15,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Asosiy Yangiliklar</ModalHeader>
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
                newsCategoryID: 15,
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
                  <Field name="newsCategoryID">
                    {({ input, meta }) => (
                      <div>
                        <label>Kategoriya</label>
                        <Input
                          type="select"
                          {...input}
                          name="newsCategoryID"
                          placeholder="Kategoriya"
                        >
                          <option value="15">Yangiliklar</option>
                          <option value="16">E'lonlar</option>
                          <option value="17">Tadbirlar</option>
                          <option value="18">Ish o'rinlari</option>
                        </Input>
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <FieldHelpers name={'title_uz'} labelName={'Sarlavha Uz'} placeholder={'Sarlavha Uz'}/>
                <FieldHelpers name={'title_ru'} labelName={'Sarlavha Ru'} placeholder={'Sarlavha Ru'}/>
                <FieldHelpers name={'title_en'} labelName={'Sarlavha En'} placeholder={'Sarlavha En'}/>
                <FieldHelpers name={'title_krl'} labelName={'Sarlavha Krl'} placeholder={'Sarlavha Krl'}/>

                <FieldHelpers name={'description_uz'} labelName={'Tavsif Uz'} placeholder={'Tavsif Uz'}/>
                <FieldHelpers name={'description_ru'} labelName={'Tavsif Ru'} placeholder={'Tavsif Ru'}/>
                <FieldHelpers name={'description_en'} labelName={'Tavsif En'} placeholder={'Tavsif En'}/>
                <FieldHelpers name={'description_krl'} labelName={'Tavsif Krl'} placeholder={'Tavsif Krl'}/>

                <Button type="submit" disabled={submitting} className="sendBtn">
                  Jo'natish
                </Button>
              </form>
            )}
          />
        </ModalBody>
      </Modal>
      <div>
        <table hover className={"fl-table"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Rasm</th>
              <th>Nomi Uz</th>
              <th>Nomi Ru</th>
              <th>Nomi En</th>
              <th>Nomi Krl</th>
              <th>Tavsif Uz</th>
              <th>Tavsif Ru</th>
              <th>Tavsif En</th>
              <th>Tavsif Krl</th>
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
              images.mainNews &&
              images.mainNews.length > 0 &&
              images.mainNews.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td>
                      <div className="TdInDiv1">{i + 1}</div>
                    </td>
                    <td>
                      <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                    </td>
                    <TableHelpers word={el.title_uz}/>
                    <TableHelpers word={el.title_ru}/>
                    <TableHelpers word={el.title_en}/>
                    <TableHelpers word={el.title_krl}/>

                    <TableHelpers word={el.description_uz}/>
                    <TableHelpers word={el.description_ru}/>
                    <TableHelpers word={el.description_en}/>
                    <TableHelpers word={el.description_krl}/>
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
                        handleAdd={() => dispatch(getMainNewsDelete(el.id))}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
