import React from "react";
import { Button } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Admin/TableCustom";
import Breadcrumbs from "../../../components/Breadcrumbs";

interface PromotionsListProps {}

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
];

const data = [
    {
        name: "Chuong",
    },
    {
        name: "Sung",
    },
    {
        name: "Phao",
    },
];

const PromotionsList = (props: PromotionsListProps) => {
    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả khuyến mãi", url: "/admin/promotions" }]} />
            <Button size="large" type="primary" style={{ marginBottom: 16 }}>
                <Link to="/admin/promotions/new" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <BiPlusMedical style={{ marginTop: "-2px" }} />
                    Thêm 1 khuyến mãi mới
                </Link>
            </Button>
            <TableCustom column={columns} data={data} />
        </>
    );
};

export default PromotionsList;
