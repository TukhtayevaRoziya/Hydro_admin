import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getStatistics,
  getStatisticsCreate,
  getStatisticsDelete,
  getStatisticsUpdate,
} from "../../redux/technical-reducer";
import { DeleteBtn } from "./../../utils/utils";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

export const Statistics = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  //eslint-disable-next-line
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) =>
    state.technicalPage ? state.technicalPage : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getStatisticsCreate({
            name_uz: data.name_uz,
            name_ru: data.name_ru,
            name_en: data.name_en,
            name_krl: data.name_krl,
          })
        )
      : dispatch(
          getStatisticsUpdate({
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
    (images && images.statistics && images.statistics.length > 0 && (
      <div onClick={() => setSidebarOpen(false)}>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Statistika</ModalHeader>
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
                  if (!values.name_uz) {
                    errors.name_uz = "Nom Uz manzili noto‘g‘ri";
                  }
                }
                if (!values.name_ru) {
                  if (!values.name_ru) {
                    errors.name_ru = "Nom Ru manzili noto‘g‘ri";
                  }
                }
                if (!values.name_en) {
                  if (!values.name_en) {
                    errors.name_en = "Nome En manzili noto‘g‘ri";
                  }
                }
                if (!values.name_krl) {
                  if (!values.name_krl) {
                    errors.name_krl = "Nome Krl manzili noto‘g‘ri";
                  }
                }
                return errors;
              }}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <FieldHelpers name={'name_uz'} placeholder={'Nom Uz'} labelName={'Nom Uz'}/>
                  <FieldHelpers name={'name_ru'} placeholder={'Nom Ru'} labelName={'Nom Ru'}/>
                  <FieldHelpers name={'name_en'} placeholder={'Nom En'} labelName={'Nom En'}/>
                  <FieldHelpers name={'name_krl'} placeholder={'Nom Krl'} labelName={'Nom Krl'}/>

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
                  Qo`shmoq
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.statistics.length > 0 &&
              images.statistics.map((el, i) => {
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
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
                      </Button>
                      <DeleteBtn
                        handleAdd={() => dispatch(getStatisticsDelete(el.id))}
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
