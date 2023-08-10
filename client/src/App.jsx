import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.Landing />} />
        <Route path="/groups" element={<Pages.GroupsPage />} />
        <Route path="/group/:id" element={<Pages.GroupPage />} />
      </Routes>
    </>
  );
}

export default App;
