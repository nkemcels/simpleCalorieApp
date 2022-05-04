import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import PlusIcon from "@ant-design/icons/PlusOutlined";
import { Button, Input, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModelEventWatcher } from "../../../../../../hooks/modelHook";
import { AppManager } from "../../../../../../manager";
import { Organization } from "../../../../../../models/Organization/Organization";
import { RootState } from "../../../../../../redux/reducers";

export const ServiceLevelsView = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [serviceLevels] = useModelEventWatcher(activeOrg, "CONTACT_SERVICE_LEVELS_UPDATED", activeOrg.data.contactServiceLevels);
    const [deleting, setDeleting] = useState("");

    const handleDeleteServiceLevel = (serviceLevelId: string) => {
        AppManager.alert.confirmAction("Confirm Action", "Delete this service level?", (res) => {
            if (res === "OK") {
                setDeleting(serviceLevelId);
                AppManager.org.apiDeleteServiceLevel(activeOrg.id, serviceLevelId, (err) => {
                    setDeleting("");
                    if (err) AppManager.alert.toastError(`${err}`);
                    else AppManager.alert.msgSuccess("Service level deleted");
                });
            }
        });
    };

    return (
        <Table
            dataSource={serviceLevels}
            size="small"
            loading={!!deleting}
            columns={[
                { title: "Service Level", render: (val, record) => <div>{record.name}</div> },
                {
                    title: "",
                    width: 100,
                    render: (val, record) => (
                        <Button
                            icon={<DeleteIcon />}
                            size="small"
                            danger
                            loading={deleting === record._id}
                            onClick={() => handleDeleteServiceLevel(record._id)}
                        />
                    ),
                },
            ]}
        />
    );
};

export const AddServiceLevelPopover = () => {
    const activeOrg = useSelector<RootState, Organization>((state) => state.orgs.activeOrg!);
    const [showPopover, setShowPopover] = useState(false);
    const [saving, setSaving] = useState(false);
    const [serviceLevelName, setServiceLevelName] = useState("");
    const handleSave = () => {
        setSaving(true);
        AppManager.org.apiAddServiceLevel(activeOrg.id, serviceLevelName, (err) => {
            setSaving(false);
            if (err) AppManager.alert.toastError(`${err}`);
            else {
                AppManager.alert.msgSuccess("Service level added");
                setShowPopover(false);
            }
        });
    };
    useEffect(() => {
        setServiceLevelName("");
    }, [showPopover]);
    return (
        <Popover
            content={
                <div style={{ padding: 15 }}>
                    <div>Enter Service Level Name</div>
                    <Input
                        autoFocus
                        value={serviceLevelName}
                        onChange={(e) => setServiceLevelName(e.target.value)}
                        onKeyUp={(e) => e.key == "Enter" && handleSave()}
                    />
                    <div style={{ textAlign: "right" }}>
                        <Button style={{ marginTop: 7 }} disabled={!serviceLevelName.trim() || saving} loading={saving} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            }
            trigger="click"
            visible={showPopover}
            onVisibleChange={setShowPopover}
        >
            <Button type="primary" icon={<PlusIcon />} onClick={() => setShowPopover(true)}>
                Add Service Level
            </Button>
        </Popover>
    );
};
