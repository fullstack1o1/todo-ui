import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./page/HomePage/Home.page";
import { UserPosts } from "./page/UserPosts/UserPosts.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPosts />} />
        <Route path="/user/:userId/createTodo" element={<UserPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
