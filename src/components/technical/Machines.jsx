import React, { useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "../../utils/utils";
import {
  getTechnicalMachineCreate,
  getTechnicalMachine,
  getTechnicalMachineUpdate,
  getTechnicalMachineDelete,
} from "../../redux/technical-reducer";
import { FieldHelpers, TableHelpers } from "../../utils/helpers";

export const Machines = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [modalType, setModalType] = useState("");
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) =>
    state.technicalPage ? state.technicalPage : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnicalMachine());
  }, [dispatch]);

  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    modalType === "create"
      ? dispatch(
          getTechnicalMachineCreate({
            ...data,
            selectedImage,
            technicalMachineCatigoryID: data.technicalMachineCatigoryID || 5,
          })
        )
      : dispatch(
          getTechnicalMachineUpdate({
            id: imageId.id,
            selectedImage,
            name_uz: data.name_uz,
            name_ru: data.name_ru,
            name_en: data.name_en,
            name_krl: data.name_krl,
            description_uz: data.description_uz,
            description_ru: data.description_ru,
            description_en: data.description_en,
            description_krl: data.description_krl,
            photoUrl: imageId.photoUrl,
            amount: data.amount,
            technicalMachineCatigoryID: data.technicalMachineCatigoryID || 5,
            selectedI,
          })
        );
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Mashina</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={
                imageId && {
                  name_uz: imageId && imageId.name_uz,
                  name_ru: imageId && imageId.name_ru,
                  name_en: imageId && imageId.name_en,
                  name_krl: imageId && imageId.name_krl,
                  description_uz: imageId && imageId.description_uz,
                  description_ru: imageId && imageId.description_ru,
                  description_en: imageId && imageId.description_en,
                  description_krl: imageId && imageId.description_krl,
                  photoUrl: imageId && imageId.photoUrl,
                  amount: imageId && imageId.amount,
                  technicalMachineCatigoryID: 5,
                }
              }
              validate={(values) => {
                const errors = {};
                if (!values.name_uz) {
                  if (!values.name_uz) {
                    errors.name_uz = "Sarlavha Uz manzili noto‘g‘ri";
                  }
                }
                if (!values.name_ru) {
                  if (!values.name_ru) {
                    errors.name_ru = "Sarlavha Ru manzili noto‘g‘ri";
                  }
                }
                if (!values.name_en) {
                  if (!values.name_en) {
                    errors.name_en = "Sarlavha En manzili noto‘g‘ri";
                  }
                }
                if (!values.name_krl) {
                  if (!values.name_krl) {
                    errors.name_krl = "Sarlavha Krl manzili noto‘g‘ri";
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
                    errors.description_krl = "Tavsif krl manzili noto‘g‘ri";
                  }
                }
                if (!values.amount) {
                  if (!values.amount) {
                    errors.amount1 = "Miqdor manzili noto‘g‘ri";
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
                    <Field name="photoUrl1">
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
                  <div>
                    <Field name="technicalMachineCatigoryID">
                      {({ input, meta }) => (
                        <div>
                          <label>Kategoriya</label>
                          <Input
                            type="select"
                            {...input}
                            name="technicalMachineCatigoryID"
                            placeholder="Kategoriya"
                          >
                            <option value="5">Yuk mashinalari</option>
                            <option value="10">Ekskavatorlar</option>
                            <option value="15">Og'ir mashinalar</option>
                          </Input>
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
                    name={"name_uz"}
                    labelName={"Nom Uz"}
                    placeholder={"Nom Uz"}
                  />
                  <FieldHelpers
                    name={"name_ru"}
                    labelName={"Nom Ru"}
                    placeholder={"Nom Ru"}
                  />
                  <FieldHelpers
                    name={"name_en"}
                    labelName={"Nom En"}
                    placeholder={"Nom En"}
                  />
                  <FieldHelpers
                    name={"name_krl"}
                    labelName={"Nom Krl"}
                    placeholder={"Nom Krl"}
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

                  <FieldHelpers
                    name={"amount"}
                    labelName={"Miqdor"}
                    placeholder={"Miqdor"}
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
        <table hover={true} className={"fl-table"}>
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
              <th>Miqdori</th>
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
              images.machine &&
              images.machine.length > 0 &&
              images.machine.map((el, i) => {
                delete el.technicalMachineCatigory;
                return (
                  <tr key={el.id}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>
                    <td>
                      <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                    </td>
                    <TableHelpers word={el.name_uz} />
                    <TableHelpers word={el.name_ru} />
                    <TableHelpers word={el.name_en} />
                    <TableHelpers word={el.name_krl} />

                    <TableHelpers word={el.description_uz} />
                    <TableHelpers word={el.description_ru} />
                    <TableHelpers word={el.description_en} />
                    <TableHelpers word={el.description_krl} />

                    <TableHelpers word={el.amount} />
                    <td>
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
                        handleAdd={() =>
                          dispatch(getTechnicalMachineDelete(el.id))
                        }
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
