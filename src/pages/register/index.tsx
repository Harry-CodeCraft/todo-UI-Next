import React from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { UserLgoinCredentials } from "@/lib/types/auth.login";
import { useAppDispatch } from "@/lib/redux/hook";
import { authActionCreator } from "@/lib/action/auth.action";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  forogotBtn: {
    textAlign: "right",
    "& .MuiButton-root": {
      width: "160px",
      padding: "0",
      justifyContent: "flex-end",
    },
  },
  card: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
});

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const classes = useStyles();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(50, "First name must be 50 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(50, "Last name must be 50 characters or less")
      .required("Last name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const registerHandler = (formState: UserLgoinCredentials) => {
    console.log(formState);
    dispatch(authActionCreator(formState));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ padding: 3 }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Create an Account
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Please fill in the details to register
              </Typography>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  registerHandler(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      error={touched.firstName && !!errors.firstName}
                      helperText={<ErrorMessage name="firstName" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      error={touched.lastName && !!errors.lastName}
                      helperText={<ErrorMessage name="lastName" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={<ErrorMessage name="phoneNumber" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      error={touched.email && !!errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={touched.password && !!errors.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      onClick={() => router.push("/login")}
                    >
                      Back to Login
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;