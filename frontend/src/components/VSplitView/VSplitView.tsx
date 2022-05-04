import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import Styles from "./VSplitView.scss";
import { useResizeDetector } from "react-resize-detector";
import { LocalStorageHelper } from "../../misc/utils/LocalStorageHelper";

type THSplitViewProps = {
    mainAtBottom?: boolean;
    maxHeight?: number | string;
    minHeight?: number | string;
    defaultHeight?: number | string;
    stateKey?: string;
};

export const VSplitView: React.FC<THSplitViewProps> = ({ mainAtBottom, maxHeight, minHeight, defaultHeight, stateKey, children }) => {
    const absStateKey = `${stateKey}--VSplitView`;
    const [height, setHeight] = useState<number>(
        stateKey
            ? LocalStorageHelper.get(absStateKey || "") || (typeof defaultHeight === "number" ? defaultHeight : 0)
            : typeof defaultHeight === "number"
            ? defaultHeight
            : 0,
    );
    const { ref: containerRef, height: containerHeight } = useResizeDetector();
    useEffect(() => {
        LocalStorageHelper.save(absStateKey, height);
    }, [height]);
    useEffect(() => {
        if (containerHeight && !height) {
            if (typeof defaultHeight === "string") {
                const val = defaultHeight.replace("%", "").trim();
                if (!Number.isNaN(Number(val))) setHeight((containerHeight * Number(val)) / 100);
            } else if (!defaultHeight) {
                setHeight(containerHeight / 2);
            }
        }
    }, [containerHeight, height, defaultHeight]);

    return (
        <div className={Styles.Container}>
            <div className={Styles.InnerWrapper} ref={containerRef}>
                {!mainAtBottom && <div className={Styles.ContentView}>{React.Children.toArray(children)[0]}</div>}
                <Resizable
                    enable={{ top: !mainAtBottom, bottom: !!mainAtBottom }}
                    size={{ height: height || "50%", width: "100%" }}
                    maxHeight={maxHeight}
                    minHeight={minHeight}
                    handleWrapperClass={Styles.ResizeHandleWrapper}
                    className={Styles.ResizeView}
                    onResizeStop={(evt, dir, elt, delta) => setHeight((r) => r + delta.height)}
                >
                    {React.Children.toArray(children)[mainAtBottom ? 0 : 1]}
                </Resizable>
                {mainAtBottom && <div className={Styles.ContentView}>{React.Children.toArray(children)[1]}</div>}
            </div>
        </div>
    );
};
