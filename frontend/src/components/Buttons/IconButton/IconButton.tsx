import classNames from "classnames";
import React, { CSSProperties } from "react";
import Styles from "./IconButton.scss";

type IconButtonProps = {
    icon?: React.ReactNode;
    iconName?: string;
    primary?: boolean;
    active?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    size?: "small" | "default" | "large";
    onClick?: () => void;
};

export const IconButton: React.FC<IconButtonProps> = ({ icon, iconName, active, disabled, size = "default", primary, onClick, style }) => {
    return (
        <div
            onClick={disabled ? undefined : onClick}
            style={style}
            className={classNames(Styles.Container, {
                [Styles.Small]: size == "small",
                [Styles.Default]: size == "default",
                [Styles.Large]: size == "large",
                [Styles.Primary]: primary,
                [Styles.Active]: active,
                [Styles.Disabled]: disabled,
            })}
        >
            {icon ? icon : iconName ? <i className={iconName} /> : null}
        </div>
    );
};
