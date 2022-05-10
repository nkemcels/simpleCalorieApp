import { Alert, Button, Card, Form, Input, notification, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./Login.scss";
import { useHistory } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import { CheckOutlined, LockFilled } from "@ant-design/icons";
import { AuthAction } from "../../../actions/AuthAction";
import SimpleCenteredLayout from "../../../layouts/SimpleLayout/SimpleCenteredLayout";
import { RouteAction } from "../../../actions/RouteAction";

type LoginBoxProps = {
    authDomain?: string | null;
    authID?: string | null;
    redirectTo?: string;
};

const LoginBox: React.FC<LoginBoxProps> = ({ authDomain, authID, redirectTo }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleGotoSignup = () => {
        RouteAction.gotoSignup();
    };

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
            <div className={Styles.LoginBoxHeader}>
                <div className={Styles.WelcomeText}>Simple CalorieApp</div>
                <div className={Styles.SigninText}>Please signin to continue</div>
                <div className={Styles.LogoWrapper}>
                    <LockFilled style={{ fontSize: 32 }} />
                </div>
            </div>
            <div className={Styles.FormContent}>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input placeholder="Enter email..." disabled={loading} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Enter password..." disabled={loading} />
                    </Form.Item>
                    <div className={Styles.ActionWrapper}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                            loading={loading}
                            icon={<CheckOutlined />}
                            style={{ width: "100%" }}
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </Button>
                    </div>
                    <div className={Styles.BottomView}>
                        <div className={Styles.OrLine}>
                            <div className={Styles.OrText}>OR</div>
                        </div>
                        <Button style={{ width: "100%" }} onClick={handleGotoSignup}>
                            Create My Account
                        </Button>
                    </div>
                </Form>
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
