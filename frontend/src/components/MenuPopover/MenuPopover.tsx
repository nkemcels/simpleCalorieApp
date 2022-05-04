import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import BackIcon from "@ant-design/icons/LeftOutlined";
import Styles from "./MenuPopover.scss";
import { IconButton } from "../Buttons/IconButton/IconButton";
import classNames from "classnames";
import { CheckOutlined, DownOutlined, PlusSquareOutlined } from "@ant-design/icons";

export type TMenuPopoverOption = {
    value: string;
    label: string;
    icon?: React.ReactNode;
    desc?: string;
    disabled?: boolean;
    active?: boolean;
    type?: "default" | "component" | "basic";
};

type MenuPopoverProps = {
    menuTitle?: string;
    buttonIcon?: React.ReactNode;
    size?: "default" | "small" | "large";
    options: TMenuPopoverOption[] | { [groupName: string]: TMenuPopoverOption[] };
    hidePrevious?: boolean;
    isProcessing?: boolean;
    onSelectOption?: (option: TMenuPopoverOption) => void;
    renderOptionView?: (option: string, close: () => void) => React.ReactNode;
    getOptionViewTitle?: (option: string) => string;
};

type NewSetupContainerProps = {
    title: string;
    size?: "default" | "small" | "large";
    content: React.ReactNode;
    disablePrevious?: boolean;
    onPrevious?: () => void;
};

type MenuOptionsViewProps = {
    onSelectItem: (item: TMenuPopoverOption) => void;
    options: MenuPopoverProps["options"];
};

const MenuPopoverContainer: React.FC<NewSetupContainerProps> = ({ title, size, content, disablePrevious, onPrevious }) => {
    return (
        <div className={classNames(Styles.PopoverContainer, { [Styles.Small]: size == "small", [Styles.Large]: size == "large" })}>
            <div className={Styles.Header}>
                {onPrevious && (
                    <Button onClick={onPrevious} icon={<BackIcon />} size="small" type="link" className={Styles.BackBtn} disabled={disablePrevious} />
                )}
                <span className={Styles.Title}>{title}</span>
            </div>
            <div className={Styles.Content}>
                <div className={Styles.ContentWrapper}>{content}</div>
            </div>
        </div>
    );
};

const MenuOptionItem: React.FC<{ item: TMenuPopoverOption; onSelect: () => void }> = ({ item, onSelect }) => {
    return (
        <div
            className={classNames(Styles.Item, {
                [Styles.Disabled]: item.disabled,
                [Styles.Basic]: item.type === "basic",
                [Styles.Active]: item.active,
            })}
            onClick={() => !item.disabled && onSelect()}
        >
            <div className={classNames(Styles.ItemHeader)}>
                {item.icon}
                <h4>{item.label}</h4>
            </div>
            {item.desc && item.type !== "basic" && <div className={Styles.ItemDesc}>{item.desc}</div>}
            {item.active && <CheckOutlined className={Styles.ActiveIndicator} />}
        </div>
    );
};

const MenuOptionGroup: React.FC<{ groupName: string; items: TMenuPopoverOption[]; onSelectItem: (item: TMenuPopoverOption) => void }> = ({
    groupName,
    items,
    onSelectItem,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => setCollapsed((r) => !r);
    return (
        <div className={Styles.ItemGroup}>
            <div className={Styles.ItemGroupHeader} onClick={toggleCollapse}>
                <DownOutlined rotate={collapsed ? -90 : 0} /> {groupName}
            </div>
            {!collapsed && (
                <div className={Styles.ItemGroupContent}>
                    {items.map((t) => (
                        <MenuOptionItem key={t.label} item={t} onSelect={() => onSelectItem(t)} />
                    ))}
                </div>
            )}
        </div>
    );
};

const MenuOptionsView: React.FC<MenuOptionsViewProps> = ({ onSelectItem, options }) => {
    return (
        <div className={Styles.MenuOptionsContainer}>
            {Array.isArray(options)
                ? options.map((item) => <MenuOptionItem key={item.label} item={item} onSelect={() => onSelectItem(item)} />)
                : Object.keys(options).map((group) => (
                      <MenuOptionGroup key={group} groupName={group} items={options[group]} onSelectItem={onSelectItem} />
                  ))}
        </div>
    );
};

const MenuPopover: React.FC<MenuPopoverProps> = ({
    options,
    size,
    menuTitle,
    buttonIcon,
    hidePrevious,
    isProcessing,
    onSelectOption,
    renderOptionView,
    getOptionViewTitle,
    children,
}) => {
    const [showPopover, setShowPopover] = useState(false);
    const [currentSteps, setCurrentSteps] = useState<string[]>([]);

    const handleOptionSelected = (option: TMenuPopoverOption) => {
        if (option.type === "component") {
            setCurrentSteps((r) => [...r, option.value]);
        } else {
            closePopover();
        }
        onSelectOption?.(option);
    };

    const handleGoBack = () => {
        setCurrentSteps((r) => r.filter((_, i) => i !== r.length - 1));
    };

    const findInOptions = (value: string) => {
        if (Array.isArray(options)) return options.find((t) => t.value == value);
        else {
            let item: TMenuPopoverOption | undefined;
            const keys = Object.keys(options);
            for (let i = 0; i < keys.length; i++) {
                item = options[keys[i]].find((t) => t.value == value);
                if (item) return item;
            }
        }
    };

    const closePopover = () => setShowPopover(false);

    useEffect(() => {
        if (!showPopover) setTimeout(() => setCurrentSteps([]), 250);
    }, [showPopover]);

    useEffect(() => {
        if (!showPopover) setCurrentSteps([]);
    }, [showPopover]);

    const selectedValue = currentSteps[currentSteps.length - 1];

    return (
        <Popover
            key={`${showPopover}`}
            trigger={["click"]}
            placement="bottomLeft"
            visible={showPopover}
            onVisibleChange={isProcessing ? undefined : setShowPopover}
            overlayClassName={Styles.Overlay}
            content={
                currentSteps[currentSteps.length - 1] ? (
                    <MenuPopoverContainer
                        content={renderOptionView?.(selectedValue, closePopover)}
                        title={getOptionViewTitle?.(selectedValue) || findInOptions(selectedValue)?.label || selectedValue}
                        onPrevious={currentSteps.length && !hidePrevious ? handleGoBack : undefined}
                        disablePrevious={isProcessing}
                        size={size}
                    />
                ) : (
                    <MenuPopoverContainer
                        content={<MenuOptionsView options={options} onSelectItem={handleOptionSelected} />}
                        title={menuTitle || "Select an option"}
                        size={size}
                    />
                )
            }
        >
            {children || <IconButton icon={buttonIcon || <PlusSquareOutlined />} primary />}
        </Popover>
    );
};

export default MenuPopover;
