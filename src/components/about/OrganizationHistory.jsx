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
  // eslint-disable-next-line
  Table,
} from "reactstrap";
import {
  getAboutOrganizationHistory,
  getAboutOrganizationHistoryCreate,
  getAboutOrganizationHistoryDelete,
} from "../../redux/about-reducer";
import { getAboutOrganizationHistoryUpdate } from "./../../redux/about-reducer";
import { DeleteBtn } from "./../../utils/utils";

export const OrganizationHistory = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [size, setSize] = useState("");

  let images = null;
  images = useSelector((state) => (state.aboutPage ? state.aboutPage : null));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutOrganizationHistory());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(getAboutOrganizationHistoryCreate({ selectedImage }))
      : dispatch(
          getAboutOrganizationHistoryUpdate({
            selectedImage,
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
    (images &&
      images.organizationHistoryData &&
      images.organizationHistoryData.length > 0 && (
        <div>
          <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Tashkilot tarixi</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={onSubmit}
                // initialValues={imageId && { title: imageId && imageId.title_uz }}
                validate={(values) => {
                  const errors = {};
                  // if (!values.title) {
                  //     if (!values.title) { errors.title = 'Invalid title address' }
                  // }
                  if (size <= 3145728) {
                    console.log(size);
                  } else {
                    if (!values.image) { errors.image = 'Rasm Hajmi Katta' }
                  }
                  return errors;
                }}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Field name="image">
                        {({ meta }) => (
                          <div>
                            <label>Rasm</label>
                            <Input
                              type="file"
                              name="myEconomicImage"
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
                <th>
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Yaratish
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="onlyImage">
              {images &&
                images.organizationHistoryData.length > 0 &&
                images.organizationHistoryData.map((el, i) => {
                  return (
                    <tr key={el.id}>
                      {/* eslint-disable-next-line */}
                      <td scope="row">{i + 1}</td>
                      <td>
                        <div className="TdInDiv">
                          <img
                            style={{ width: "30px" }}
                            src={el.photoUrl}
                            alt=""
                          />
                        </div>
                      </td>

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
                          handleAdd={() =>
                            dispatch(getAboutOrganizationHistoryDelete(el.id))
                          }
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
