import { Tabs } from "antd";
import React, { useState } from "react";
import Styles from "./SectionPane.scss";

const TabSectionPane: React.FC<{
    tabs: { title: React.ReactNode; key: string }[];
    renderExtraActions?: (activeTab: string) => React.ReactNode;
    children: (activeTab: string) => React.ReactNode;
}> = ({ children, renderExtraActions, tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].key || "");
    return (
        <section className={Styles.Section}>
            <div className={Styles.Header}>
                <span className={Styles.NameWrapper}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab}>
                        {tabs.map((tab) => (
                            <Tabs.TabPane key={tab.key} tab={tab.title} />
                        ))}
                    </Tabs>
                </span>
                {renderExtraActions && renderExtraActions(activeTab)}
            </div>
            <div className={Styles.DetailsWrapper}>{children(activeTab)}</div>
        </section>
    );
};

export default TabSectionPane;
