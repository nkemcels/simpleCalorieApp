import { Alert, Button, Card, Form, Input, notification, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ArrowRightIcon from "@ant-design/icons/ArrowRightOutlined";
import SimpleCenteredLayout from "../../../layouts/SimpleLayout/SimpleCenteredLayout";
import Styles from "./Login.scss";
import { useHistory } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import { CheckOutlined, LockFilled } from "@ant-design/icons";
import { AuthAction } from "../../../actions/AuthAction";
import illustrationImg from "../../../assets/img/illustration-1.webp";

type LoginBoxProps = {
    authDomain?: string | null;
    authID?: string | null;
    redirectTo?: string;
};

const LoginBox: React.FC<LoginBoxProps> = ({ authDomain, authID, redirectTo }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            setLoading(true);
            await AuthAction.loginUser(data.email, data.password);
        } catch (error) {
            notification.error({ message: "Authentication Failed", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={Styles.LoginBoxContainer}>
            <div className={Styles.IllustrationContainer}>
                <img src={illustrationImg} />
            </div>
            <div className={Styles.MainContent}>
                <div className={Styles.FormContentContainer}>
                    <div className={Styles.SignInTip}>
                        <div className={Styles.Text}>Already have an account?</div>
                        <Button size="small">Sign In</Button>
                    </div>
                    <div className={Styles.FormContentHeader}>
                        <div className={Styles.WelcomeText}>Welcome to CalorieApp</div>
                        <div className={Styles.SubHeader}>Create your account</div>
                    </div>
                    <div className={Styles.FormContent}>
                        <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item name="names" label="Names" rules={[{ required: true }]}>
                                <Input placeholder="Enter your names..." disabled={loading} />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                <Input placeholder="Enter email..." disabled={loading} />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input.Password placeholder="Choose a password..." disabled={loading} />
                            </Form.Item>
                            <div className={Styles.ActionWrapper}>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    disabled={loading}
                                    loading={loading}
                                    icon={<CheckOutlined />}
                                    style={{ width: 200 }}
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const LoginPage = () => {
    const [redirectTo, setRedirectTo] = useState<string>();
    const history = useHistory();

    useEffect(() => {
        setRedirectTo(history.location.state);
    }, []);
    return (
        <SimpleCenteredLayout>
            <div className={Styles.Container}>
                <LoginBox redirectTo={redirectTo} />
            </div>
        </SimpleCenteredLayout>
    );
};

export default LoginPage;
