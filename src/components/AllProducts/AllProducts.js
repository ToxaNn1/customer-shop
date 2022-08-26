import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchProduct, filterProducts } from "../../store/slice/productsSlice";
import Loader from "../Loader";
import { MOneProduct } from "../OneProduct.js/OneProduct";
import { animationConfig } from "../../utility/animationConfig";
import Filter from "../Filter";

const CategoryType = [
    { Man: "men's clothing" },
    { Women: "women's clothing" },
    { Electronics: "electronics" },
    { Jewelery: "jewelery" },
];
const categoryValue = ["Чоловічий одяг", "Жіночий одяг", "Електроніка", "Ювелірні вироби"];

const AllProducts = () => {
    const dispatch = useDispatch();
    const [filterActive, setFilterActive] = useState(false);
    const [category, setCategory] = useState([]);
    const [input, setInput] = useState("");
    const [activeIndex, setActive] = useState(0);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const allProductsInfo = useSelector((store) => store.products);

    const filteredArr = useMemo(() => {
        return allProductsInfo.product
            .filter((product) => (category.length ? category.includes(product.category) : true))
            .filter((product) => product.title.toLowerCase().includes(input.toLowerCase()));
    }, [input, category, allProductsInfo.product]);

    useEffect(() => {
        dispatch(filterProducts(category));
    }, [category, dispatch]);

    const toggleFilter = (event) => {
        const filterCategory = event.target.value;
        category.includes(filterCategory)
            ? setCategory((category) => category.filter((item) => item !== filterCategory))
            : setCategory((category) => [...category, filterCategory]);
    };

    return (
        <main>
            <div className="flex  items-center justify-between mb-10 sm:flex-col sm: gap-3">
                <h1 className="headers">Всі товари</h1>
                <div className="flex items-center relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="input"
                    />
                    <img
                        src="img/search.png"
                        className="w-3 h-3 absolute right-2 cursor-pointer"
                        alt="search"
                    />
                </div>
                <motion.button
                    whileHover={{
                        scale: 1.2,
                    }}
                    className="button"
                    onClick={() => setFilterActive((active) => !active)}
                >
                    Фільтр
                </motion.button>
            </div>
            <div className="flex justify-center">{allProductsInfo.loading && <Loader />}</div>
            {filterActive ? (
                <div>
                    <p>Фільтрувати по категоріям</p>
                    <motion.div className="flex justify-between  items-center my-5 md:flex-col md:gap-8 md:items-start">
                        {CategoryType.map((item,index) => {
                            return (
                                <Filter key={index}
                                    CategoryType={CategoryType[index]}
                                    value={categoryValue[index]}
                                    toggleFilter={toggleFilter}
                                    isSelected={activeIndex===index}
                                    handleClick={()=>setActive(index)}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            ) : null}
            <section className="flex flex-wrap justify-between items-start gap-10 sm:gap-5">
                {filteredArr.map((product, index) => {
                    return (
                        <MOneProduct
                            variants={animationConfig}
                            custom={index}
                            initial={animationConfig.hidden}
                            animate={animationConfig.visible}
                            id={product.id}
                            product={product}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            key={product.id}
                        ></MOneProduct>
                    );
                })}
            </section>
        </main>
    );
};

export default AllProducts;
