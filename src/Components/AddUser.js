import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { addUser } from "../Redux/actions/userActions";
import ModalComponent from "./UI/ModalComponent";
import { connect } from "react-redux";
import { ReactComponent as PlusCircleIcon } from './plus-circle.svg';


const initialUserData = {
  name: "",
  email: "",
  phone: "",
  gender: "M",
  type: "Adult",
  isActive: false,
};

const AddUser = ({ userData, addUser }) => {
  const [newUser, setnewUser] = useState(initialUserData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        gender: newUser.gender,
        type: newUser.type,
        isActive: newUser.isActive === "true" ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data);
        setShowAddModal(false);
        setnewUser(initialUserData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>

      <Col>
        <Button variant="outline-primary" className="pe-none">
          No. of Users <span className="badge bg-secondary">{userData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          <PlusCircleIcon width="20" height="20" />
        </Button>
      </Col>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={confirmAdd}
          title="Add new user"
          content={
            <NewUserFormComponent newUser={newUser} setnewUser={setnewUser} />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            newUser.name === "" ||
            newUser.email === "" ||
            !validateEmail(newUser.email)
          }
        />
      )}

    </>
  );
};

const NewUserFormComponent = ({ newUser, setnewUser }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 form-group-zero-margin">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={newUser.name}
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={newUser.email}
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3 form-group-zero-margin">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="text"
            placeholder="010xxxxxxxx"
            name="phone"
            value={newUser.phone}
            onChange={(e) => setnewUser({ ...newUser, phone: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={newUser.gender}
            onChange={(e) =>
              setnewUser({
                ...newUser,
                gender: e.target.value,
              })
            }
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
     
          </Form.Control>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={newUser.type}
            onChange={(e) =>
              setnewUser({
                ...newUser,
                type: e.target.value,
              })
            }
          >
            <option value="Kid">Kid</option>
            <option value="Student">Student</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="isActive"
            value={newUser.isActive.toString()} // Convert boolean to string
            onChange={(e) =>
              setnewUser({
                ...newUser,
                isActive: e.target.value,
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
