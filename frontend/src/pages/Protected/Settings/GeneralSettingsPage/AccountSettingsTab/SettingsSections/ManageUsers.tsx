import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import EditIcon from "@ant-design/icons/EditOutlined";
import { Button, Select, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDisplay from "../../../../../../components/CustomDisplays/UserDisplay/OrgMemberDisplay";
import { useModelEventWatcher } from "../../../../../../hooks/modelHook";
import { AppManager } from "../../../../../../manager";
import { Organization } from "../../../../../../models/Organization/Organization";
import { OrgMember } from "../../../../../../models/Organization/OrgMember";
import { TOrgInvitation } from "../../../../../../models/Organization/Types";
import { RootState } from "../../../../../../redux/reducers";
import { OrgRoleModal } from "../OrgRoleModal/OrgRoleModal";

export const ManageInvitationsView: React.FC<{ pendingInvites: TOrgInvitation[] }> = ({ pendingInvites }) => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [deleting, setDeleting] = useState(false);
    const handleDeleteInvitation = (invitationId: string) => {
        setDeleting(true);
        AppManager.org.apiDeleteOrgInvitation(activeOrg.id, invitationId, (err) => {
            setDeleting(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("Invitation deleted");
        });
    };
    useEffect(() => {
        AppManager.org.apiFetchOrgInvitations(activeOrg.id, () => {});
    }, [activeOrg]);
    return (
        <Table
            dataSource={pendingInvites}
            loading={deleting}
            columns={[
                { title: "Pending Invitations", dataIndex: "names" },
                { title: "", dataIndex: "email" },
                {
                    title: "",
                    dataIndex: "status",
                    render: (v, rec) =>
                        rec.status == "PENDING" ? (
                            <Tag color="orange">pending</Tag>
                        ) : rec.status == "DECLINED" ? (
                            <Tag color="red">declined</Tag>
                        ) : (
                            <Tag color="default">{rec.status}</Tag>
                        ),
                },
                {
                    title: "",
                    width: 60,
                    render: (val, record) => <Button icon={<DeleteIcon />} size="small" onClick={() => handleDeleteInvitation(record._id)} />,
                },
            ]}
        />
    );
};

export const ManageUsersView = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [orgMembers] = useModelEventWatcher(activeOrg, "MEMBERS_UPDATED", activeOrg.data.members);
    const [pendingInvites] = useModelEventWatcher(activeOrg, "INVITATIONS_UPDATED", activeOrg.data.invitations);
    const [orgRoles] = useModelEventWatcher(activeOrg, "ORG_ROLES_UPDATED", activeOrg.data.orgRoles);
    // console.log("OUR PENDING INVITES ARE ", pendingInvites);
    const [updating, setUpdatingMember] = useState("");
    const [deleting, setDeletingMember] = useState("");

    const handleUpdateMemberRole = (member: OrgMember, roleId: string) => {
        setUpdatingMember(member.id);
        AppManager.org.apiUpdateMemberRole(activeOrg.id, member.id, roleId, (err) => {
            setUpdatingMember("");
            if (err) AppManager.alert.toastError(`${err}`);
            else AppManager.alert.msgSuccess("User's role changed");
        });
    };

    const handleDeleteMember = (member: OrgMember) => {
        AppManager.alert.confirmAction(
            "Remove Member",
            "Warning! Removing this user from the organization will delete all the data that was ever created by the user, i.e. contacts, notes, files, etc. This action cannot be reversed. Do you wish to continue?",
            (res) => {
                if (res === "OK") {
                    setDeletingMember(member.id);
                    AppManager.org.apiDeleteMember(activeOrg.id, member.id, (err) => {
                        setDeletingMember("");
                        if (err) AppManager.alert.toastError(`${err}`);
                        else AppManager.alert.msgSuccess("User has been deleted");
                    });
                }
            },
            { okText: "YES, REMOVE USER" },
        );
    };

    useEffect(() => {
        AppManager.org.apiFetchOrgInvitations(activeOrg.id, () => {});
    }, [activeOrg]);
    return (
        <div>
            <Table
                loading={!!deleting}
                dataSource={orgMembers}
                columns={[
                    { title: "Names", render: (val, record) => <UserDisplay user={record} /> },
                    {
                        title: "Last login",
                        render: (_, rec) => (rec.attrs.user.lastActivity ? moment(rec.attrs.user.lastActivity).fromNow() : "-"),
                    },
                    {
                        title: "Role",
                        render: (val, record) =>
                            activeOrg.data.attrs.owner._id === record.attrs.user._id ? (
                                <Tag color="green">Organization Owner</Tag>
                            ) : (
                                <Select
                                    value={record.attrs.role}
                                    placeholder="Assign a role"
                                    loading={record.id === updating}
                                    disabled={deleting === record.id || updating === record.id}
                                    onChange={(value) => handleUpdateMemberRole(record, value)}
                                    options={orgRoles.map((item) => ({ label: item.name, value: item._id }))}
                                />
                            ),
                    },
                    {
                        title: "",
                        width: 60,
                        render: (val, record) =>
                            activeOrg.data.attrs.owner._id !== record.attrs.user._id && (
                                <Button
                                    icon={<DeleteIcon />}
                                    danger
                                    size="small"
                                    onClick={() => handleDeleteMember(record)}
                                    loading={deleting === record.id}
                                    disabled={deleting === record.id || updating === record.id}
                                >
                                    Remove user
                                </Button>
                            ),
                    },
                ]}
            />
            {!!pendingInvites.length && (
                <div style={{ marginTop: 20 }}>
                    <ManageInvitationsView pendingInvites={pendingInvites} />
                </div>
            )}
        </div>
    );
};

export const OrgRolesView = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [orgRoles] = useModelEventWatcher(activeOrg, "ORG_ROLES_UPDATED", activeOrg.data.orgRoles);
    const [orgAttr] = useModelEventWatcher(activeOrg, "ATTRIBUTES_UPDATED", activeOrg.data.attrs);
    const [deletingRole, setDeletingRole] = useState("");
    const handleDeleteRole = (roleId: string) => {
        AppManager.alert.confirmAction(
            "Confirm Delete Role",
            `Deleting this role will cause all users assigned to the role may be very restricted to actions in this organization. Proceed?`,
            (res) => {
                if (res === "OK") {
                    setDeletingRole(roleId);
                    AppManager.org.apiDeleteRole(activeOrg.id, roleId, (err) => {
                        setDeletingRole("");
                        if (err) AppManager.alert.toastError(`${err}`);
                        else AppManager.alert.msgSuccess("Role deleted");
                    });
                }
            },
        );
    };
    return (
        <Table
            dataSource={orgRoles}
            size="small"
            columns={[
                {
                    title: "Role",
                    render: (val, record) => (
                        <div>
                            {record.name}
                            {orgAttr.defaultRole === record._id && (
                                <Tag style={{ marginLeft: 15 }} color="blue">
                                    Default
                                </Tag>
                            )}
                        </div>
                    ),
                },
                {
                    title: "",
                    width: 100,
                    render: (val, rec) => (
                        <div>
                            <Button
                                icon={<EditIcon />}
                                size="small"
                                disabled={deletingRole === rec._id}
                                loading={deletingRole === rec._id}
                                onClick={() => OrgRoleModal.openEditRoleModal({ ...rec, isDefault: orgAttr.defaultRole === rec._id })}
                            />
                            <Button
                                icon={<DeleteIcon />}
                                style={{ marginLeft: 10 }}
                                size="small"
                                disabled={deletingRole === rec._id}
                                loading={deletingRole === rec._id}
                                onClick={() => handleDeleteRole(rec._id)}
                                danger
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
};
