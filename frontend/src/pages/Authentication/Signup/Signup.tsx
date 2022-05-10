import React, { useEffect, useRef, useState } from "react";
import SimpleCenteredLayout from "../../../layouts/SimpleLayout/SimpleCenteredLayout";
import Styles from "./Signup.scss";
import { useHistory } from "react-router-dom";
import { SignupBox } from "./SignupComponents";
import { RouteAction } from "../../../actions/RouteAction";

const SignupPage = () => {
    const [redirectTo, setRedirectTo] = useState<string>();
    const history = useHistory();

    const handleSignupComplete = () => {
        if (redirectTo) RouteAction.goto(redirectTo);
        else RouteAction.gotoHome();
    };

    useEffect(() => {
        setRedirectTo(history.location.state);
    }, []);
    return (
        <SimpleCenteredLayout>
            <div className={Styles.Container}>
                <SignupBox onSignupComplete={handleSignupComplete} />
            </div>
        </SimpleCenteredLayout>
    );
};

export default SignupPage;
