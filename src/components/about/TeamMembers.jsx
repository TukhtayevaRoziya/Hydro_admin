import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteBtn } from "./../../utils/utils";
import { FieldHelpers, TableHelpers } from "./../../utils/helpers";
import {
  getAboutTeamMembars,
  getAboutTeamMembersCreate,
  getAboutTeamMembersUpdate,
  getAboutTeamMembersDelete,
} from "./../../redux/about-reducer";
import { instance } from "../../api/api";

export const TeamMembers = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedImage, setSelectedImage] = useState(false);
  const [size, setSize] = useState("");

  // eslint-disable-next-line
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) => (state.aboutPage ? state.aboutPage : null));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutTeamMembars());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    if (modalType === "create") {
      dispatch(
        getAboutTeamMembersCreate({
          selectedImage,
          fullName: data.fullName,
          staffPositionID: 0,
          staffTypeID: parseInt(data.staffTypeID) || 17,
          veterans: data.staffTypeID === "19",
          staffPosition: {
            name_uz: data.name_uz,
            name_krl: data.name_krl,
            name_ru: data.name_ru,
            name_en: data.name_en,
          },
        })
      );
    } else {
      dispatch(
        getAboutTeamMembersUpdate({
          id: imageId.id,
          fullName: data.fullName,
          staffPositionID: imageId.staffPositionID || 54,
          staffPosition: {
            id: imageId.staffPositionID || 54,
            name_uz: data.name_uz,
            name_krl: data.name_krl,
            name_ru: data.name_ru,
            name_en: data.name_en,
          },
          staffTypeID: parseInt(data.staffTypeID) || 17,
          veterans: data.staffTypeID === "19",
          photoUrl: imageId.photoUrl,
          selectedImage,
          selectedI,
        })
      );
      instance
        .put(`staffPositionsAPI/${imageId.staffPositionID}`, {
          id: imageId.staffPositionID || 54,
          name_uz: data.name_uz,
          name_krl: data.name_krl,
          name_ru: data.name_ru,
          name_en: data.name_en,
        })
        .catch((err) => console.log(err));
    }
    setImageId(null);
    setSelectedI(false);
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Boshqaruv Tizimi</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={onSubmit}
            initialValues={
              imageId && {
                fullName: imageId.fullName,
                staffTypeID: imageId.staffTypeID || 17,
                name_uz: imageId.staffPosition.name_uz,
                name_ru: imageId.staffPosition.name_ru,
                name_en: imageId.staffPosition.name_en,
                name_krl: imageId.staffPosition.name_krl,
              }
            }
            validate={(values) => {
              const errors = {};
              if (!values.fullName) {
                if (!values.fullName) {
                  errors.fullName = "Ism manzili noto‘g‘ri";
                }
              }
              if (!values.name_uz) {
                if (!values.name_uz) {
                  errors.name_uz = "Lavozim turi Uz manzili noto‘g‘ri";
                }
              }
              if (!values.name_ru) {
                if (!values.name_ru) {
                  errors.name_uz = "Lavozim turi Ru manzili noto‘g‘ri";
                }
              }
              if (!values.name_en) {
                if (!values.name_en) {
                  errors.name_uz = "Lavozim turi En manzili noto‘g‘ri";
                }
              }
              if (!values.name_krl) {
                if (!values.name_krl) {
                  errors.name_uz = "Lavozim turi Krl manzili noto‘g‘ri";
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
                  <Field name="myImage">
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
                          accept="image/png, image/gif, image/jpeg"
                          required={modalType === "create"}
                        />
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <FieldHelpers
                  name={"fullName"}
                  placeholder={"Ism"}
                  labelName={"Ism"}
                />
                <FieldHelpers
                  name={"name_uz"}
                  placeholder={"Lavozim turi Uz"}
                  labelName={"Lavozim turi Uz"}
                />
                <FieldHelpers
                  name={"name_ru"}
                  placeholder={"Lavozim turi Ru"}
                  labelName={"Lavozim turi Ru"}
                />
                <FieldHelpers
                  name={"name_en"}
                  placeholder={"Lavozim turi En"}
                  labelName={"Lavozim turi En"}
                />
                <FieldHelpers
                  name={"name_krl"}
                  placeholder={"Lavozim turi Krl"}
                  labelName={"Lavozim turi Krl"}
                />
                <div>
                  <Field name="staffTypeID">
                    {({ input, meta }) => (
                      <div>
                        <label>Lavozim turi</label>
                        <Input
                          type="select"
                          {...input}
                          name="staffTypeID"
                          placeholder="Lavozim turi"
                        >
                          <option value="17">Rahbariyat</option>
                          <option value="18">Xodim</option>
                          <option value="19">Faxriy</option>
                        </Input>
                        {meta.error && meta.touched && (
                          <span style={{ color: "#fd4444" }}>{meta.error}</span>
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
            <th>Rasm</th>
            <th>F.I.SH.</th>
            <th>Xodim lavozimi</th>
            <th>Lavozim turi Uz</th>
            <th>Lavozim turi Ru</th>
            <th>Lavozim turi En</th>
            <th>Lavozim turi Krl</th>
            <th>
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setModalType("create");
                }}
              >
                Qo'shish
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.team &&
            images.team.length > 0 &&
            images.team.map((el, i) => {
              return (
                <tr key={el.id}>
                  {/* eslint-disable-next-line */}
                  <td scope="row">{i + 1}</td>
                  <td>
                    <img style={{ width: "30px" }} src={el.photoUrl} alt="" />
                  </td>
                  <TableHelpers word={el.fullName} />
                  <td>
                    <div className="TdInDiv">
                      {el.staffTypeID === 17
                        ? "Rahbariyat"
                        : el.staffTypeID === 18
                        ? "Xodim"
                        : "Faxriy"}
                    </div>
                  </td>
                  <TableHelpers word={el.staffPosition.name_uz} />
                  <TableHelpers word={el.staffPosition.name_ru} />
                  <TableHelpers word={el.staffPosition.name_en} />
                  <TableHelpers word={el.staffPosition.name_krl} />

                  <td>
                    <Button
                      onClick={() => {
                        setImageId(el);
                        setModalOpen(true);
                        setModalType("update");
                      }}
                    >
                      <BorderColorIcon />
                    </Button>
                    <DeleteBtn
                      handleAdd={() =>
                        dispatch(getAboutTeamMembersDelete(el.id))
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
