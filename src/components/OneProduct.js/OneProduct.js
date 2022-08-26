import React, { forwardRef } from "react";
import { addProduct, deleteProduct, deleteFromFavorite } from "../../store/slice/productsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFavorite } from "../../store/slice/productsSlice";
import { motion } from "framer-motion";

export const OneProduct = forwardRef(
    ({ image, product, id, fav,title, price },ref) => {
        const dispatch = useDispatch();
        const [check, setChecked] = useState(false);
        const [checkFav, setCheckedFav] = useState(false);

        const deleteFav = () => {
            dispatch(deleteFromFavorite(id));
            setCheckedFav(false);
        };

        const addProducts = () => {
            dispatch(addProduct(product));
            setChecked(true);
        };

        const addFav = () => {
            dispatch(addFavorite(product));
            setCheckedFav(true);
        };
        const deleteFromProduct = () => {
            dispatch(deleteProduct(id));
            setChecked(false);
        };

        return (
            <div ref={ref}

                className="card-product relative gap-4 flex flex-col justify-between items-center"
            >
                <div>
                    <img src={image} alt="product" />
                </div>
                <p>{title}</p>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="paragraph">Price: {price} $</p>
                    </div>

                    {check ? (
                        <div
                            onClick={deleteFromProduct}
                            className="border-card bg-green-700 w-10 h-10"
                        >
                            <img src="/img/check.png" alt="check" />
                        </div>
                    ) : (
                        <div onClick={addProducts} className="border-card w-10 h-10">
                            <img src="/img/plus.png" alt="plus" />
                        </div>
                    )}
                </div>
                {checkFav || fav ? (
                    <div
                        onClick={deleteFav}
                        className="absolute border-card bg-red-400 left-5 w-8 h-8 top-3"
                    >
                        <img src="img/redHeart.png" className="w-3 h-3" alt="redHeart" />
                    </div>
                ) : (
                    <div onClick={addFav} className="absolute border-card left-5 w-8 h-8 top-3">
                        <img src="img/favorite.png" className="w-3 h-3" alt="favorite" />
                    </div>
                )}
            </div>
        );
    }
);

export const MOneProduct = motion(OneProduct);
