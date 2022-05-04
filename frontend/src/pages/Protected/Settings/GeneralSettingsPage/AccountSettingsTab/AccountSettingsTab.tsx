import React, { useEffect, useState } from "react";
import { Table, Anchor, Form, Input, Avatar, Tag, Select, Popover } from "antd";
import { useSelector } from "react-redux";
import { Organization } from "../../../../../models/Organization/Organization";
import { RootState } from "../../../../../redux/reducers";
import SectionPane from "../SharedComponents/SectionPane";
import Styles from "./AccountSettingsTab.scss";
import Button from "antd-button-color";
import UserInviteIcon from "@ant-design/icons/UserAddOutlined";
import OrgInfoIcon from "@ant-design/icons/ClusterOutlined";
import UsergroupIcon from "@ant-design/icons/UsergroupAddOutlined";
import DangerZoneIcon from "@ant-design/icons/ExclamationCircleFilled";
import LeaveIcon from "@ant-design/icons/UserDeleteOutlined";
import { TOrganizationAttr, TOrgInvitation } from "../../../../../models/Organization/Types";
import CheckIcon from "@ant-design/icons/CheckOutlined";
import { AppManager } from "../../../../../manager";
import { useModelEventWatcher } from "../../../../../hooks/modelHook";
import UserDisplay from "../../../../../components/CustomDisplays/UserDisplay/OrgMemberDisplay";
import PlusIcon from "@ant-design/icons/PlusOutlined";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import { MembersInviteModal } from "./UserInviteModal/MemberInviteModal";
import { OrgRoleModal } from "./OrgRoleModal/OrgRoleModal";
import EditIcon from "@ant-design/icons/EditOutlined";
import moment from "moment";
import TabSectionPane from "../SharedComponents/TabSectionPane";
import { OrgMember } from "../../../../../models/Organization/OrgMember";
import { AddServiceLevelPopover, ServiceLevelsView } from "./SettingsSections/ServiceLevels";
import { ManageUsersView, OrgRolesView } from "./SettingsSections/ManageUsers";
import { DealerGroupsView, NewDealerGroupPopover } from "./SettingsSections/DealerGroup";
import InfoIcon from "@ant-design/icons/InfoCircleFilled";

const BasicOrgInfoView = () => {
    const [updating, setUpdating] = useState(false);
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const activeUser = AppManager.user.getActiveUser()!;
    const [orgAttrs] = useModelEventWatcher(activeOrg, "ATTRIBUTES_UPDATED", activeOrg.data.attrs);
    const [form] = Form.useForm();

    const handleUpdateOrgInfo = (values: TOrganizationAttr) => {
        setUpdating(true);
        AppManager.org.apiUpdateOrgBasicInfo(activeOrg.id, { name: values.name }, (err) => {
            setUpdating(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Organization Info Updated");
        });
    };

    useEffect(() => {
        form.setFieldsValue(orgAttrs);
    }, [orgAttrs]);

    return (
        <div className={Styles.BasicOrgInfoView}>
            <div className={Styles.OwnerWrapper}>
                <div className={Styles.AvatarWrapper}>
                    <Avatar size={78}>C</Avatar>
                </div>
                <div className={Styles.Names}>
                    {orgAttrs.owner.firstName} {orgAttrs.owner.lastName} {activeUser.id === orgAttrs.owner._id ? "(You)" : ""}
                </div>
                <div className={Styles.Desc}>Owner</div>
            </div>
            <div className={Styles.FormContainer}>
                <Form initialValues={orgAttrs} onFinish={handleUpdateOrgInfo} form={form}>
                    <Form.Item label="Org. Name" name="name" rules={[{ required: true, min: 1 }]}>
                        <Input />
                    </Form.Item>
                    <div className={Styles.Actions}>
                        <Button icon={<CheckIcon />} type="info" htmlType="submit" loading={updating}>
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

const AccountSettingsTab: React.FC<{ containerRef: React.RefObject<HTMLDivElement> }> = ({ containerRef }) => {
    const [anchorElt, setAnchorElt] = useState(containerRef.current);
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);

    const handleDeleteAccount = () => {
        AppManager.alert.toastInfo("This feature is being worked on");
    };

    const handleTransferAccountOwnership = () => {
        AppManager.alert.toastInfo("This feature is being worked on");
    };

    useEffect(() => {
        setAnchorElt(containerRef.current);
    }, [containerRef.current]);
    return (
        <div className={Styles.Container}>
            <div className={Styles.ContentWrapper}>
                <div id="Settings-Anchor--basic-info">
                    <SectionPane icon={<OrgInfoIcon />} title="Organization Info" content={<BasicOrgInfoView />} />
                </div>
                <div id="Settings-Anchor--manage-users">
                    <TabSectionPane
                        tabs={[
                            { title: "Manage Users", key: "users" },
                            { title: "Configure Roles", key: "roles" },
                        ]}
                        renderExtraActions={(tab) =>
                            tab === "users" ? (
                                <Button type="primary" icon={<UserInviteIcon />} onClick={MembersInviteModal.openModal}>
                                    Invite User
                                </Button>
                            ) : (
                                <Button type="primary" icon={<UserInviteIcon />} onClick={OrgRoleModal.openNewRoleModal}>
                                    New Role
                                </Button>
                            )
                        }
                    >
                        {(activeTab) => (activeTab === "users" ? <ManageUsersView /> : <OrgRolesView />)}
                    </TabSectionPane>
                </div>
                <div id="Settings-Anchor--service-levels">
                    <SectionPane
                        title="Service Levels"
                        icon={<OrgInfoIcon />}
                        extraActions={<AddServiceLevelPopover />}
                        content={<ServiceLevelsView />}
                    />
                </div>
                <div id="Settings-Anchor--dealer-groups">
                    <SectionPane
                        title="Dealer Groups"
                        icon={<OrgInfoIcon />}
                        extraActions={<NewDealerGroupPopover />}
                        content={<DealerGroupsView />}
                    />
                </div>
                <div id="Settings-Anchor--dealer-groups">
                    <SectionPane
                        title={<span style={{ color: "#b71c1c" }}>Danger Zone</span>}
                        icon={<DangerZoneIcon style={{ color: "#b71c1c" }} />}
                        content={
                            <>
                                <div className={Styles.DangerActionWrapper}>
                                    <div className={Styles.ActionView}>
                                        <div className={Styles.Title}>Transfer ownership of {activeOrg.data.attrs.name}</div>
                                        <div className={Styles.Action}>
                                            <Button type="warning" onClick={handleTransferAccountOwnership}>
                                                <LeaveIcon /> Transfer Ownership
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={Styles.Description}>
                                        <InfoIcon /> Transfer ownership of your account to another ausplan user. You might cease to be part of the
                                        organization and no longer be able to perform any actions in this organization.
                                    </div>
                                </div>
                                <div className={Styles.DangerActionWrapper}>
                                    <div className={Styles.ActionView}>
                                        <div className={Styles.Title}>Delete this organization</div>
                                        <div className={Styles.Action}>
                                            <Button danger type="primary" onClick={handleDeleteAccount}>
                                                <DeleteIcon /> Delete Organization
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={Styles.Description}>
                                        <InfoIcon /> Deleting this organization will cancel all subscriptions and remove all records by all users in
                                        the organization. This action is irreversible
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
            <div className={Styles.AnchorWrapper}>
                <Anchor getContainer={anchorElt ? () => anchorElt : undefined} offsetTop={30} onClick={(e) => e.preventDefault()}>
                    <Anchor.Link href="#Settings-Anchor--basic-info" title="Basic Info" />
                    <Anchor.Link href="#Settings-Anchor--manage-users" title="Users, Roles & Privileges" />
                    <Anchor.Link href="#Settings-Anchor--service-levels" title="Service Levels" />
                    <Anchor.Link href="#Settings-Anchor--dealer-groups" title="Dealer Groups" />
                </Anchor>
            </div>
        </div>
    );
};

export default AccountSettingsTab;
