import { Col, Checkbox, Dropdown, Input, Menu, Row, Table, message, DatePicker, Slider, Select, List } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Button from "antd-button-color";
import SearchIcon from "@ant-design/icons/SearchOutlined";
import OptionsIcon from "@ant-design/icons/DownSquareOutlined";
import Styles from "./DataTable.scss";
import { ColumnGroupType, ColumnsType, TableProps, ColumnType } from "antd/lib/table";
import { debounce } from "throttle-debounce";
import ChevronDownIcon from "@ant-design/icons/DownOutlined";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import CloseIcon from "@ant-design/icons/CloseOutlined";
import CalendarIcon from "@ant-design/icons/CalendarFilled";
import RangeFilterIcon from "@ant-design/icons/FilterOutlined";
import moment from "moment";

type ColumnsDropdownProps = {
    hiddenColumns: React.ReactNode[];
    onToggleCheck: (t: React.ReactNode) => void;
    allColumnNames: React.ReactNode[];
};

const ColumnsDropdown: React.FC<ColumnsDropdownProps> = ({ hiddenColumns, allColumnNames, onToggleCheck }) => {
    const [visible, setVisible] = useState(false);
    const menu = (
        <Menu>
            <Menu.ItemGroup title="Visible Columns">
                {allColumnNames.map((t) => (
                    <Menu.Item key={`${t}`}>
                        <Checkbox checked={!hiddenColumns.includes(t)} onClick={() => onToggleCheck(t)}>
                            {t}
                        </Checkbox>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} onVisibleChange={setVisible} visible={visible}>
            <Button size="small">
                Columns <ChevronDownIcon />
            </Button>
        </Dropdown>
    );
};

type DataTableProps<T> = Omit<TableProps<T>, "columns"> & {
    extraActions?: React.ReactNode;
    filterPredicate: (d: T, search: string) => boolean;
    colFilterPredicate?: (row: T, filters: ColumnFilter) => boolean;
    getColumns: (searchTexts: string[]) => ColumnsType<T>;
    searchInputPlaceholder?: string;
    hiddenColumns?: React.ReactNode[];
};

type FilterType = { type: "date" | "range" | "text" | "option" | "multiple"; config?: any };
export type ColumnFilter = { [k: string]: { data: string | string[]; filter: FilterType } };
export type DataTableColumnTypes<T> = ((ColumnGroupType<T> | ColumnType<T>) & {
    filterType?: FilterType;
    fKey?: string;
})[];

// eslint-disable-next-line @typescript-eslint/ban-types
const DataTable = <T extends object>(props: DataTableProps<T>) => {
    const [filtersEnabled, setFiltersEnabled] = useState(false);
    const [stateData, setStateData] = useState(props.dataSource);
    const [inputSearchText, setInputSearchText] = useState("");
    const [visibleColumns, setVisibleColumns] = useState<DataTableColumnTypes<T>>([]);
    const [hiddenColumnNames, setHiddenColumnNames] = useState<React.ReactNode[]>(props.hiddenColumns || []);
    const [allColumns, setAllColumns] = useState<DataTableColumnTypes<T>>([]);
    const [searchTexts, setSearchTexts] = useState<string[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter>({});

    const toggleHiddenColumn = (colName: React.ReactNode) => {
        setHiddenColumnNames((hiddenCols) => {
            if (hiddenCols.includes(colName)) {
                return hiddenCols.filter((t) => t !== colName);
            } else {
                if (hiddenCols.length + 1 === allColumns.filter((t) => t.title).length) {
                    message.error("Cannot hide all columns of the table");
                    return hiddenCols;
                }
                return [...hiddenCols, colName];
            }
        });
    };

    const debouncedSearch = useCallback(
        debounce(500, (search: string, data: readonly T[]) => {
            const searches = search
                .split(/\s+/)
                .map((t) => t.trim())
                .filter((t) => t);
            setSearchTexts(searches);
            if (searches.length) {
                setStateData(
                    data.filter((t) => {
                        for (let i = 0; i < searches.length; i++) {
                            if (!props.filterPredicate(t, searches[i].trim())) return false;
                        }
                        return true;
                    }),
                );
            } else setStateData(data);
        }),
        [props.dataSource],
    );

    const handleAddFilter = (colKey: string, filterVal: string | string[], filterType: FilterType) => {
        setColumnFilters((colFilters) => {
            return { ...colFilters, [colKey]: { data: filterVal, filter: filterType } };
        });
    };

    const formatFilterDisplayValue = (filterVal: { data: string | string[]; filter: FilterType }) => {
        if (filterVal.filter.type === "date" && filterVal.data.length == 2) {
            return `${moment(filterVal.data[0]).format("dd-MM-YYYY")} - ${moment(filterVal.data[1]).format("dd-MM-YYYY")}`;
        } else if (filterVal.filter.type === "range" && filterVal.data.length == 2) {
            return `${filterVal.data[0]} - ${filterVal.data[1]}`;
        } else if (typeof filterVal.data == "string") {
            return filterVal.data;
        } else if (Array.isArray(filterVal.data)) {
            return filterVal.data.join(",");
        }
    };

    const handleRemoveColFilter = (col: string) => {
        delete columnFilters[col];
        setColumnFilters({ ...columnFilters });

        filterTable();
    };

    const filterTable = (confirm: () => void = () => {}) => {
        confirm();
        setColumnFilters((columnFilters) => {
            if (props.colFilterPredicate) {
                const newStateData = [];
                if (Object.keys(columnFilters).length) {
                    for (let i = 0; i < (props.dataSource || []).length; i++) {
                        if (props.colFilterPredicate(props.dataSource![i], columnFilters)) {
                            newStateData.push(props.dataSource![i]);
                        }
                    }
                    setStateData(newStateData);
                } else setStateData(props.dataSource || []);
            }

            return columnFilters;
        });
    };

    const getColumnFlterProps = (colKey: string, filterType: FilterType) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                {filterType.type === "date" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <DatePicker.RangePicker
                            onChange={(val) =>
                                val &&
                                handleAddFilter(
                                    colKey,
                                    val.map((r) => r?.toISOString() || ""),
                                    filterType,
                                )
                            }
                        />
                        <Button size="small" children="Filter" style={{ marginLeft: 7 }} type="primary" onClick={() => filterTable(confirm)} />
                    </div>
                ) : filterType.type === "range" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Slider
                            range
                            min={filterType.config?.min || 0}
                            max={filterType.config?.max || 100}
                            defaultValue={[0, 100]}
                            style={{ minWidth: 250 }}
                            tipFormatter={(val) => `${val} ${filterType.config?.name || ""}`}
                            onChange={(val) =>
                                val &&
                                handleAddFilter(
                                    colKey,
                                    val.map((r) => `${r}`),
                                    filterType,
                                )
                            }
                        />
                        <Button size="small" children="Filter" style={{ marginLeft: 7 }} type="primary" onClick={() => filterTable(confirm)} />
                    </div>
                ) : filterType.type === "option" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Select
                            autoFocus
                            placeholder="Search Column"
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e?.toString() ? [e?.toString()] : [])}
                            options={filterType.config.options || []}
                            style={{ minWidth: 200 }}
                        />
                        <Button
                            size="small"
                            children="Filter"
                            style={{ marginLeft: 7 }}
                            type="primary"
                            onClick={() => {
                                handleAddFilter(colKey, selectedKeys[0], filterType);
                                filterTable(confirm);
                            }}
                        />
                    </div>
                ) : filterType.type === "multiple" ? (
                    <div>
                        <List
                            dataSource={filterType.config.options || []}
                            header="Select Item"
                            renderItem={(item: any) => (
                                <div style={{ marginBottom: 5 }}>
                                    <Checkbox
                                        children={item.label}
                                        checked={selectedKeys.includes(item.value)}
                                        onChange={(e) => {
                                            if (selectedKeys.includes(item.value)) setSelectedKeys(selectedKeys.filter((r: any) => r !== item.value));
                                            else setSelectedKeys([...selectedKeys, item.value]);
                                        }}
                                    />
                                </div>
                            )}
                            style={{ minWidth: 200 }}
                        />
                        <Button
                            size="small"
                            children="Filter"
                            style={{ marginTop: 5 }}
                            type="primary"
                            onClick={() => {
                                handleAddFilter(colKey, selectedKeys, filterType);
                                filterTable(confirm);
                            }}
                        />
                    </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                            autoFocus
                            placeholder="Search Column"
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => {
                                handleAddFilter(colKey, selectedKeys[0], filterType);
                                filterTable(confirm);
                            }}
                            style={{ marginBottom: 8, display: "block" }}
                        />
                        <Button
                            size="small"
                            children="Filter"
                            style={{ marginLeft: 7 }}
                            type="primary"
                            onClick={() => {
                                handleAddFilter(colKey, selectedKeys[0], filterType);
                                filterTable(confirm);
                            }}
                        />
                    </div>
                )}
            </div>
        ),
        filterIcon: (filtered: boolean) =>
            filterType.type == "date" ? (
                <CalendarIcon style={{ color: "#0090ff" }} />
            ) : filterType.type === "range" ? (
                <RangeFilterIcon style={{ color: "#0090ff" }} />
            ) : filterType.type === "option" || filterType.type === "multiple" ? (
                <OptionsIcon style={{ color: "#0090ff" }} />
            ) : (
                <SearchOutlined style={{ color: "#0090ff" }} />
            ),
        // onFilter: (value: any, record: T) => handleFilterColumn(record, colKey, value),
    });

    useEffect(() => {
        if (props.dataSource) {
            debouncedSearch(inputSearchText, props.dataSource);
        } else {
            setStateData([]);
        }
    }, [inputSearchText, props.dataSource]);

    useEffect(() => {
        setAllColumns(props.getColumns(searchTexts));
    }, [props.getColumns, searchTexts]);

    useEffect(() => {
        setHiddenColumnNames(props.hiddenColumns || []);
    }, [props.hiddenColumns]);

    useEffect(() => {
        const columns = hiddenColumnNames.length ? allColumns.filter((t) => !hiddenColumnNames.includes(t.title!)) : allColumns;
        if (filtersEnabled) {
            setVisibleColumns(
                columns.map((column) => ({
                    ...column,
                    ...(typeof column.fKey == "string" && column.filterType ? getColumnFlterProps(column.fKey, column.filterType) : {}),
                })),
            );
        } else {
            // clear all current filters
            setVisibleColumns(columns);
        }
    }, [allColumns, hiddenColumnNames, filtersEnabled]);

    return (
        <div className={Styles.Container}>
            <div className={Styles.TopHeaderControls}>
                <div className={Styles.SearchFieldWrapper}>
                    <Input
                        prefix={<SearchIcon />}
                        placeholder={props.searchInputPlaceholder || "Search..."}
                        value={inputSearchText}
                        allowClear
                        onChange={(e) => setInputSearchText(e.target.value)}
                    />
                </div>
                <div className={Styles.ActionsWrapper}>
                    {props.colFilterPredicate && (
                        <Button
                            size="small"
                            style={{ marginRight: 5 }}
                            onClick={() => setFiltersEnabled((r) => !r)}
                            type={filtersEnabled ? "warning" : "default"}
                        >
                            {filtersEnabled ? "Hide Filters" : "Show Filters"}
                            {!!Object.keys(columnFilters).length ? ` (${Object.keys(columnFilters).length})` : ""}
                        </Button>
                    )}
                    <ColumnsDropdown
                        allColumnNames={allColumns.filter((t) => t.title).map((t) => t.title!)}
                        hiddenColumns={hiddenColumnNames}
                        onToggleCheck={toggleHiddenColumn}
                    />
                </div>
                {props.extraActions && <div>{props.extraActions}</div>}
            </div>
            {filtersEnabled && !!Object.keys(columnFilters).length && (
                <div className={Styles.FiltersContainer}>
                    {Object.keys(columnFilters).map((col) => (
                        <div key={col} className={Styles.FilterItem}>
                            <div className={Styles.Col}>{col}:</div>
                            <div className={Styles.Vals}>{formatFilterDisplayValue(columnFilters[col])}</div>
                            <CloseIcon className={Styles.CloseBtn} onClick={() => handleRemoveColFilter(col)} />
                        </div>
                    ))}
                </div>
            )}
            <div className={Styles.TableContainer}>
                <Table<T> {...props} dataSource={stateData} columns={visibleColumns} scroll={{ x: visibleColumns.length * 185 }} />
            </div>
        </div>
    );
};

export default DataTable;
