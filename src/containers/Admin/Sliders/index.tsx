import React from "react";
import { Button, Form, Image, message, Popconfirm, Space } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Admin/TableCustom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import sliderApi from "../../../services/sliders.service";
import SlidersForm from "../../../components/Admin/SlidersForm";

interface SlidersProps {}

const Sliders = (props: SlidersProps) => {
    const [form] = Form.useForm();
    const { data, isFetching } = sliderApi.useFetchSlidersListQuery();
    const [sliderSelected, setSliderSelected] = React.useState<string>("");
    const [deleteSlider, { isError, isLoading: isLoadingDelete, isSuccess, error }] = sliderApi.useDeleteSliderMutation();
    const [imageUrl, setImageUrl] = React.useState<{ url?: string; base64?: string }>({ url: "", base64: "" });

    React.useEffect(() => {
        if (isLoadingDelete) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Xoá thành công", key: "handling" });
        }
    }, [isError, isLoadingDelete, isSuccess]);

    const handleDeleteSlider = (sliderId: string) => {
        deleteSlider(sliderId);
    };

    const handleEdit = (sliderId: string) => {
        const slider = data?.find((category) => category._id === sliderId);
        form.setFieldsValue(slider);
        setImageUrl({
            url: slider?.image,
        });
        setSliderSelected(sliderId);
    };

    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "image",
            width: 240,
            render: (image: string) => (
                <>
                    <Image style={{ width: 210, height: 80, background: "#f2f2f2", objectFit: "contain" }} src={image} />
                </>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
        },
        {
            title: "Đường dẫn",
            dataIndex: "url",
            render: (url: string) => (
                <Button>
                    <a href={url} target="_blank">
                        Xem liên kết
                    </a>
                </Button>
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            render: (sliderId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(sliderId)}>Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteSlider(sliderId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả danh mục", url: "/admin/categories" }]} />
            <SlidersForm form={form} sliderSelected={sliderSelected} setSliderSelected={setSliderSelected} imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default Sliders;
