import React from "react";
import brandApi from "../../services/brands.service";
import categoryApi from "../../services/categories.service";
import configurationApi from "../../services/configurations.service";
import styled from "styled-components";
import { BsPlus, BsTrash } from "react-icons/bs";
import { Button, Card, Form, FormInstance, Input, InputNumber, message, Modal, Select, Tabs, Typography, Upload } from "antd";
import productApi from "../../services/products.service";

const { TextArea } = Input;
const { TabPane } = Tabs;

const UploadCard = styled(Upload)`
    & .ant-upload-select-picture-card:hover {
        border-color: var(--ant-primary-color);
    }
    svg {
        fill: #d9d9d9;
        transition: fill 200ms ease;
    }
    & span:hover svg {
        fill: var(--ant-primary-color);
    }
`;

interface ProductFormProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    fileList: any[];
    setFileList: React.Dispatch<any>;
    onReset?: () => void;
    edit?: boolean;
    loading?: boolean;
}

const ProductForm = ({ fileList, form, onFinish, setFileList, onReset, edit = false, loading = false }: ProductFormProps) => {
    const { data: brands } = brandApi.useFetchBrandsListQuery();
    const [previewImage, setPreviewImage] = React.useState<string>("");
    const [previewTitle, setPreviewTitle] = React.useState<string>("");
    const { data: categories } = categoryApi.useFetchCategoriesListQuery();
    const { data: configurations } = configurationApi.useFetchConfigurationsListQuery();
    const { data: variants } = productApi.useFetchProductVariantsListQuery();
    const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = async (data: any) => {
        const accepts = ["image/gif", "image/jpeg", "image/png"];
        const extensionFile = accepts.map((item) => item.split("image/")[1]);
        if (data.file.size / 1024 / 1024 > 2) {
            message.error("K??ch th?????c ???nh t???i ??a 2MB");
            return;
        } else if (!accepts.includes(data.file.type)) {
            message.error(`H??nh ???nh ph???i thu???c m???t trong c??c ?????nh d???ng sau: ${extensionFile.join(", ")}`);
            return;
        }

        const files = data.fileList.map((item: any) => {
            if (item.originFileObj) {
                getBase64(item.originFileObj).then((result) => (item.base64 = result));
            }
            return item;
        });

        setFileList(files);
    };

    return (
        <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                {!loading && (
                    <>
                        <Form.Item label="H??nh ???nh" style={{ alignItems: "center" }} required={true}>
                            <UploadCard beforeUpload={() => false} listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                                {fileList.length >= 8 ? null : <BsPlus size={36} fill="#d9d9d9" />}
                            </UploadCard>
                            <small>(T???i l??n ??t nh???t 1 ???nh v?? t???i ??a 8 ???nh)</small>
                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                        <Form.Item label="T??n s???n ph???m" name="name" rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}>
                            <Input placeholder="Nh???p v??o" />
                        </Form.Item>
                        <Form.Item label="M?? t???" name="description" rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}>
                            <TextArea rows={4} placeholder="Nh???p v??o" showCount maxLength={255} />
                        </Form.Item>
                    </>
                )}
            </Card>
            {!loading && (
                <Tabs defaultActiveKey="globals">
                    <TabPane tab="Th??ng tin chung" key="globals">
                        <Card style={{ marginBottom: 16 }}>
                            <Form.Item
                                label="SKU"
                                name="sku"
                                rules={[
                                    { required: true, message: "Vui l??ng nh???p th??ng tin" },
                                    { max: 8, message: "Nh???p t???i ??a 8 k?? t???" },
                                ]}
                            >
                                <Input placeholder="Nh???p v??o" disabled={edit} />
                            </Form.Item>
                            <Form.Item label="Gi?? ti???n" name="price" rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}>
                                <InputNumber placeholder="Nh???p v??o" style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item label="Gi?? ???? gi???m" name="cost">
                                <InputNumber placeholder="Nh???p v??o" style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item label="Danh m???c" name="category" rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}>
                                <Select placeholder="L???a ch???n" allowClear showSearch optionFilterProp="children">
                                    {categories?.map((item) => (
                                        <Select.Option key={item._id} value={item._id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Th????ng hi???u" name="brand" rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}>
                                <Select placeholder="L???a ch???n" allowClear showSearch optionFilterProp="children">
                                    {brands?.map((item) => (
                                        <Select.Option key={item._id} value={item._id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="N???i b???t" name="isFeatured">
                                <Select placeholder="L???a ch???n" allowClear showSearch optionFilterProp="children">
                                    <Select.Option value={false}>S???n ph???m th?????ng</Select.Option>
                                    <Select.Option value={true}>N???i b???t</Select.Option>
                                </Select>
                            </Form.Item>
                        </Card>
                    </TabPane>
                    <TabPane tab="Th??ng tin c???u h??nh/th??ng s???" key="configurations">
                        <Card style={{ marginBottom: 16 }}>
                            <Form.List name="configurations">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                                            >
                                                Th??m c???u h??nh
                                            </Button>
                                        </Form.Item>
                                        {fields.map((field) => (
                                            <Input.Group compact key={field.key}>
                                                <Form.Item
                                                    name={[field.name, "configuration"]}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0, marginTop: 16, width: "30%" }}
                                                    rules={[{ required: true, message: "Vui l??ng ch???n th??ng tin" }]}
                                                >
                                                    <Select placeholder="L???a ch???n" style={{ width: "100%" }} showSearch allowClear>
                                                        {configurations?.map((item) => (
                                                            <Select.Option key={item._id}>{item.name}</Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    wrapperCol={{ span: 24 }}
                                                    name={[field.name, "specName"]}
                                                    style={{ marginBottom: 0, marginTop: 16, width: "60%" }}
                                                    rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}
                                                >
                                                    <Input placeholder="Nh???p v??o" style={{ width: "100%" }} />
                                                </Form.Item>
                                                <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0, marginTop: 16, width: "10%" }}>
                                                    <Button
                                                        onClick={() => remove(field.name)}
                                                        block
                                                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                    >
                                                        <BsTrash />
                                                    </Button>
                                                </Form.Item>
                                            </Input.Group>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                        </Card>
                    </TabPane>
                    <TabPane tab="Bi???n th???" key="variants">
                        <Card style={{ marginBottom: 16 }}>
                            <Form.List name="variants">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                                            >
                                                Th??m bi???n th???
                                            </Button>
                                        </Form.Item>
                                        {fields.map((field) => (
                                            <div key={field.key}>
                                                <Input.Group compact>
                                                    <Form.Item
                                                        name={[field.name, "storage"]}
                                                        wrapperCol={{ span: 24 }}
                                                        style={{ marginBottom: 0, marginTop: 16, width: "30%" }}
                                                        rules={[{ required: true, message: "Vui l??ng ch???n th??ng tin" }]}
                                                    >
                                                        <Select placeholder="B??? nh???" style={{ width: "100%" }} showSearch allowClear>
                                                            {variants
                                                                ?.filter((v) => v.type === "storage")
                                                                .map((variant) => (
                                                                    <Select.Option key={variant._id}>{variant.name}</Select.Option>
                                                                ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        wrapperCol={{ span: 24 }}
                                                        name={[field.name, "price"]}
                                                        style={{ marginBottom: 0, marginTop: 16, width: "30%" }}
                                                        rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}
                                                    >
                                                        <InputNumber placeholder="Gi?? ti???n" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        wrapperCol={{ span: 24 }}
                                                        name={[field.name, "cost"]}
                                                        style={{ marginBottom: 0, marginTop: 16, width: "30%" }}
                                                    >
                                                        <InputNumber placeholder="Gi?? ???? gi???m" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                    <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0, marginTop: 16, width: "10%" }}>
                                                        <Button
                                                            onClick={() => remove(field.name)}
                                                            block
                                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                        >
                                                            <BsTrash />
                                                        </Button>
                                                    </Form.Item>
                                                </Input.Group>
                                                <div style={{ marginTop: "16px", marginLeft: "100px" }}>
                                                    <Form.List name={[field.name, "colors"]}>
                                                        {(fieldColors, { add: addColor, remove: removeColor }) => (
                                                            <>
                                                                <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => addColor()}
                                                                        block
                                                                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                                                                    >
                                                                        Th??m m??u s???c
                                                                    </Button>
                                                                </Form.Item>
                                                                {fieldColors.map((fieldColor) => (
                                                                    <Input.Group compact key={fieldColor.key}>
                                                                        <Form.Item
                                                                            name={[fieldColor.name, "color"]}
                                                                            wrapperCol={{ span: 24 }}
                                                                            style={{ marginBottom: 0, marginTop: 16, width: "45%" }}
                                                                            rules={[{ required: true, message: "Vui l??ng ch???n th??ng tin" }]}
                                                                        >
                                                                            <Select placeholder="M??u s???c" style={{ width: "100%" }} showSearch allowClear>
                                                                                {variants
                                                                                    ?.filter((v) => v.type === "color")
                                                                                    .map((variant) => (
                                                                                        <Select.Option key={variant._id}>{variant.name}</Select.Option>
                                                                                    ))}
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            wrapperCol={{ span: 24 }}
                                                                            name={[fieldColor.name, "stock"]}
                                                                            style={{ marginBottom: 0, marginTop: 16, width: "45%" }}
                                                                            rules={[{ required: true, message: "Vui l??ng nh???p th??ng tin" }]}
                                                                        >
                                                                            <InputNumber placeholder="S??? l?????ng trong kho" style={{ width: "100%" }} />
                                                                        </Form.Item>
                                                                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0, marginTop: 16, width: "10%" }}>
                                                                            <Button
                                                                                onClick={() => removeColor(fieldColor.name)}
                                                                                block
                                                                                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                                            >
                                                                                <BsTrash />
                                                                            </Button>
                                                                        </Form.Item>
                                                                    </Input.Group>
                                                                ))}
                                                            </>
                                                        )}
                                                    </Form.List>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                        </Card>
                    </TabPane>
                </Tabs>
            )}
            <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "end", gap: "5px" }}>
                    {onReset && (
                        <Button htmlType="button" onClick={onReset}>
                            Nh???p l???i
                        </Button>
                    )}
                    <Button
                        htmlType={fileList.length > 0 ? "submit" : "button"}
                        onClick={() => fileList.length === 0 && message.error("Vui l??ng t???i l??n ??t nh???t 1 ???nh")}
                        type="primary"
                        style={{ minWidth: 150 }}
                    >
                        L??u
                    </Button>
                </div>
            </Card>
        </Form>
    );
};

export default ProductForm;
