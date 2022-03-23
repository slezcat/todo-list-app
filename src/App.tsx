import { FC } from "react";
import Login from "./pages/Login";

import Task from "./pages/Todo";

const App: FC = () => {
  return (
    <>
      <Login/>
      <Task />
    </>
  );
};

export default App;
