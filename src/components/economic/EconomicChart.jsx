import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getChart,
  getChartCreate,
  getChartUpdate,
  getChartDelete,
} from "../../redux/economic-reducer";
import { DeleteBtn } from "./../../utils/utils";

export const EconomicChart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageId, setImageId] = useState(false);
  let images = null;
  images = useSelector((state) =>
    state.economicPage ? state.economicPage : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChart());
  }, [dispatch]);
  const toggle = () => {
    setModalOpen(!modalOpen);
    setImageId(null);
  };
  const onSubmit = (data) => {
    !imageId
      ? dispatch(getChartCreate({ amount: data.amount }))
      : dispatch(getChartUpdate({ id: imageId.id, amount: data.amount }));
    setImageId(null);
    setModalOpen(false);
  };

  return (
    (images && images.amount && images.amount.length > 0 && (
      <div>
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Diagramma</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={onSubmit}
              initialValues={imageId && { amount: imageId.amount }}
              validate={(values) => {
                const errors = {};
                if (!values.amount) {
                  if (!values.amount) {
                    errors.amount = "Miqdor manzili noto‘g‘ri";
                  }
                }
                return errors;
              }}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Field name="amount">
                      {({ input, meta }) => (
                        <div>
                          <label>Miqdor</label>
                          <Input
                            type="number"
                            {...input}
                            placeholder="Amount"
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
              <th>Miqdor</th>
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
          <tbody>
            {images &&
              images.amount.length > 0 &&
              images.amount.map((el, i) => {
                return (
                  <tr key={el.amount}>
                    {/* eslint-disable-next-line */}
                    <td scope="row">{i + 1}</td>

                    <td>
                      <div className="TdInDiv">{el.amount}</div>
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
                        handleAdd={() => dispatch(getChartDelete(el.id))}
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
