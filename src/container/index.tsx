import { Route, Routes } from "react-router-dom";

//containers
import RegisterContainer from "./register";
import LoginContainer from "./login";
import DashboardContainer from "./dashboard";

const ContainersRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/  login" element={<LoginContainer />} />
      <Route path="/" element={<DashboardContainer />} />
      {/* <ProtectedRoute path="/" element={<DashboardContainer />} /> */}
    </Routes>
  );
};

export default ContainersRouter;

interface Props {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute = (props: Props) => {
  return <Route {...props} />;
};
