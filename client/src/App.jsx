import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Landing,
  Homepage,
  GroupsPage,
  GroupPage,
  PackingList,
  Profile,
  ProtectedRoute,
  Page404
} from "./pages"
import { AuthProvider } from "./contexts";
import { NavigationBar } from "./components";

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/welcome" element={<Landing />}/>
          <Route path="/" element={<ProtectedRoute redirectTo="/welcome" />}>
            <Route path="/" element={<NavigationBar />}>
              <Route index element={<Homepage />} />
              <Route path="/groups">
                <Route index element={<GroupsPage />} />
                <Route path=":id" element={<GroupPage />} />
              </Route>
              <Route path="/packing-list" element={<PackingList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/*" element={<Page404 />} />
            </Route>
          </Route>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
