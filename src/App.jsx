import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./routes/signIn";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Posts from "./routes/posts";
import Author from "./routes/author";
import Navigation from "./components/navigation/navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/posts" element={<PrivateRoute />}>
          <Route path="/posts" element={<Posts />} />
        </Route>
        <Route path="/create" element={<PrivateRoute />}>
          <Route path="/create" element={<Author />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
