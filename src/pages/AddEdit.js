import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fireDb from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  contact: "",
  status: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  // Destructuring the object here
  const { name, email, contact, status } = state;

  const navigate = useNavigate();

  // Function for Handling the input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Function for Submitting the data

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("Plaese provide all required input fields");
    } else {
      if (!id) {
        fireDb.child("Users-Data").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Susscessfully");
          }
        });
        setTimeout(() => navigate("/"), 500);
      } else {
        fireDb.child(`Users-Data/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Updated Susscessfully");
          }
        });
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  // to update the data

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("Users-Data").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label  htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the name here"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter the email here"
          value={email || ""}
          onChange={handleInputChange}
        />

        <label  htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Enter the contact here"
          value={contact || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Enter the user status active or inactive"
          value={status || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "UPdate" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
