import React from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../types/categories.type";

interface HomeCategoriesProps {
    data?: CategoryType[];
}

const HomeCategories = ({ data }: HomeCategoriesProps) => {
    return (
        <div className="ms-card">
            <div className="ms-categories__box">
                {data?.map((category, index) => (
                    <Link to={`/${category.nameAscii}`} className="ms-categories__box-item" key={index}>
                        <div className="ms-categories__box-item-img">
                            <img src={category.image} alt="" />
                        </div>
                        <div className="ms-categories__box-item-name">{category.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeCategories;
