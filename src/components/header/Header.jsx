// aboutCompaniesAPI

import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

import {
  getCorporativeHeader,
  getCorporativeHeaderCreate,
  getHeaderDelete,
} from "../../redux/corporative-reducer";
import { getCorporativeHeaderUpdate } from "./../../redux/corporative-reducer";
import { DeleteBtn } from "../../utils/utils";
import {
  getHeaderFooter,
  getHeaderFooterUpdate,
} from "./../../redux/header_footer-reducer";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";
import { getCarouselImageCreate } from "../../redux/home-reducer";

export const HeaderFooter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.header_footer ? state.header_footer : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeaderFooter());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getCarouselImageCreate({
            selectedImage,
          })
        )
      : dispatch(
          getHeaderFooterUpdate({
            selectedImage,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            phone: data.phone,
            email: data.email,
            address: data.address,
            telegramLink: data.telegramLink,
            instagramLink: data.instagramLink,
            youtubeLink: data.youtubeLink,
            faceBookLink: data.faceBookLink,
            footerText: data.footerText,
            /* 
            © 2010-2021 Hydro Company. All rights reserved */
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
                  description_uz: imageId && imageId.description_uz,
                  description_ru: imageId && imageId.description_ru,
                  description_en: imageId && imageId.description_en,
                  description_krl: imageId && imageId.description_krl,
                  phone: imageId && imageId.phone,
                  email: imageId && imageId.email,
                  address: imageId && imageId.address,
                  telegramLink: imageId && imageId.telegramLink,
                  instagramLink: imageId && imageId.instagramLink,
                  youtubeLink: imageId && imageId.youtubeLink,
                  faceBookLink: imageId && imageId.faceBookLink,
                  footerText: imageId && imageId.footerText,
                }
              }
              validate={(values) => {
                const errors = {};
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

                if (!values.phone) {
                  if (!values.phone) {
                    errors.phone = "Telefon raqam noto‘g‘ri";
                  }
                }
                if (!values.email) {
                  if (!values.email) {
                    errors.email = "Elektron Manzil noto‘g‘ri";
                  }
                }
                if (!values.address) {
                  if (!values.address) {
                    errors.address = "Manzil noto‘g‘ri";
                  }
                }
                if (!values.telegramLink) {
                  if (!values.telegramLink) {
                    errors.telegramLink = "Telegram Manzil noto‘g‘ri";
                  }
                }
                if (!values.instagramLink) {
                  if (!values.instagramLink) {
                    errors.instagramLink = "Instagram Manzil noto‘g‘ri";
                  }
                }
                if (!values.youtubeLink) {
                  if (!values.youtubeLink) {
                    errors.youtubeLink = "Youtube Manzil noto‘g‘ri";
                  }
                }
                if (!values.faceBookLink) {
                  if (!values.faceBookLink) {
                    errors.faceBookLink = "Facebook Manzil noto‘g‘ri";
                  }
                }
                if (!values.footerText) {
                  if (!values.footerText) {
                    errors.footerText = "Pastki ma'lumot noto‘g‘ri";
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
                  <FieldHelpers
                    name={"phone"}
                    labelName={"Telefon Raqam"}
                    placeholder={"Telefon Raqamni Kiriting!"}
                  />
                  <FieldHelpers
                    name={"email"}
                    labelName={"Elektron manzil"}
                    placeholder={"Elektron Manzilni kiriting!"}
                  />
                  <FieldHelpers
                    name={"address"}
                    labelName={"Manzil"}
                    placeholder={"Korxona Manzilini kiriting!"}
                  />

                  <FieldHelpers
                    name={"telegramLink"}
                    labelName={"Telegram Manzil"}
                    placeholder={"Telegram Manzilini kiriting!"}
                  />
                  <FieldHelpers
                    name={"instagramLink"}
                    labelName={"Instagram Manzil"}
                    placeholder={"Instagram Manzilini kiriting!"}
                  />
                  <FieldHelpers
                    name={"youtubeLink"}
                    labelName={"Youtube Manzil"}
                    placeholder={"Youtube Manzilini kiriting!"}
                  />
                  <FieldHelpers
                    name={"faceBookLink"}
                    labelName={"Facebook Manzil"}
                    placeholder={"Facebook Manzilini kiriting!"}
                  />
                  <FieldHelpers
                    name={"footerText"}
                    labelName={"Pastki  Ma`lumot"}
                    placeholder={"Pastki Ma`lumotni kiriting!"}
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
              <th>Tavsif Uz</th>
              <th>Tavsif Ru</th>
              <th>Tavsif En</th>
              <th>Tavsif Krl</th>
              <th>Telefon Raqam</th>
              <th>Elektron Manzil</th>
              <th>Manzil</th>
              <th>Telegram Manzili</th>
              <th>Instagram Manzili</th>
              <th>Youtube Manzili</th>
              <th>Facebook Manzili</th>
              <th>Pastki ma'lumotlar</th>
              <th>------</th>
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
                    <TableHelpers word={el.description_uz} />
                    <TableHelpers word={el.description_ru} />
                    <TableHelpers word={el.description_en} />
                    <TableHelpers word={el.description_krl} />
                    <TableHelpers word={el.phone} />
                    <TableHelpers word={el.email} />
                    <TableHelpers word={el.address} />
                    <TableHelpers word={el.telegramLink} />
                    <TableHelpers word={el.instagramLink} />
                    <TableHelpers word={el.youtubeLink} />
                    <TableHelpers word={el.faceBookLink || "-----"} />
                    <TableHelpers word={el.footerText} />
                    <Button
                      onClick={() => {
                        setImageId(el);
                        setModalOpen(true);
                      }}
                    >
                      <BorderColorIcon />
                    </Button>
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
