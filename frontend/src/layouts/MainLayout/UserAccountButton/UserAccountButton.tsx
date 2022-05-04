import React, { useEffect, useState } from "react";
import Avatar, { AvatarProps } from "antd/lib/avatar/avatar";
import ChevronDownIcon from "@ant-design/icons/DownOutlined";
import LogoutIcon from "@ant-design/icons/LogoutOutlined";
import SyncIcon from "@ant-design/icons/SyncOutlined";
import Popover from "antd/lib/popover";
import Button from "antd/lib/button";
import Styles from "./UserAccountButton.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { TUserData } from "../../../models/User/User";
import classNames from "classnames";
import { TNetworkState } from "../../../models/_Utils/NetworkState";
import FeedbackIcon from "@ant-design/icons/LikeFilled";

type TAppAvatarProps = {
    name: string;
    avatarProps?: AvatarProps;
};

const AppAvatar: React.FC<TAppAvatarProps> = ({ name, avatarProps }) => {
    const networkState = useSelector<RootState, TNetworkState | undefined>((state) => state.app.networkState);
    return (
        <div className={Styles.AvatarContainer}>
            <Avatar {...avatarProps}>{name[0]}</Avatar>
        </div>
    );
};

/**
 * Props for {@link SignedInUserDetails} Component
 */
export type SignedInUserDetailsProps = {
    userData: {
        firstName: string;
        lastName: string;
        email: string;
    };
};

/**
 * Props for {@link SignedInExtraActionItem} Component
 */
export type SignedInExtraActionItemProps = {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
};

type TExtraActionItem = {
    icon: React.ReactNode;
    text: string;
    value: string;
};

/**
 * Props for {@link SignedInExtraActionList} Component
 */
export type SignedInExtraActionListProps = {
    /**
     * A list of all the extra actions on the SignedInButton dropdown display
     */
    extraActions?: TExtraActionItem[];

    /**
     * Called when one of the extra action is clicked
     */
    onAction?: (value: string) => void;
};

/**
 * Displays the user's avatar, full names and some other details like email
 * on the signed in user action dropdown
 *
 * ### Usage
 * ```js
 * <SignedInUserDetails userData={...} />
 * ```
 *
 * ### Props
 * {@link SignedInUserDetailsProps}
 */
export const SignedInUserDetails: React.FC<SignedInUserDetailsProps> = ({ userData }) => {
    return (
        <div className={Styles.UserDetailsContainer}>
            <div className={Styles.Avatar}>
                <Avatar>{userData?.firstName[0]}</Avatar>
            </div>
            <div className={Styles.NameContainer}>
                <div className={Styles.Name}>
                    {userData?.firstName} {userData?.lastName}
                </div>
                <div className={Styles.Email}>{userData?.email}</div>
            </div>
        </div>
    );
};

/**
 * Renders a single item in the {@link SignedInExtraActionList} component
 *
 * ### Usage
 * ```js
 * <SignedInExtraActionItem userData={...} />
 * ```
 *
 * ### Props
 * {@link SignedInExtraActionItemProps}
 */
export const SignedInExtraActionItem: React.FC<SignedInExtraActionItemProps> = ({ icon, text, onClick }) => {
    return (
        <div className={Styles.ExtraActionsItemContainer} onClick={onClick}>
            <div className={Styles.Icon}>{icon}</div>
            <div className={Styles.Text}>{text}</div>
        </div>
    );
};

/**
 * Displays a list of some extra actions that can be performed on
 * the signed in user action dropdown
 *
 * ### Usage
 * ```js
 * <SignedInExtraActionList
 *      extraActions={[...]}
 *      onAction={(selectedItem)=>{...}}
 * />
 * ```
 *
 * ### Props
 * {@link SignedInExtraActionListProps}
 */
export const SignedInExtraActionList: React.FC<SignedInExtraActionListProps> = ({ extraActions = [], onAction }) => {
    const handleItemSelected = (item: TExtraActionItem) => {
        if (onAction) {
            onAction(item.value);
        }
    };
    return (
        <div className={Styles.ExtraActionsListContainer}>
            {extraActions.map((item) => (
                <SignedInExtraActionItem key={item.value} icon={item.icon} text={item.text} onClick={() => handleItemSelected(item)} />
            ))}
        </div>
    );
};

const DUMMY_EXTRA_ACTIONS = [{ icon: <FeedbackIcon />, text: "Give Feedback", value: "give_feedback" }];

/**
 * Displays a user's information (name, avatar, etc) and also renders
 * a few set of actions that can be performed by a signed in user.
 *
 * ### Usage
 * ```js
 * <SignedInButtonActions />
 * ```
 */
export const SignedInButtonActions: React.FC<{ closePopover: () => void }> = ({ closePopover }) => {
    const userObj = useSelector<RootState, TUserData>((r) => r.user.userData!);
    const handleLogout = () => {
        closePopover();
        // AppManager.alert.confirmAction(
        //     "Confirm Logout",
        //     "Are you sure you want to Logout?",
        //     (res) => {
        //         if (res == "OK") AppManager.route.gotoLogout();
        //     },
        //     { okText: "YES, LOGOUT" },
        // );
    };
    const handleAction = (action: string) => {
        switch (action) {
            case "give_feedback":
                // showFeedbackActionModal();
                closePopover();
                break;
        }
    };

    return (
        <div className={Styles.SignedInActionsContainer}>
            <SignedInUserDetails userData={userObj} />
            {/* <SignedInExtraActionList extraActions={DUMMY_EXTRA_ACTIONS} onAction={handleAction} /> */}
            <Button type="primary" style={{ width: "100%" }} onClick={handleLogout}>
                <LogoutIcon /> Sign out
            </Button>
        </div>
    );
};

/**
 * Renders the signed in button with dropdown for performing
 * basic signed in actions
 *
 * ### Usage
 * ```js
 * <SignedInButton />
 * ```
 *
 * ### Props
 * {@link SignedInExtraActionListProps}
 */
export const SignedInButtonDropdown: React.FC<{ disableOptions?: boolean }> = ({ disableOptions }) => {
    const userObj = useSelector<RootState, TUserData | undefined>((r) => r.user.userData);
    const [visible, setPopoverVisible] = useState(false);
    const handleClosePopover = () => {
        setPopoverVisible(false);
    };
    return (
        <Popover
            visible={visible}
            overlayClassName={Styles.SignedInActionsPopContainer}
            content={<SignedInButtonActions closePopover={handleClosePopover} />}
            trigger="click"
            onVisibleChange={(visible) => !disableOptions && setPopoverVisible(visible)}
        >
            <div
                className={classNames(Styles.SignedInButtonContainer, { [Styles.Disable]: disableOptions })}
                onClick={() => !disableOptions && setPopoverVisible(true)}
            >
                <AppAvatar avatarProps={{ className: Styles.Avatar }} name={userObj?.firstName || ""} />
                <span className={Styles.UserName}>
                    {userObj?.firstName} {userObj?.lastName[0]}.
                </span>
                {!disableOptions && <ChevronDownIcon className={Styles.ChevronIcon} />}
            </div>
        </Popover>
    );
};

/**
 * Depending on whether or not a user is signed in,
 * it displays a signed in dropdown component to perform basic signed in operations,
 * or an action to sign in.
 *
 * ### Usage
 * ```js
 * <UserAccountButton />
 * ```
 *
 * ### Props
 * {@link SignedInExtraActionListProps}
 */
export const UserAccountButton: React.FC<{ disableOptions?: boolean }> = ({ disableOptions }) => {
    return (
        <div>
            <SignedInButtonDropdown disableOptions={disableOptions} />
        </div>
    );
};

export default UserAccountButton;
