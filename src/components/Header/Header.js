import React from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearProductNoAuth } from "../../store/slice/productsSlice";
import { motion } from "framer-motion";

const Header = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOutFromCabinet = () => {
        signOut(auth)
            .then(() => {
                dispatch(clearProductNoAuth());
                navigate("/");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <header className="flex justify-between items-center sm:flex-col sm:gap-5">
            <div className="flex gap-2 items-center">
                <div>
                    <NavLink to="/">
                        <img className="w-10 h-10" src="/img/logo.png" alt="logo" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/">
                        <h1 className="headers">react clothes</h1>
                        <p>Магазин одягу</p>
                    </NavLink>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2">
                {auth.currentUser === null ? (
                    <>
                        <NavLink to="/login">
                            <motion.button
                                whileHover={{
                                    scale: 1.2,
                                }}
                                className="button"
                            >
                                Ввійти
                            </motion.button>
                        </NavLink>
                        <NavLink to="/registration">
                            <motion.button
                                whileHover={{
                                    scale: 1.2,
                                }}
                                className="button"
                            >
                                Реєстрація
                            </motion.button>
                        </NavLink>
                    </>
                ) : (
                    <motion.button
                        whileHover={{
                            scale: 1.2,
                        }}
                        className="button"
                        onClick={signOutFromCabinet}
                    >
                        Вийти
                    </motion.button>
                )}
            </div>
            <nav className="flex items-center justify-between gap-8">
                <div>
                    <NavLink to="/basket">
                        <img src="/img/shop.png" alt="" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/favorite">
                        <img src="/img/favorite.png" alt="" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/profile">
                        <img src="/img/profile.png" alt="" />
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
