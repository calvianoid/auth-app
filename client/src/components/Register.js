import React from "react";
import { Container, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { auth } from "../helper/user";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

//validasi data form pake formik + yup libs
const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "The Field is Too Short").max(20, "The Field is Too Long").required("Required"),
  password: Yup.string().min(6, "The Field is Too Short").max(50, "The Field is Too Long").required("Required"),
  fullname: Yup.string().min(6, "The Field is Too Short").max(50, "The Field is Too Long").required("Required"),
  phone: Yup.string().min(6, "The Field is Too Short").max(17, "The Field is Too Long").required("Required"),
  note: Yup.string().min(2, "The Field is Too Short").max(200, "The Field is Too Long"),
});

//ini contoh kalau pake class component, file lainnya itu namanya functional component
export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  onRegister = (values) => {
    this.setState({ isLoading: true });
    const data = {
      username: values.username,
      password: values.password,
      fullname: values.fullname,
      phone: values.phone,
      note: values.note,
    };
    auth("http://localhost:3001/users/register", data).then((result) => {
      sessionStorage.setItem("id", result.data.id);
      sessionStorage.setItem("username", values.username);
      sessionStorage.setItem("token", result.data.token);

      //karena koneksi local kebut, jadi terpaksa kita tahan 2 detik utk munculin loadernya cuy
      setTimeout(() => {
        this.setState({ isLoading: false });
        window.location.href = "/dashboard";
      }, 2000);
    });
  };
  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <h3 class="text-center">Register</h3>
          <Formik
            initialValues={{
              username: "",
              password: "",
              fullname: "",
              phone: "",
              note: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              this.onRegister(values);
            }}
          >
            {({ errors, touched }) => (
              <div class="row justify-content-center">
                <div class="col-lg-4">
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      {errors.username && touched.username ? <i style={{ fontSize: 10, color: "red", marginLeft: 5 }}>{errors.username}</i> : null}
                      <Field type="text" placeholder="Your Username" name="username" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      {errors.password && touched.password ? <i style={{ fontSize: 10, color: "red", marginLeft: 5 }}>{errors.password}</i> : null}
                      <Field type="password" placeholder="Your Password" name="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fullname</label>
                      {errors.fullname && touched.fullname ? <i style={{ fontSize: 10, color: "red", marginLeft: 5 }}>{errors.fullname}</i> : null}
                      <Field type="text" placeholder="Your Fullname" name="fullname" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      {errors.phone && touched.phone ? <i style={{ fontSize: 10, color: "red", marginLeft: 5 }}>{errors.phone}</i> : null}
                      <Field type="number" placeholder="Your Phone" name="phone" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      {errors.note && touched.note ? <i style={{ fontSize: 10, color: "red", marginLeft: 5 }}>{errors.note}</i> : null}
                      <Field type="text" placeholder="Your Notes" name="note" className="form-control" />
                    </div>
                    <Button type="submit">
                      {this.state.isLoading ? (
                        <div className="spinner-border mt-2 text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </Container>
      </div>
    );
  }
}
