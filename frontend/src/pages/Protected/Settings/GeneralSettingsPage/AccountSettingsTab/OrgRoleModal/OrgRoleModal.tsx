import React, { useEffect, useState } from "react";
import Styles from "./OrgRoleModal.scss";
import { Spin, Alert, Avatar, Button, Modal, Table, Input, Switch, Checkbox } from "antd";
import { AppManager } from "../../../../../../manager";
import { OrgRoleScopes } from "../../../../../../models/Organization/Types";

import CheckIcon from "@ant-design/icons/CheckCircleOutlined";
import InfoIcon from "@ant-design/icons/InfoCircleFilled";

type OrgRoleScopItem = keyof typeof OrgRoleScopes;
type EditDataT = { _id: string; scopes: OrgRoleScopItem[]; name: string; isDefault?: boolean };

const RoleModalView: React.FC<{ onClose: () => void; editData?: EditDataT }> = ({ onClose, editData }) => {
    const [selected, setSelected] = useState<OrgRoleScopItem[]>(editData?.scopes || []);
    const [isDefaultRole, setAsDefaultRole] = useState<boolean>(editData?.isDefault || false);
    const [roleName, setRoleName] = useState<string>(editData?.name || "");
    const activeOrg = AppManager.org.getCurrentActiveOrg()!;
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string>("");

    const handleToggleSelectAll = () => {
        if (Object.keys(OrgRoleScopes).some((t) => !selected.includes(t as OrgRoleScopItem))) {
            setSelected(Object.keys(OrgRoleScopes) as OrgRoleScopItem[]);
        } else {
            setSelected([]);
        }
    };

    const handleToggleSelectItem = (item: OrgRoleScopItem) => {
        setSelected((items) => {
            if (items.includes(item)) return items.filter((r) => r !== item);
            else return [...items, item];
        });
    };

    const handleSave = () => {
        setSaving(true);
        if (editData) {
            AppManager.org.apiUpdateOrgRole(
                activeOrg.id,
                editData._id,
                { name: roleName, scopes: selected, setAsDefault: isDefaultRole },
                (err, result) => {
                    setSaving(false);
                    if (err) {
                        setError(`${err}`);
                        AppManager.alert.toastError(`${err}`);
                    } else {
                        AppManager.alert.msgSuccess("Role updated");
                        onClose();
                    }
                },
            );
        } else {
            AppManager.org.apiCreateRole(activeOrg.id, { name: roleName, scopes: selected, setAsDefault: isDefaultRole }, (err, result) => {
                setSaving(false);
                if (err) {
                    setError(`${err}`);
                    AppManager.alert.toastError(`${err}`);
                } else {
                    AppManager.alert.msgSuccess("Role created");
                    onClose();
                }
            });
        }
    };

    return (
        <Spin tip="Creating role" spinning={saving}>
            <div className={Styles.RoleModalContainer}>
                <div className={Styles.RoleModalHeader}>
                    <h4> Role Configurations </h4>
                </div>
                {error && <Alert message={error} closable type="error" showIcon onClose={() => setError("")} />}
                <div className={Styles.RoleModalContent} style={{ maxHeight: window.innerHeight - 250 }}>
                    <div className={Styles.InputGroup}>
                        <div className={Styles.Label}>Role Name</div>
                        <Input value={roleName} placeholder="Provide a name for the role..." onChange={(e) => setRoleName(e.target.value)} />
                        <div className={Styles.DefaultRoleCheck}>
                            <Checkbox checked={isDefaultRole} onChange={(e) => setAsDefaultRole(e.target.checked)}>
                                Set as default role
                            </Checkbox>
                        </div>
                        <div className={Styles.DefaultRoleInfo}>
                            <InfoIcon /> New users added to the organization without a role shall be assigned with this role
                        </div>
                    </div>
                    <div className={Styles.InputGroup}>
                        <div className={Styles.Label}>
                            Privileges
                            <span className={Styles.RoleItem} onClick={handleToggleSelectAll}>
                                <Switch
                                    style={{ marginRight: 10 }}
                                    checked={Object.keys(OrgRoleScopes).every((t) => selected.includes(t as OrgRoleScopItem))}
                                />
                                <span className={Styles.DisplayName}> Select All</span>
                            </span>
                        </div>
                        <div className={Styles.Content}>
                            {Object.keys(OrgRoleScopes).map((item) => (
                                <div key={item} className={Styles.RoleItem} onClick={() => handleToggleSelectItem(item as OrgRoleScopItem)}>
                                    <Switch size="small" checked={selected.includes(item as OrgRoleScopItem)} />
                                    <span className={Styles.DisplayName}>{OrgRoleScopes[item as OrgRoleScopItem]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={Styles.RoleModalFooter}>
                    <Button onClick={handleSave} type="primary" loading={saving} disabled={!roleName || saving}>
                        <CheckIcon /> {editData ? "Update" : "Save"}
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: 10 }}>
                        Close
                    </Button>
                </div>
            </div>
        </Spin>
    );
};

export class OrgRoleModal {
    static openNewRoleModal() {
        const modal = Modal.info({
            icon: null,
            centered: true,
            width: 600,
            className: Styles.ModalContainer,
            content: <RoleModalView onClose={() => modal.destroy()} />,
            okButtonProps: { style: { display: "none" } },
        });
    }

    static openEditRoleModal(data: EditDataT) {
        const modal = Modal.info({
            icon: null,
            centered: true,
            width: 600,
            className: Styles.ModalContainer,
            content: <RoleModalView editData={data} onClose={() => modal.destroy()} />,
            okButtonProps: { style: { display: "none" } },
        });
    }
}
