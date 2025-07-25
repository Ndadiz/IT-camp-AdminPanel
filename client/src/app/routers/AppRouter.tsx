import Admin from "@pages/admin";
import SignIn from "@pages/sign-in";
import { UserEditor } from "@widgets/user-edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "@widgets/users-list";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route index element={<UserList />} />
          <Route path="user/create" element={<UserEditor />} />
          <Route path="user/:id" element={<UserEditor />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
