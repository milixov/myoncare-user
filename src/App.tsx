import { QueryClientProvider, QueryClient } from "react-query";
import ContainersRouter from "./container";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContainersRouter />
    </QueryClientProvider>
  );
};

export default App;
