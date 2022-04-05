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
import { useLogin } from "services/user";
import { LoginResponse } from "services/user/types";

//utility
import { http } from "utils/http";

//cp
import LoginLayout from "components/layouts/LoginLayout";

interface FormValues {
  email: string;
  password: string;
}

const LoginContainer = (): JSX.Element => {
  const { isLoading, mutate } = useLogin();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("enter valid email").required("email is requred"),
    password: yup.string().min(6).required("Password is required"),
  });

  const onSuccess = (data: LoginResponse) => {
    if (data?.token) {
      localStorage.setItem("myoncare-token", data?.token);

      http.interceptors.request.use((request: AxiosRequestConfig) => {
        if (request.headers) {
          request.headers.Authorization = data?.token;
        }

        return request;
      });

      navigate("/");
    }
  };

  const onSubmit = async (values: FormValues) => {
    mutate(values, { onSuccess });
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
                Login User
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
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" size="large">
                  Login
                  {isLoading && <CircularProgress size={12} />}
                </Button>
                <Button href="/register" variant="outlined" size="large">
                  Register
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </LoginLayout>
  );
};

export default LoginContainer;
