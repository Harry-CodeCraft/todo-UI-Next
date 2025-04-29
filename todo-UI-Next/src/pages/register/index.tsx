import React from "react";
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
  const classes = useStyles();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
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
                initialValues={{ email: "", password: "", confirmPassword: "" }}
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