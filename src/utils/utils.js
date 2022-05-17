import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const DeleteBtn = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Button onClick={toggle} color="danger">
        <DeleteForeverIcon />
      </Button>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>
          <div>
            <h4>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h4>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.handleAdd}>
            O'chirish
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
