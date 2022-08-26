import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MOneProduct } from "../components/OneProduct.js/OneProduct";
import { animationConfig } from "../utility/animationConfig";

const Favorite = () => {
    const favorite = useSelector((state) => state.products.favorite);
    const [fav, setFav] = useState(true);

    return (
        <div>
            <h1 className="headers sm:mb-6">Мої закладки</h1>
            {favorite.length === 0 && (
                <div className="flex flex-col justify-center items-center w-full gap-3 ">
                    <img src="/img/bad.png" alt="" />
                    <p className="headers">закладок нема(</p>
                    <p className="message">Ви ще нічого не добавили в закладки</p>
                    <NavLink to="/">
                        <button className="mt-8 md:mt-7 sm:mt-5 button">
                            Повернутись на головну
                        </button>
                    </NavLink>
                </div>
            )}
            <section className="flex flex-wrap gap-2 mt-10">
                {favorite === undefined ? (
                    <p>ffffff</p>
                ) : (
                    favorite.map((product, index) => {
                        return (
                            <MOneProduct
                                variants={animationConfig}
                                custom={index}
                                initial={animationConfig.hidden}
                                animate={animationConfig.visible}
                                fav={fav}
                                id={product.id}
                                product={product}
                                image={product.image}
                                title={product.title}
                                key={product.id}
                            ></MOneProduct>
                        );
                    })
                )}
            </section>
        </div>
    );
};

export default Favorite;
