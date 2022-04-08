import React from "react";
import sliderApi from "../../services/sliders.service";
import { Button, Card, Form, FormInstance, Input, message, Space, Upload } from "antd";
import { BsPlus } from "react-icons/bs";
import styled from "styled-components";
import { SliderFormType } from "../../types/sliders.type";

const UploadCard = styled(Upload)`
    & .ant-upload-select-picture-card:hover {
        border-color: var(--ant-primary-color);
    }
    & .ant-upload {
        width: 400px;
        height: 150px;
        object-fit: contain;
        & img {
            height: 100%;
            object-fit: contain;
        }
    }
    svg {
        fill: #d9d9d9;
        transition: fill 200ms ease;
    }
    & span:hover svg {
        fill: var(--ant-primary-color);
    }
`;

interface SlidersFormProps {
    form: FormInstance<any>;
    sliderSelected: string;
    setSliderSelected: React.Dispatch<React.SetStateAction<string>>;
    setImageUrl: React.Dispatch<
        React.SetStateAction<{
            url?: string;
            base64?: string;
        }>
    >;
    imageUrl: {
        url?: string;
        base64?: string;
    };
}

function getBase64(img: any, callback: (values: any) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

const SlidersForm = ({ form, sliderSelected, setSliderSelected, imageUrl, setImageUrl }: SlidersFormProps) => {
    const [createSlider, { isLoading, isError, isSuccess, error }] = sliderApi.useCreateSliderMutation();
    const [updateSlider, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] = sliderApi.useUpdateSliderMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Thêm thành công", key: "handling" });
            onReset();
        }
    }, [isLoading, isError, isSuccess, error]);

    const handleChange = (info: any) => {
        getBase64(info.fileList[0].originFileObj, (imageUrl) =>
            setImageUrl({
                url: imageUrl,
                base64: imageUrl,
            })
        );
    };

    React.useEffect(() => {
        if (isLoadingEdit) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isErrorEdit) {
            message.error({ content: (errorEdit as { data: string }).data, key: "handling" });
        }
        if (isSuccessEdit) {
            message.success({ content: "Cập nhật thành công", key: "handling" });
            onReset();
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: SliderFormType) => {
        if (sliderSelected) {
            data.image = {
                url: "",
                base64: imageUrl.base64!,
            };
            updateSlider({ sliderId: sliderSelected, formData: data });
        } else {
            data.image = {
                url: imageUrl.url!,
                base64: imageUrl.base64!,
            };
            createSlider(data);
        }
    };

    const onReset = () => {
        form.resetFields();
        setSliderSelected("");
        setImageUrl({
            url: "",
            base64: "",
        });
    };

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 20 }}>
                    <Form.Item label="Hình ảnh" name="image" required={true} style={{ marginBottom: 0 }}>
                        <UploadCard fileList={[]} listType="picture-card" showUploadList={false} beforeUpload={() => false} onChange={handleChange}>
                            {imageUrl.url ? <img src={imageUrl.url} alt="avatar" style={{ width: "100%" }} /> : <BsPlus size={36} fill="#d9d9d9" />}
                        </UploadCard>
                    </Form.Item>
                    <div style={{ width: "100%", flex: 1 }}>
                        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]} style={{ marginBottom: 10 }}>
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Đường đãn" name="url" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]} style={{ marginBottom: 0 }}>
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                            <Button htmlType="button" onClick={onReset}>
                                Huỷ bỏ
                            </Button>
                            <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}>
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Form>
    );
};

export default SlidersForm;
