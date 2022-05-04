import React, { useEffect, useState } from "react";
import Styles from "./MemberInviteModal.scss";
import { Spin, Alert, Avatar, Button, Modal, Table, Input, Tooltip } from "antd";
import { AppManager } from "../../../../../../manager";
import { useModelEventWatcher } from "../../../../../../hooks/modelHook";

import PlusIcon from "@ant-design/icons/PlusOutlined";
import EmailIcon from "@ant-design/icons/MailOutlined";
import TagsInputComponent, { ReactTagsInputProps } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import CheckIcon from "@ant-design/icons/CheckCircleOutlined";
import ArrowRightIcon from "@ant-design/icons/ArrowRightOutlined";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import { Checkmark } from "react-checkmark";
import WarningIcon from "@ant-design/icons/WarningFilled";
import LoadingIcon from "@ant-design/icons/LoadingOutlined";

export type TCustomTagProps = {
    tag: string;
    disabled: boolean;
    onRemoveTag?: (tag: string) => void;
    getTagDisplayValue: (tag: string) => string;
};

const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserTagDisplay: React.FC<TCustomTagProps> = ({ tag, disabled, onRemoveTag = () => {}, getTagDisplayValue }) => {
    return (
        <div key={tag} className={Styles.InviteeTag}>
            <div className={Styles.Content}>
                <Avatar className={Styles.Avatar} size={25} icon={<EmailIcon />} />
                <span className={Styles.Text}>{tag}</span>
                <div className={Styles.Close} onClick={() => onRemoveTag(tag)}>
                    <PlusIcon rotate={45} />
                </div>
            </div>
        </div>
    );
};

type TTagsInputProps<Tag = any> = ReactTagsInputProps<Tag> & { onRemoveTag?: (tag: string) => void; inputPlaceholder?: string };

const TagsInput: React.FC<TTagsInputProps> = (props) => {
    return (
        <form>
            <TagsInputComponent
                {...props}
                onlyUnique
                addKeys={[13, 32]}
                addOnPaste
                pasteSplit={(data) => {
                    const separators = [",", ";", "\\s+"];
                    return data.split(new RegExp(separators.join("|"))).map((d) => d.trim());
                }}
            />
        </form>
    );
};

export const UserTagsInput: React.FC<TTagsInputProps> = ({ onRemoveTag, inputPlaceholder, ...props }) => {
    return (
        <TagsInput
            {...props}
            // className={Styles.TagInput}
            inputProps={{ placeholder: inputPlaceholder || "User's Email" }}
            renderTag={(tagProps) => <UserTagDisplay onRemoveTag={onRemoveTag} {...tagProps} />}
            validationRegex={EMAIL_RE}
        />
    );
};

type TInviteModalViewProps = {
    onClose: () => void;
    renderClose?: (completed?: boolean) => React.ReactNode;
    renderCompletedBtn?: () => React.ReactNode;
};
type InviteeT = { names: string; email: string; status: string };

export const InviteUsersView: React.FC<TInviteModalViewProps> = ({ onClose, renderClose, renderCompletedBtn }) => {
    const [showInvitations, setShowInvitations] = useState(false);
    const [completed, setCompleted] = useState(false);
    const activeOrg = AppManager.org.getCurrentActiveOrg()!;
    const [orgAttr] = useModelEventWatcher(activeOrg, "ATTRIBUTES_UPDATED", activeOrg.data.attrs);
    const [invitees, setInvitees] = useState<InviteeT[]>([]);
    const [inviteeEmails, setInviteeEmails] = useState<string[]>([]);
    const [sendingInvites, setSendingInvites] = useState(false);
    const [error, setError] = useState<string>("");

    const handleRemoveInviteeEmail = (invitee: string) => {
        setInviteeEmails((items) => items.filter((t) => t !== invitee));
    };

    const handleRemoveInvitee = (invitee: InviteeT) => {
        setInvitees((invitations) => {
            const result = invitations.filter((r) => r.email !== invitee.email);
            if (!result.length) setShowInvitations(false);

            return result;
        });
        setInviteeEmails((t) => t.filter((r) => r !== invitee.email));
    };

    const handleSendInvitations = () => {
        setSendingInvites(true);
        AppManager.org.apiSendOrgInvitations(activeOrg.id, invitees, (err, result) => {
            setSendingInvites(false);
            setCompleted(true);
            if (err) AppManager.alert.error("Error", `${err}`);
            else {
                AppManager.alert.msgSuccess("Done");
                setInvitees([
                    ...result!.alreadyMembers.map((t) => ({ ...t, status: "already_member" })),
                    ...result!.alreadySent.map((t) => ({ ...t, status: "already_sent" })),
                    ...result!.failedToSend.map((t) => ({ ...t, status: "failed" })),
                    ...result!.sentInvitations.map((t) => ({ ...t, status: "sent" })),
                ]);
            }
        });
    };

    const getStatusView = (rec: InviteeT) => {
        const { status } = rec;
        return status === "sending" ? (
            <LoadingIcon style={{ fontSize: 18, color: "green" }} />
        ) : status === "sent" ? (
            <Tooltip title="Invitation sent">
                <Checkmark size={25} />
            </Tooltip>
        ) : status === "already_member" ? (
            <Tooltip title="User is already a member of the organization">
                <WarningIcon style={{ fontSize: 18, color: "#b71c1c" }} />
            </Tooltip>
        ) : status === "already_sent" ? (
            <Tooltip title="There is a pending invitation to this same user">
                <WarningIcon style={{ fontSize: 18, color: "#b71c1c" }} />
            </Tooltip>
        ) : status === "failed" ? (
            <Tooltip title="Could not send invitation. Please try again">
                <WarningIcon style={{ fontSize: 18, color: "#b71c1c" }} />
            </Tooltip>
        ) : (
            <Button size="small" icon={<DeleteIcon />} onClick={() => handleRemoveInvitee(rec)} />
        );
    };

    useEffect(() => {
        setInvitees(inviteeEmails.map((t) => ({ names: "", email: t, status: "" })));
    }, [inviteeEmails]);

    return (
        <Spin tip="Sending Invitations" spinning={sendingInvites}>
            <div className={Styles.InviteModalContainer}>
                <div className={Styles.InviteModalHeader}>
                    {showInvitations ? (
                        <h4>Validate and set optional names for the invitees</h4>
                    ) : (
                        <h4>
                            Invite members to join <span>{orgAttr.name}</span>
                        </h4>
                    )}
                    {!showInvitations && (
                        <span className={Styles.Description}>
                            Enter their email and hit <span className={Styles.KeyboardKey}>Space</span> or
                            <span className={Styles.KeyboardKey}>Enter</span> to add to the list.
                        </span>
                    )}
                </div>
                {error && <Alert message={error} closable type="error" showIcon onClose={() => setError("")} />}
                <div className={Styles.InviteModalContent} style={{ maxHeight: window.innerHeight - 250 }}>
                    {showInvitations ? (
                        <Table
                            dataSource={invitees}
                            rowKey={(r) => r.email}
                            pagination={false}
                            columns={[
                                { title: "Invitee Email", dataIndex: "email" },
                                {
                                    title: "Optional Name",
                                    render: (_, rec) => (
                                        <Input
                                            onChange={(e) =>
                                                setInvitees((r) => r.map((m) => (m.email == rec.email ? { ...m, names: e.target.value } : m)))
                                            }
                                        />
                                    ),
                                },
                                {
                                    title: "",
                                    width: 50,
                                    render: (_, rec) => getStatusView(rec),
                                },
                            ]}
                        />
                    ) : (
                        <UserTagsInput
                            value={inviteeEmails}
                            onChange={setInviteeEmails}
                            onRemoveTag={handleRemoveInviteeEmail}
                            onValidationReject={(value) => {
                                AppManager.alert.msgError(`Invalid Email "${value}"`);
                            }}
                        />
                    )}
                </div>
                <div className={Styles.InviteModalFooter}>
                    {!completed ? (
                        <Button
                            onClick={() => (showInvitations ? handleSendInvitations() : setShowInvitations(true))}
                            type="primary"
                            disabled={!inviteeEmails.length || sendingInvites}
                        >
                            {showInvitations ? (
                                <>
                                    <CheckIcon /> Send Invitation{invitees.length > 1 && "s"}
                                </>
                            ) : (
                                <>
                                    <ArrowRightIcon /> Next
                                </>
                            )}
                        </Button>
                    ) : renderCompletedBtn ? (
                        renderCompletedBtn()
                    ) : null}
                    {renderClose ? (
                        renderClose(completed)
                    ) : (
                        <Button onClick={onClose} style={{ marginLeft: 10 }}>
                            Close
                        </Button>
                    )}
                </div>
            </div>
        </Spin>
    );
};

export class MembersInviteModal {
    static openModal() {
        const modal = Modal.info({
            icon: null,
            centered: true,
            width: 700,
            className: Styles.ModalContainer,
            content: <InviteUsersView onClose={() => modal.destroy()} />,
            okButtonProps: { style: { display: "none" } },
        });
    }
}
