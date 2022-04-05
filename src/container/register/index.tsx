import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Card,
  Button,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";

//form
import { useFormik } from "formik";
import * as yup from "yup";

//services
import { useRegister } from "services/user";
import { RegisterResponse } from "services/user/types";

//utility
import { http } from "utils/http";

//cp
import LoginLayout from "components/layouts/LoginLayout";

interface FormValues {
  email: string;
  password: string;
  confirmPassowrd: string;
}

const RegisterContainer = (): JSX.Element => {
  const { isLoading, mutate } = useRegister();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassowrd: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("enter valid email").required("email is requred"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassowrd: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords should match")
      .required("Confirm password is required"),
  });

  const onSuccess = (data: RegisterResponse) => {
    if (data?.token) {
      localStorage.setItem("myoncare-token", data?.token);

      http.interceptors.request.use((request: AxiosRequestConfig) => {
        if (request.headers) {
          request.headers.Authorization = data?.token;
        }

        return request;
      });

      navigate("/login");
    }
  };

  const onSubmit = async (values: FormValues) => {
    mutate({ email: values?.email, password: values.password }, { onSuccess });
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <LoginLayout>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <form onSubmit={form.handleSubmit}>
            <Stack spacing={4}>
              <Typography gutterBottom variant="h5" component="div">
                Register User
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  error={form.touched.email && Boolean(form.errors.email)}
                  helperText={form.touched.email && form.errors.email}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.values.password}
                  onChange={form.handleChange}
                  error={form.touched.password && Boolean(form.errors.password)}
                  helperText={form.touched.password && form.errors.password}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassowrd"
                  type="password"
                  value={form.values.confirmPassowrd}
                  onChange={form.handleChange}
                  error={
                    form.touched.confirmPassowrd &&
                    Boolean(form.errors.confirmPassowrd)
                  }
                  helperText={
                    form.touched.confirmPassowrd && form.errors.confirmPassowrd
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" size="large">
                  Register
                  {isLoading && <CircularProgress size={12} />}
                </Button>
                <Button href="/login" variant="outlined" size="large">
                  Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </LoginLayout>
  );
};

export default RegisterContainer;
