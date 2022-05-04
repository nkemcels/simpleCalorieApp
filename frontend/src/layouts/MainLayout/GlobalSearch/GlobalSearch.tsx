import { Input, Popover, Progress, Tag } from "antd";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@ant-design/icons/SearchOutlined";
import Styles from "./GlobalSearch.scss";
import { debounce } from "throttle-debounce";
import BasicErrorView from "../../../components/ErrorView/BasicErrorView/BasicErrorView";
import HighlightText from "../../../components/HighlightText/HighlightText";

const ResultsPlaceHolder = () => {
    return <div className={Styles.NoResultContainer}>Enter at least three characters to begin search</div>;
};

const ResultsError: React.FC<{ error: string }> = ({ error }) => {
    return (
        <div className={Styles.NoResultContainer}>
            <BasicErrorView error={error} />
        </div>
    );
};

const NoResultsView: React.FC<{ search: string }> = ({ search }) => {
    return (
        <div className={Styles.NoResultContainer}>
            No results for the term <b>&quot;{search}&quot;</b>
        </div>
    );
};

const getMatchedField = (fields: Record<string, any>, text: string): [string, string] => {
    for (const item of Object.keys(fields)) {
        if (typeof fields[item] === "string" && fields[item].toLowerCase().includes(text.toLowerCase())) {
            return [item, fields[item]];
        }
    }
    return ["", ""];
};

type TypeColor = "blue" | "orange" | "magenta" | "pink" | "cyan" | "green" | "purple" | "geekblue" | "volcano" | "gold" | "lime";

const MatchItemDisplay: React.FC<{
    item: Record<string, any>;
    text: string;
    itemType: string;
    itemIcon: React.ReactNode;
    itemPreview: React.ReactNode;
    onClick: () => void;
    typeColor?: TypeColor;
    stripHtml?: boolean;
}> = ({ item, text, itemType, itemPreview, itemIcon, onClick, typeColor = "default", stripHtml }) => {
    const [matchResult] = useState<[string, string]>(getMatchedField(item, text));
    return (
        <div className={Styles.ItemListValueContainer} onClick={onClick}>
            <div className={Styles.MatchValueContainer}>
                <div className={Styles.MatchValue}>
                    {matchResult[1].length > 300 ? <div>text</div> : <HighlightText text={matchResult[1]} searches={[text]} stripHtml={stripHtml} />}
                </div>
                <span>
                    <Tag color={typeColor} className={Styles.MatchField}>
                        {itemType}
                    </Tag>
                </span>
            </div>
            <div className={Styles.MatchEntityContainer}>
                <div className={Styles.Icon}>{itemIcon}</div>
                <div className={Styles.Name}>{itemPreview}</div>
            </div>
        </div>
    );
};

const ResultItemGroup: React.FC<{
    items: Record<string, any>[];
    text: string;
    renderPreview: (item: Record<string, any>) => React.ReactNode;
    itemIcon: React.ReactNode;
    itemType: string;
    typeColor?: TypeColor;
    stripHtml?: boolean;
    onItemClick: (item: Record<string, any>) => void;
}> = ({ items, text, renderPreview, onItemClick, itemIcon, itemType, typeColor, stripHtml }) => {
    return (
        <div className={Styles.ResultsGroup}>
            <div className={Styles.ItemHeader}>{itemType}</div>
            <div className={Styles.ItemList}>
                {items.map((ct) => (
                    <div key={ct._id}>
                        <MatchItemDisplay
                            item={ct}
                            text={text}
                            itemType={itemType}
                            itemIcon={itemIcon}
                            stripHtml={stripHtml}
                            // itemPreview={`${ct.firstName} ${ct.lastName}`}
                            itemPreview={renderPreview(ct)}
                            typeColor={typeColor}
                            onClick={() => onItemClick(ct)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ResultsView: React.FC<{ results: any; text: string }> = ({ results, text }) => {
    return (
        <div className={Styles.ResultsView}>
            {Object.keys(results || {}).map((item) =>
                item === "individuals" ? <div>handle type</div> : item === "companies" ? <div>handle type</div> : null,
            )}
        </div>
    );
};

const ResultsContent: React.FC<{ searchText: string }> = ({ searchText }) => {
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);
    const [results, setResults] = useState<any>({});
    const fetchResults = useCallback((search = searchText) => {
        if (!search) return;
        setError("");
        setFetching(true);
        // ftech results
    }, []);
    const debounce_fetchResult = useCallback(debounce(2000, fetchResults), []);
    useEffect(() => {
        setFetching(true);
        debounce_fetchResult(searchText);
    }, [searchText]);

    return searchText.length < 3 ? (
        <ResultsPlaceHolder />
    ) : error ? (
        <ResultsError error={error} />
    ) : (
        <div style={{ width: "100%", minHeight: 300, padding: 15 }}>
            {fetching && <Progress status="active" style={{ width: "100%" }} showInfo={false} percent={90} />}
            {Object.keys(results).length ? <ResultsView results={results} text={searchText} /> : <NoResultsView search={searchText} />}
        </div>
    );
};

const GlobalSearchInput = () => {
    const [searchText, setSearchText] = useState("");
    const [isFocused, setFocused] = useState(false);
    const [resultsVisible, showResultsView] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const toggleSearchFocus = (state: boolean) => () => {
        setFocused(state);
        showResultsView(state);
    };
    return (
        <div className={Styles.Container}>
            <div ref={searchContainerRef} className={classNames(Styles.SearchContainer, { [Styles.Active]: isFocused })}>
                <Input
                    className={classNames(Styles.Input, { [Styles.Active]: isFocused })}
                    onFocus={toggleSearchFocus(true)}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchIcon />}
                    value={searchText}
                    placeholder="Search..."
                />
                <Popover
                    overlayClassName={Styles.ResultsViewPopover}
                    visible={resultsVisible}
                    placement="bottomRight"
                    content={<ResultsContent searchText={searchText} />}
                    getTooltipContainer={() => searchContainerRef.current!}
                    getPopupContainer={() => searchContainerRef.current!}
                ></Popover>
            </div>
            <div className={classNames(Styles.ResultsOverlay, { [Styles.Active]: isFocused })} onClick={toggleSearchFocus(false)} />
        </div>
    );
};

export default GlobalSearchInput;
