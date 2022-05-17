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
import { DeleteBtn } from "../../utils/utils";
import {
  getActivitiesCategories,
  getActivitiesCategoriesUpdate,
} from "../../redux/activities-reducer";
import {
  getActivitiesCategoriesCreate,
  getActivitiesCategoriesDelete,
} from "../../redux/activities-reducer";

export const ActivityCategories = ({ setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedI, setSelectedI] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) =>
    state.activityPage ? state.activityPage : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivitiesCategories());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(
          getActivitiesCategoriesCreate({
            name_uz: data.name_uz,
            name_ru: data.name_ru,
            name_en: data.name_en,
            name_krl: data.name_krl,
          })
        )
      : dispatch(
          getActivitiesCategoriesUpdate({
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
      <div onClick={() => setSidebarOpen(false)}>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
                  errors.name_uz = "Invalid name Uz address";
                }
                if (!values.name_ru) {
                  errors.name_ru = "Invalid name Ru address";
                }
                if (!values.name_en) {
                  errors.name_en = "Invalid name En address";
                }
                if (!values.name_krl) {
                  errors.name_krl = "Invalid name Krl address";
                }
                return errors;
              }}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Field name="name_uz">
                      {({ input, meta }) => (
                        <div>
                          <label>Name Uz</label>
                          <Input type="text" {...input} placeholder="Name Uz" />
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
                            <span style={{ color: "#fd4444" }}>
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="name_ru">
                      {({ input, meta }) => (
                        <div>
                          <label>Name Ru</label>
                          <Input type="text" {...input} placeholder="Name Ru" />
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
                    <Field name="name_en">
                      {({ input, meta }) => (
                        <div>
                          <label>Name En</label>
                          <Input type="text" {...input} placeholder="Name En" />
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
                    <Field name="name_krl">
                      {({ input, meta }) => (
                        <div>
                          <label>Name Krl</label>
                          <Input
                            type="text"
                            {...input}
                            placeholder="Name Krl"
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
                    Send
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
              <th>Name Uz</th>
              <th>Name Ru</th>
              <th>Name En</th>
              <th>Name Krl</th>
              <th>
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Create
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
                    <td>
                      <h1>{el.name_uz}</h1>
                    </td>
                    <td>
                      <h1>{el.name_ru}</h1>
                    </td>
                    <td>
                      <h1>{el.name_en}</h1>
                    </td>
                    <td>
                      <h1>{el.name_krl}</h1>
                    </td>
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
                        handleAdd={() =>
                          dispatch(getActivitiesCategoriesDelete(el.id))
                        }
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
