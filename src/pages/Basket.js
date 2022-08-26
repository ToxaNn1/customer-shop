import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/slice/productsSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { clearProduct } from "../store/slice/productsSlice";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { animationConfig } from "../utility/animationConfig";

const Basket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    const purchase = useSelector((state) => state.products.purchase);

    const [resultSuma, setResult] = useState(0);
    const [suma, setSuma] = useState(0);
    const [orderDone, setOrder] = useState(false);

    const deleteFromPurshase = (id) => {
        dispatch(deleteProduct(id));
    };

    const calculate = useCallback(() => {
        let sum = 0;
        purchase.forEach((item) => {
            sum += item.price;
        });
        setSuma(sum);
        setResult((5 * sum) / 100);
    }, [purchase]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const clear = () => {
        if (auth.currentUser === null) {
            navigate("/login");
        } else {
            setOrder(true);
            dispatch(clearProduct());
        }
    };

    return (
        <div>
            {orderDone ? (
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src="img/orderDone.png" alt="order" />
                    <p className="headers">Замовлення оформлено</p>
                    <p className="paragraph">Ваше Замовлння скоро буде передано доставці</p>
                    <NavLink to="/profile">
                        <button className="button">До мого кабінету</button>
                    </NavLink>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-5 sm:flex-col sm:gap-3">
                        <h1 className="headers">Корзина</h1>
                        {purchase.length === 0 ? null : (
                            <>
                                <div>
                                    <p>
                                        Загальна сума: <span className="font-bold">{suma} $</span>
                                    </p>
                                    <p>
                                        Податок 5%:{" "}
                                        <span className="font-bold"> {resultSuma} $</span>
                                    </p>
                                </div>
                                <div>
                                    <button className="button" onClick={clear}>
                                        Оформити заказ{" "}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <section className="flex flex-wrap gap-2">
                        {purchase.length === 0 ? (
                            <div className="flex flex-col justify-center items-center w-full gap-3 sm:mb-5">
                                <img src="/img/basket.png" alt="box" />
                                <p className="headers">Корзина пуста(</p>
                                <p className="message">Добавте щось, щоб оформити замовлення</p>
                                <NavLink to="/">
                                    <button className="button mt-8 md:mt-7 sm:mt-5">
                                        Повернутись на головну
                                    </button>
                                </NavLink>
                            </div>
                        ) : (
                            purchase.map((item, index) => {
                                return (
                                    <motion.div
                                        variants={animationConfig}
                                        custom={index}
                                        initial={animationConfig.hidden}
                                        animate={animationConfig.visible}
                                        key={item.id}
                                        className="card-product relative gap-4 flex flex-col justify-between items-center"
                                    >
                                        <div
                                            onClick={() => deleteFromPurshase(item.id)}
                                            className="border-card absolute top-1 left-4  w-8 h-8"
                                        >
                                            <img src="/img/cross.png" alt="cross" />
                                        </div>
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
                </>
            )}
        </div>
    );
};

export default Basket;
