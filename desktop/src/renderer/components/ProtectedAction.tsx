import { Tooltip } from "antd";
import React from "react";

const ProtectedAction: React.FC<{ comp: React.ReactElement; allow: boolean }> = ({ allow, comp }) => {
    return <> {allow ? comp : <Tooltip title="You cannot perform this action" children={React.cloneElement(comp, { disabled: true })} />}</>;
};

export default ProtectedAction;
