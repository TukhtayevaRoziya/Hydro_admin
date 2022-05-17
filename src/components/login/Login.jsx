import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Login.module.css";
import { Button, Input } from "reactstrap";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthUser, checkToken } from "../../redux/auth-reducer";

const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const isLoggedIn = auth.accessToken;

  if (isLoggedIn) {
    dispatch(checkToken(3600 * 24));
    return <Navigate to={"/"} />;
  }
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(getAuthUser(email, password));
  };

  return (
    <div className={style.Signin_wrapper}>
      <div className={style.Signin}>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              if (!values.email) {
                errors.email = "Email manzil noto'g'ri";
              }
            }
            if (!values.password) {
              errors.password = "Majburiy";
            }
            return errors;
          }}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.formGroup_item}>
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <label>Email</label>
                      <Input type="email" {...input} placeholder="E-mail" />
                      {meta.error && meta.touched && (
                        <span style={{ color: "#fd4444" }}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className={style.formGroup_item}>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label>Parol</label>
                      <Input type="password" {...input} placeholder="Parol" />
                      {meta.error && meta.touched && (
                        <span style={{ color: "#fd4444" }}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <Button
                style={{ width: "100%" }}
                type="submit"
                disabled={submitting}
              >
                Kirish
              </Button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
