// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "../features/posts/pages/PostPage/PostPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
