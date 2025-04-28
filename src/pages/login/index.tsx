import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
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

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { data } = useAppSelector((state) => state.authRoot.authState);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const loginHandler = (formState: UserLgoinCredentials) => {
    console.log(formState);
    dispatch(authActionCreator(formState));
  };

  useEffect(() => {
    if (data?.response?.code === 200 && data?.sessionId) {
      window.location.href = "/dashboard";
    }
  }, [data]);

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
                Welcome Back
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Please sign in to your account
              </Typography>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  loginHandler(values);
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
                    <Box className={classes.forogotBtn}>
                      <Button fullWidth variant="text" color="primary" disabled>
                        Forgot Password?
                      </Button>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
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

export default LoginPage;
