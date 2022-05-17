import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import {
  getRegionImageDelete,
  getRegionImages,
  getRegionImageUpdate,
  getRegionImageCreate,
} from "../../redux/home-reducer";
import { DeleteBtn } from "./../../utils/utils";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

const HomeRegion = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) =>
    state.home.region ? state.home.region : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegionImages());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getRegionImageCreate({
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
          getRegionImageUpdate({
            title_uz: imageId.title_uz,
            title_ru: imageId.title_ru,
            title_en: imageId.title_en,
            title_krl: imageId.title_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            id: imageId.id,
            originalPath: imageId.photoUrl,
          })
        );
    setModalOpen(false);
    setImageId(null);
  };

  return (
    (images && images.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Uy | Hudud</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  description_uz: imageId && imageId.description_uz,
                  description_ru: imageId && imageId.description_ru,
                  description_en: imageId && imageId.description_en,
                  description_krl: imageId && imageId.description_krl,
                }
              }
              validate={(values) => {
                const errors = {};
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
                return errors;
              }}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
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
              <th>Sarlavha Uz</th>
              <th>Sarlavha Ru</th>
              <th>Sarlavha En</th>
              <th>Sarlavha Krl</th>
              <th>Tavsif Uz</th>
              <th>Tavsif En</th>
              <th>Tavsif Ru</th>
              <th>Tavsif Krl</th>
              <th>------</th>
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

                    <TableHelpers word={el.title_uz} />
                    <TableHelpers word={el.title_en} />
                    <TableHelpers word={el.title_ru} />
                    <TableHelpers word={el.title_krl} />

                    <TableHelpers word={el.description_uz} />
                    <TableHelpers word={el.description_en} />
                    <TableHelpers word={el.description_ru} />
                    <TableHelpers word={el.description_krl} />

                    <td>
                      <Button
                        onClick={() => {
                          setImageId(el);
                          setModalOpen(true);
                        }}
                      >
                        <BorderColorIcon />
                      </Button>{" "}
                      <DeleteBtn
                        handleAdd={() => dispatch(getRegionImageDelete(el.id))}
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

export default HomeRegion;
