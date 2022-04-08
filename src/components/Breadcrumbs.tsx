import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface BreadcrumsProps {
    home?: {
        url?: string;
        title?: string;
    };
    data?: {
        url?: string;
        title?: string;
    }[];
}

const Breadcrumbs = ({ home = { url: "/", title: "Trang chủ" }, data }: BreadcrumsProps) => {
    return (
        <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>{home.url ? <Link to={home.url}>{home.title}</Link> : home.title}</Breadcrumb.Item>
            {data?.map((item, index) => (
                <Breadcrumb.Item key={index}>{item.url ? <Link to={item.url}>{item.title}</Link> : item.title}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
