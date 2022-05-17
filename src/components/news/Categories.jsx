import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";
import { DeleteBtn } from "./../../utils/utils";
import {
  getCategories,
  getCategoriesDelete,
  getCategoriesUpdate,
} from "../../redux/news-reducer";
import { getCategoriesCreate } from "./../../redux/news-reducer";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

export const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) => (state.newsPage ? state.newsPage : null));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getCategoriesCreate({
            name_uz: data.name_uz,
            name_ru: data.name_ru,
            name_en: data.name_en,
            name_krl: data.name_krl,
          })
        )
      : dispatch(
          getCategoriesUpdate({
            name_uz: data.name_uz,
            name_ru: data.name_ru,
            name_en: data.name_en,
            name_krl: data.name_krl,
            id: imageId.id,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    (images && images.categories && images.categories.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Kategoriya</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  name_uz: imageId && imageId.name_uz,
                  name_ru: imageId && imageId.name_ru,
                  name_en: imageId && imageId.name_en,
                  name_krl: imageId && imageId.name_krl,
                }
              }
              validate={(values) => {
                const errors = {};
                if (!values.name_uz) {
                  errors.name_uz = "Nom Uz manzili noto‘g‘ri";
                }
                if (!values.name_ru) {
                  errors.name_ru = "Nom Ru manzili noto‘g‘ri";
                }
                if (!values.name_en) {
                  errors.name_en = "Nom En manzili noto‘g‘ri";
                }
                if (!values.name_krl) {
                  errors.name_krl = "Nom Krl manzili noto‘g‘ri";
                }
                return errors;
              }}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <FieldHelpers name={'name_uz'} labelName={'Nom Uz'} placeholder={'Nom Uz'}/>
                  <FieldHelpers name={'name_ru'} labelName={'Nom Uz'} placeholder={'Nom Ru'}/>
                  <FieldHelpers name={'name_en'} labelName={'Nom Uz'} placeholder={'Nom En'}/>
                  <FieldHelpers name={'name_krl'} labelName={'Nom Uz'} placeholder={'Nom Krl'}/>
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
        <Table hover className={"table-responsive"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nomi Uz</th>
              <th>Nomi Ru</th>
              <th>Nomi En</th>
              <th>Nomi Krl</th>
              <th>
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Qo'shmoq
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.categories.length > 0 &&
              images.categories.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{i + 1}</th>
                    <TableHelpers word={el.name_uz}/>
                    <TableHelpers word={el.name_ru}/>
                    <TableHelpers word={el.name_en}/>
                    <TableHelpers word={el.name_krl}/>
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
                        handleAdd={() => dispatch(getCategoriesDelete(el.id))}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    )) || (
      <div className="dis">
        <div className="spinner"></div>
      </div>
    )
  );
};
