import { Alert, Button, Card, Form, Input, notification, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./Login.scss";
import { useHistory } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import { CheckOutlined, LockFilled } from "@ant-design/icons";
import { AuthAction } from "../../../actions/AuthAction";
import SimpleCenteredLayout from "../../../layouts/SimpleLayout/SimpleCenteredLayout";
import { RouteAction } from "../../../actions/RouteAction";
import { TAuthCredentials } from "../../../models/Auth";

type LoginBoxProps = {
    onLoginComplete: () => void;
};

const LoginBox: React.FC<LoginBoxProps> = ({ onLoginComplete }) => {
    const [loading, setLoading] = useState(false);
    const [authFaileError, setAuthFailedError] = useState<string>();

    const handleGotoSignup = () => {
        RouteAction.gotoSignup();
    };

    const handleLogin = async (data: TAuthCredentials) => {
        try {
            setLoading(true);
            setAuthFailedError(undefined);
            await AuthAction.loginUser(data);
            onLoginComplete();
        } catch (error) {
            setAuthFailedError(`${error}`);
            // notification.error({ message: "Authentication Failed", description: `${error}` });
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
            {authFaileError && <Alert message={authFaileError} type="error" closable showIcon />}
            <div className={Styles.FormContent}>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
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

    const handleGotoLogin = () => {
        if (redirectTo) RouteAction.goto(redirectTo);
        else RouteAction.gotoHome();
    };

    useEffect(() => {
        setRedirectTo(history.location.state);
    }, []);
    return (
        <div className={Styles.Container}>
            <LoginBox onLoginComplete={handleGotoLogin} />
        </div>
    );
};

export default LoginPage;
