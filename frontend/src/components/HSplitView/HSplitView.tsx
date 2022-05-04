import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import Styles from "./HSplitView.module.scss";
import { useResizeDetector } from "react-resize-detector";
import { LocalStorageHelper } from "../../misc/utils/LocalStorageHelper";

type THSplitViewProps = {
    mainAtLeft?: boolean;
    maxWidth?: number | string;
    minWidth?: number | string;
    defaultWidth?: number | string;
    stateKey?: string;
};

export const HSplitView: React.FC<THSplitViewProps> = ({ mainAtLeft, maxWidth, minWidth, defaultWidth, stateKey, children }) => {
    const absStateKey = `${stateKey}--HSplitView`;
    const [width, setWidth] = useState<number>(
        stateKey
            ? LocalStorageHelper.get(absStateKey || "") || (typeof defaultWidth === "number" ? defaultWidth : 0)
            : typeof defaultWidth === "number"
            ? defaultWidth
            : 0,
    );

    const { ref: containerRef, width: containerWidth } = useResizeDetector();

    useEffect(() => {
        LocalStorageHelper.save(absStateKey, width);
    }, [width]);

    useEffect(() => {
        if (containerWidth && !width) {
            if (typeof defaultWidth === "string") {
                const val = defaultWidth.replace("%", "").trim();
                if (!Number.isNaN(Number(val))) setWidth((containerWidth * Number(val)) / 100);
            } else if (!defaultWidth) {
                setWidth(containerWidth / 2);
            }
        }
    }, [containerWidth, width, defaultWidth]);

    return (
        <div className={Styles.Container}>
            <div className={Styles.InnerWrapper} ref={containerRef}>
                {mainAtLeft && <div className={Styles.ContentView}>{React.Children.toArray(children)[0]}</div>}
                <Resizable
                    enable={{ right: !mainAtLeft, left: !!mainAtLeft }}
                    size={{ width: width || "50%", height: "100%" }}
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    handleWrapperClass={Styles.ResizeHandleWrapper}
                    className={Styles.ResizeView}
                    onResizeStop={(evt, dir, elt, delta) => setWidth((r) => r + delta.width)}
                >
                    {React.Children.toArray(children)[mainAtLeft ? 1 : 0]}
                </Resizable>
                {!mainAtLeft && <div className={Styles.ContentView}>{React.Children.toArray(children)[1]}</div>}
            </div>
        </div>
    );
};
