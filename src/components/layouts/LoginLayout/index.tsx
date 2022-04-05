import { Container, Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LoginLayout = (props: Props): JSX.Element => {
  const { children } = props;
  return (
    <Container>
      <Box
        sx={{ height: "100vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Container>
  );
};

export default LoginLayout;
