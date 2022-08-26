import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./pages/Login";
import Basket from "./pages/Basket";
import Registration from "./pages/Registration";
import Favorite from "./pages/Favorite";
import Profile from "./pages/Profile";

function App() {
    return (
        <div className="main-wrapper p-12">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AllProducts />}></Route>
                    <Route path="registration" element={<Registration />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="basket" element={<Basket />}></Route>
                    <Route path="profile" element={<Profile />}></Route>
                    <Route path="favorite" element={<Favorite />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
