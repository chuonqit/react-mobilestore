import React from "react";
import styled from "styled-components";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PayloadLogin } from "../../types/users.type";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { clearAuth } from "../../stores/slices/auth.slice";
import authApi from "../../services/auth.service";

const StyledLoginPage = styled.div`
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

const StyledLoginForm = styled.div`
    width: 348px;
    background-color: #ffffff;
    padding: 24px 24px 0;
    border-radius: 6px;
    box-shadow: 0px 2px 0px #ddd;

    & button {
        width: 100%;
        margin-top: 10px;
    }

    & .site-form-item-icon {
        margin-right: 5px;
    }

    & .ant-input-affix-wrapper {
        padding-top: 0;
        padding-bottom: 0;
    }

    & input {
        line-height: 32px;
    }
`;

const StyledLoginFormTitle = styled.div`
    margin-bottom: 24px;
    font-size: 30px;
    text-align: center;
    font-weight: 500;
`;

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [login, { isLoading, isSuccess, isError, error }] = authApi.useLoginMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Đăng nhập thành công", key: "handling" });
        }
        if (isAuthenticated) {
            navigate("/admin", { replace: true });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
            dispatch(clearAuth());
        }
    }, [isAuthenticated, isError, error, isLoading, dispatch, isSuccess]);

    const onFinish = (payload: PayloadLogin) => {
        login(payload);
    };

    return (
        <StyledLoginPage>
            <StyledLoginForm>
                <Form initialValues={{ remember: true }} form={form} onFinish={onFinish}>
                    <StyledLoginFormTitle>
                        Admin <strong>Login</strong>
                    </StyledLoginFormTitle>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập tài khoản" },
                            { type: "email", message: "Vui lòng nhập email" },
                        ]}
                    >
                        <Input prefix={<AiOutlineUser className="site-form-item-icon" />} placeholder="Tài khoản" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                        <Input prefix={<AiOutlineUnlock className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng nhập
                        </Button>
                        <Button className="login-form-button">
                            <Link to="/">Cửa hàng</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </StyledLoginForm>
        </StyledLoginPage>
    );
};

export default Login;
