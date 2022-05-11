import { Button, Card, DatePicker, Form, Input, notification, Radio, Steps } from "antd";
import React, { useState } from "react";
import Styles from "./Signup.scss";
import { CheckOutlined, LockFilled } from "@ant-design/icons";
import { AuthAction } from "../../../actions/AuthAction";
import illustrationImg from "../../../assets/img/illustration-1.webp";
import { RouteAction } from "../../../actions/RouteAction";
import { TSignupData } from "../../../models/Auth";
import moment from "moment";

type SignupBoxProps = {
    onSignupComplete: () => void;
};

type SignupFormProps = {
    onComplete: (data: Partial<TSignupData>) => void;
    loading?: boolean;
    btnText: string;
};

function isNumeric(str: any) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export const AppAccessDetailsForm: React.FC<SignupFormProps> = ({ onComplete: onSignupComplete, loading }) => {
    return (
        <Form layout="vertical" onFinish={onSignupComplete}>
            <Form.Item name="names" label="Names" rules={[{ required: true }]}>
                <Input placeholder="Enter your names..." disabled={loading} />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Enter email..." disabled={loading} />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
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

export const PersonalDetailsForm: React.FC<SignupFormProps> = ({ onComplete, loading, btnText }) => {
    return (
        <Form layout="vertical" onFinish={onComplete}>
            <Form.Item
                name="height"
                label="Your height (in cm)"
                requiredMark
                rules={[
                    ({ getFieldValue }) => ({
                        validator: (_, val) =>
                            isNumeric(getFieldValue("height"))
                                ? Number(getFieldValue("height")) < 10 || Number(getFieldValue("height")) > 500
                                    ? Promise.reject("Height is abnormally large. Must be between 10 - 500 cm")
                                    : Promise.resolve()
                                : Promise.reject("Invalid height value"),
                    }),
                ]}
            >
                <Input placeholder="Enter your height..." disabled={loading} addonAfter="cm" />
            </Form.Item>

            <Form.Item
                name="weight"
                label="Your weight (in kg)"
                requiredMark
                rules={[
                    ({ getFieldValue }) => ({
                        validator: (_, val) =>
                            isNumeric(getFieldValue("weight"))
                                ? Number(getFieldValue("weight")) < 2 || Number(getFieldValue("weight")) > 1000
                                    ? Promise.reject("Weight is abnormally large. Must be between 2 - 1000 kg")
                                    : Promise.resolve()
                                : Promise.reject("Invalid weight value"),
                    }),
                ]}
            >
                <Input placeholder="Enter your weight..." disabled={loading} addonAfter="kg" />
            </Form.Item>

            <Form.Item
                name="dateOfBirth"
                label="Date of birth"
                rules={[
                    ({ getFieldValue }) => ({
                        validator: (_, val) =>
                            moment().diff(getFieldValue("dateOfBirth"), "years") < 10
                                ? Promise.reject("You must be greater than 10years old to use this app")
                                : Promise.resolve(),
                    }),
                ]}
            >
                <DatePicker
                    placeholder="Select your date of birth..."
                    disabled={loading}
                    style={{ width: "100%" }}
                    disabledDate={(date) => date.isSameOrAfter(moment())}
                />
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="male" style={{ width: 120, textAlign: "center" }}>
                        Male
                    </Radio.Button>
                    <Radio.Button value="female" style={{ width: 120, textAlign: "center" }}>
                        Female
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <div className={Styles.ActionWrapper}>
                <Button type="primary" size="large" htmlType="submit" disabled={loading} loading={loading} style={{ width: 200 }}>
                    {btnText}
                </Button>
            </div>
        </Form>
    );
};

export const SignupBox: React.FC<SignupBoxProps> = ({ onSignupComplete }) => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [personalInfo, setPersonalInfo] = useState<Partial<TSignupData>>();

    const handlePersonalInfoAdded = (data: Partial<TSignupData>) => {
        setPersonalInfo(data);
        setCurrentStep(1);
    };

    /**
     * Creates the user's account.
     */
    const handleCreateAccount = async (data: Partial<TSignupData>) => {
        try {
            setLoading(true);
            const completeUserSignupData = { ...personalInfo, ...data } as TSignupData;
            completeUserSignupData.weight = +completeUserSignupData.weight;
            completeUserSignupData.height = +completeUserSignupData.height;
            await AuthAction.createUserAccount(completeUserSignupData);
            await AuthAction.loginUser({ email: completeUserSignupData.email, password: completeUserSignupData.password });
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
                <div className={Styles.FormContentHeader}>
                    <div className={Styles.WelcomeText}>Welcome to CalorieApp</div>
                    <div className={Styles.SubText}>Let&apos;s create your account</div>
                </div>
                <img src={illustrationImg} />
            </div>
            <div className={Styles.MainContent}>
                <div className={Styles.FormContentContainer}>
                    <Steps className={Styles.StepsContainer} current={currentStep}>
                        <Steps.Step title="Personal Info" />
                        <Steps.Step title="Account Info" />
                    </Steps>
                    <div className={Styles.FormContent}>
                        {currentStep == 0 && <PersonalDetailsForm onComplete={handlePersonalInfoAdded} loading={loading} btnText="Next" />}
                        {currentStep == 1 && (
                            <AppAccessDetailsForm
                                onComplete={handleCreateAccount}
                                loading={loading}
                                btnText={loading ? "Creating Account..." : "Create Account"}
                            />
                        )}
                    </div>
                </div>
                <div className={Styles.BottomView}>
                    <div className={Styles.OrLine}>
                        <div className={Styles.OrText}>OR</div>
                    </div>
                    <div className={Styles.SignInTip}>
                        <div className={Styles.Text}>Already have an account?</div>
                        <Button size="small" style={{ marginRight: 7 }} onClick={handleGotoLogin}>
                            Sign In
                        </Button>
                        instead
                    </div>
                </div>
            </div>
        </Card>
    );
};
