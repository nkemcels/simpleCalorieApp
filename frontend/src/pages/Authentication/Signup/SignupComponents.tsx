import { Button, Card, Form, Input, notification, Spin } from "antd";
import React, { useState } from "react";
import Styles from "./Signup.scss";
import { CheckOutlined, LockFilled } from "@ant-design/icons";
import { AuthAction } from "../../../actions/AuthAction";
import illustrationImg from "../../../assets/img/illustration-1.webp";
import { RouteAction } from "../../../actions/RouteAction";
import { TSignupData } from "../../../models/Auth/Auth";

type SignupBoxProps = {
    onSignupComplete: () => void;
};

type SignupFormProps = {
    onSignupComplete: (data: TSignupData) => void;
    loading?: boolean;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupComplete, loading }) => {
    return (
        <Form layout="vertical" onFinish={onSignupComplete}>
            <Form.Item name="names" label="Names" rules={[{ required: true }]}>
                <Input placeholder="Enter your names..." disabled={loading} />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input placeholder="Enter email..." disabled={loading} />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password placeholder="Choose a password..." disabled={loading} />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                    ({ getFieldValue }) => ({
                        validator: (_, val) =>
                            val === getFieldValue("password") ? Promise.resolve() : Promise.reject("Confirmation password doesn't match"),
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm your password..." disabled={loading} />
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
    );
};

export const SignupBox: React.FC<SignupBoxProps> = ({ onSignupComplete }) => {
    const [loading, setLoading] = useState(false);

    /**
     * Creates the user's account.
     */
    const handleCreateAccount = async (data: TSignupData) => {
        try {
            setLoading(true);
            await AuthAction.createUserAccount(data);
            await AuthAction.loginUser(data);
            onSignupComplete();
        } catch (error) {
            notification.error({ message: "Authentication Failed", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    /**
     * redirects the user to the login page
     */
    const handleGotoLogin = () => {
        RouteAction.gotoLogin();
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
                        <Button size="small" style={{ marginRight: 7 }} onClick={handleGotoLogin}>
                            Sign In
                        </Button>
                        instead
                    </div>
                    <div className={Styles.FormContentHeader}>
                        <div className={Styles.WelcomeText}>Welcome to CalorieApp</div>
                        <div className={Styles.SubHeader}>Create your account to continue</div>
                    </div>
                    <div className={Styles.FormContent}>
                        <SignupForm onSignupComplete={handleCreateAccount} loading={loading} />
                    </div>
                </div>
            </div>
        </Card>
    );
};
