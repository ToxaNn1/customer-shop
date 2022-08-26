import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { clearProductNoAuth } from "../store/slice/productsSlice";
import { motion } from "framer-motion";
import { animationConfig } from "../utility/animationConfig";

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const history = useSelector((store) => store.products.history);

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
        <div>
            <div className="flex justify-between items-center">
                <p className="headers sm:mb-5">Мої покупки</p>
                {auth.currentUser === null ? null : (
                    <button className="button" onClick={signOutFromCabinet}>
                        Вихід
                    </button>
                )}
            </div>
            <section className="flex flex-wrap gap-2">
                {history.length === 0 ? (
                    <div className="flex flex-col justify-center items-center w-full gap-3">
                        <img src="/img/bad.png" alt="bad" />
                        <p className="headers text-center">У Вас немає замовлень</p>
                        <p className="message">Оформіть хоть одне замовлення</p>
                        <NavLink to="/">
                            <button className="button mt-8 md:mt-7 sm:mt-5">
                                Повернутись на головну
                            </button>
                        </NavLink>
                    </div>
                ) : (
                    history.map((item, index) => {
                        return (
                            <motion.div
                            variants={animationConfig}
                            custom={index}
                            initial={animationConfig.hidden}
                            animate={animationConfig.visible}
                                key={item.id}
                                className="card-product relative gap-4 flex flex-col justify-between items-center"
                            >
                                <div>
                                    <img src={item.image} alt="product" />
                                </div>
                                <p>{item.title}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="paragraph">Price: {item.price} $</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </section>
        </div>
    );
};

export default Profile;
