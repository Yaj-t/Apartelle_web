import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserProfileEditCSS from "../../../styles/settings/userProfileEdit.module.css";

const ProfileEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .min(10, "Must be at least 10 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .when("password", (password, field) =>
      password != "" ? field.required("Confirm Password is required") : field
    ),
});

const EditProfileForm = ({ handleCloseModal }) => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user profile data
    Axios.get("http://localhost:3001/user/myprofile", {
      headers: { accessToken: sessionStorage.getItem("accessToken") },
    })
      .then((response) => {
        const profileData = response.data.user;
        setInitialValues({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          contactNumber: profileData.contactNumber,
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  }, []);

  const handleSubmit = (values) => {
    console.log("updating");
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.contactNumber,
    };

    if (values.password) {
      requestData.password = values.password;
    }

    Axios.put("http://localhost:3001/user/myprofile", requestData, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log("Profile updated successfully");

        // Refetch user data
        return Axios.get("http://localhost:3001/user/myprofile", {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        });
      })
      .then((response) => {
        // Update the local state with the refetched data
        const updatedProfileData = response.data.user;
        setInitialValues({
          firstName: updatedProfileData.firstName,
          lastName: updatedProfileData.lastName,
          email: updatedProfileData.email,
          contactNumber: updatedProfileData.contactNumber,
          password: "",
          confirmPassword: "",
        });

        handleCloseModal();   
        window.location.reload();

        navigate("/settings/manage-account/");
        
      })
      .catch((error) => {
        console.error("Error updating profile", error);
      });
    };

  return (
    <Dialog
      open
      onClose={handleCloseModal}
      classes={{
        paper: `${UserProfileEditCSS.ModalLooks} ${UserProfileEditCSS.DialogContainer}`,
      }}
    >
      <DialogTitle className={UserProfileEditCSS.Title}>
        Update Profile
      </DialogTitle>
      <DialogContent className={UserProfileEditCSS.Content}>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileEditSchema}
          onSubmit={handleSubmit}
          enableReinitialize // This is important to update the form when initialValues changes
        >
          <Form>
            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="firstName">First Name</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="firstName"
                type="text"
              />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="lastName">Last Name</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
              <ErrorMessage name="lastName" component="div" />
            </div>

            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="Email">Email</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="contactNumber">Contact Number</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="contactNumber"
                type="text"
                placeholder="Contact Number"
              />
              <ErrorMessage name="contactNumber" component="div" />
            </div>

            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="Password">Password</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="password"
                type="text"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className={UserProfileEditCSS.outerbox}>
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <Field
                className={UserProfileEditCSS.Table}
                name="confirmPassword"
                type="text"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <div className={UserProfileEditCSS.bothButtons}>
              <button
                className={UserProfileEditCSS.changesButton}
                type="submit"
              >
                Save Changes
              </button>
              <button
                className={UserProfileEditCSS.changesButton}
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
