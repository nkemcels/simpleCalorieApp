import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popover, Spin, Tag } from "antd";
import { useSelector } from "react-redux";
import { AppManager } from "../../../../../../manager";
import { Organization } from "../../../../../../models/Organization/Organization";
import { RootState } from "../../../../../../redux/reducers";
import PlusIcon from "@ant-design/icons/PlusOutlined";
import { useModelEventWatcher } from "../../../../../../hooks/modelHook";
import Styles from "../AccountSettingsTab.scss";
import dGroupLogo from "../../../../../../assets/img/logo-dgroup-color.png";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import SettingIcon from "@ant-design/icons/SettingOutlined";

export const NewDealerGroupPopover = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [showPopover, setShowPopover] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSave = (data: any) => {
        setSaving(true);
        AppManager.org.apiSendDealerGroupRequest(activeOrg.id, data, (err) => {
            setSaving(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else {
                AppManager.alert.toastSuccess("A request has been successfully sent to the dealer group");
                setShowPopover(false);
            }
        });
    };

    return (
        <Popover
            content={
                <Spin spinning={saving}>
                    <div style={{ padding: 15, minWidth: 400 }}>
                        <Form layout="vertical" onFinish={handleSave} name="new-dealergroup-request-form">
                            <Form.Item label="Dealer Group Email" name="email" rules={[{ required: true, type: "email" }]}>
                                <Input autoFocus placeholder="Enter the dealer group email" />
                            </Form.Item>
                            <Form.Item label="Name">
                                <Input placeholder="Enter a display name for this dealer group" />
                            </Form.Item>
                        </Form>
                        <div style={{ textAlign: "right" }}>
                            <Button
                                style={{ marginTop: 7 }}
                                disabled={saving}
                                loading={saving}
                                htmlType="submit"
                                form="new-dealergroup-request-form"
                                type="primary"
                            >
                                Send Request
                            </Button>
                        </div>
                    </div>
                </Spin>
            }
            trigger="click"
            visible={showPopover}
            onVisibleChange={setShowPopover}
        >
            <Button type="primary" icon={<PlusIcon />} onClick={() => setShowPopover(true)}>
                Add Dealer Group
            </Button>
        </Popover>
    );
};

const DealerGroupItem: React.FC<{ name: string; isPending?: boolean; isDeclined?: boolean; deleting?: boolean; onDelete: () => void }> = ({
    name,
    isPending,
    isDeclined,
    deleting,
    onDelete,
}) => {
    return (
        <Spin spinning={deleting}>
            <div className={Styles.DealerGroupItem}>
                <img src={dGroupLogo} />
                <div className={Styles.Name}>{name}</div>
                <div className={Styles.Actions}>
                    {isPending ? (
                        <Button icon={<DeleteIcon />} danger type="primary" onClick={onDelete}>
                            Cancel Request
                        </Button>
                    ) : isDeclined ? (
                        <Button icon={<DeleteIcon />} danger type="primary" onClick={onDelete}>
                            Delete
                        </Button>
                    ) : (
                        <>
                            <Button icon={<DeleteIcon />} danger type="primary" onClick={onDelete}>
                                Remove
                            </Button>
                            {/* <Button icon={<SettingIcon />} style={{ marginTop: 10 }}>
                    Manage Access
                </Button> */}
                        </>
                    )}
                </div>
                {isPending && (
                    <Tag className={Styles.StatusTag} color="orange">
                        Request Pending
                    </Tag>
                )}
                {isDeclined && (
                    <Tag className={Styles.StatusTag} color="red">
                        Request Declined
                    </Tag>
                )}
            </div>
        </Spin>
    );
};

export const DealerGroupsView = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [dealerGroups] = useModelEventWatcher(activeOrg, "AUTHORIZED_DEALER_GROUPS_UPDATED", activeOrg.data.authorizedDealerGroups);
    const [dealerGroupRequests] = useModelEventWatcher(activeOrg, "DEALER_GROUP_REQUESTS_UPDATED", activeOrg.data.dealerGroupRequests);
    const [orgAttr] = useModelEventWatcher(activeOrg, "ATTRIBUTES_UPDATED", activeOrg.data.dealerGroupRequests);
    const [deleting, setDeleting] = useState("");

    const handleRemoveDGroup = (dealerGroupId: string) => {
        AppManager.alert.confirmAction(
            "Confirm Action",
            "This dealer group will no longer have access to your organization's information if you proceed.",
            (res) => {
                if (res === "OK") {
                    setDeleting(dealerGroupId);
                    AppManager.org.apiRemoveDealerGroupFromOrg(activeOrg.id, dealerGroupId, (err) => {
                        setDeleting("");
                        if (err) AppManager.alert.toastError(`${err}`);
                        else AppManager.alert.msgSuccess("Operation successful");
                    });
                }
            },
            { okText: "Yes, Remove" },
        );
    };

    const handleDeleteRequest = (requestId: string, status: string) => {
        const performAction = () => {
            setDeleting(requestId);
            AppManager.org.apiDeleteDealerGroupRequest(activeOrg.id, requestId, (err) => {
                setDeleting("");
                if (err) AppManager.alert.toastError(`${err}`);
                else AppManager.alert.msgSuccess("Request Canceled");
            });
        };
        if (status === "DECLINED") performAction();
        else {
            AppManager.alert.confirmAction(
                "Confirm Action",
                "Cancel this dealer group request?",
                (res) => {
                    if (res === "OK") performAction();
                },
                { okText: "Yes", cancelText: "No" },
            );
        }
    };

    useEffect(() => {
        AppManager.org.apiFetchDealerGroupRequests(activeOrg.id, () => {});
    }, [activeOrg, orgAttr]);

    return (
        <div className={Styles.DealerGroupsView}>
            <div className={Styles.DealerGroupList}>
                {dealerGroups.map((item) => (
                    <DealerGroupItem
                        key={item._id}
                        deleting={deleting === item.org._id}
                        name={item.org.name}
                        onDelete={() => handleRemoveDGroup(item.org._id)}
                    />
                ))}
                {dealerGroupRequests.map((item) => (
                    <DealerGroupItem
                        key={item._id}
                        name={item.dealerGroupName}
                        isPending={item.status == "PENDING"}
                        isDeclined={item.status == "DECLINED"}
                        deleting={deleting === item._id}
                        onDelete={() => handleDeleteRequest(item._id, item.status)}
                    />
                ))}
                {!dealerGroups.length && !dealerGroups.length && (
                    <div className={Styles.Placeholder}>
                        <div className={Styles.Title}>No Dealer Groups</div>
                        <div className={Styles.Desc}>
                            There are currently no dealer groups that have been granted access to {activeOrg.data.attrs.name}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
