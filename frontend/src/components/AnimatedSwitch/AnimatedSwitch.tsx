import React from "react";
import { SwitchProps } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Styles from "./AnimatedSwitch.scss";

type AnimatedSwitchWrapperProps = {} & SwitchProps;

export const AnimatedSwitchWrapper: React.FC<AnimatedSwitchWrapperProps> = ({ children, ...props }) => {
    return (
        <AnimatedSwitch className={Styles.Container} atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} {...props}>
            {children}
        </AnimatedSwitch>
    );
};
