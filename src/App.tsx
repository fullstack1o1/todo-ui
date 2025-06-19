import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./page/HomePage/Home.page";
import { UserPosts } from "./page/UserPosts/UserPosts.page";
import DeleteTag from "./page/DeleteTag/DeleteTag.page";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPosts />} />
        <Route path="/user/:userId/delete-tag" element={<DeleteTag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
