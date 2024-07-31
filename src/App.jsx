import { ConfigProvider } from "./Context/ConfigProvider.jsx";
import AppRouter from "./Components/AppRouter.jsx";
import "./App.css";

function App() {
  return (
    <ConfigProvider>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
