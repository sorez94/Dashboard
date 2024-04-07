import {
    getSelectedState,
    Grid,
    GridColumn,
    GridColumnMenuFilter,
    GridHeaderSelectionChangeEvent,
    GridProps,
    GridToolbar,
    setSelectedState
} from "@progress/kendo-react-grid";
import React, {MouseEventHandler, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getter, process, State} from "@progress/kendo-data-query";
import {makeStyles, useTheme} from "@mui/styles";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import clsx from "clsx";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import axios from "axios";
import {setExpandedState, setGroupIds} from "@progress/kendo-react-data-tools";
import CustomTooltip from "./CustomTooltip";
import {FormControl, IconButton, MenuItem, Pagination, Select} from "@mui/material";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons";
import {CustomColumnMenu} from "./CustomColumnMenu";
import {IntlProvider, load, LocalizationProvider} from '@progress/kendo-react-intl';
import '@progress/kendo-theme-default/dist/all.css'; // If you want to use flag icons for language selection
import faMessages from './global/fa-IR.json'; // Persian (Farsi) messages
load(faMessages, 'fa-FA'); // Load Persian locale


const useStyles = makeStyles((theme: any) => ({
    grid: {
        '& .MuiPagination-root': {
            marginTop: 7,
            display: 'flex'
        },
        '& .MuiButtonBase-root': {
            minWidth: 24,
            height: 24,
            fontSize: 14,
        },
        '& th .k-cell-inner': {
            width: '100%',
            margin: '0 !important'
        },
        '& th .k-link': {
            padding: '0 !important'
        },
        '& table': {
            width: 'auto'
        },
        '& .k-grid-container': {
            height: 120
        },
        '& .k-grid-content': {
            overflow: "auto"
        },
        '.k-grid-content::-webkit-scrollbar': {
            width: 5,
            backgroundColor: 'black'
        },
        '& .k-grid-toolbar': {
            display: "block"
        },
        boxShadow: theme.shadows[1]
    },
    pager: {
        minHeight: 20,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    },
    pagerNav: {
        width: '86%',
        display: 'inline-flex',
        alignItems: 'center'
    },
    pagerInfo: {
        position: "absolute",
        left: 10,
    },
    pagerInfoText: {
        fontSize: 12
    },
    pagerSelect: {
        padding: '7px 25px 7px 10px'
    },
    rightItems: {
        float: "right"
    },
    textItem: {
        padding: 0,
        cursor: "default"
    },
    leftItems: {
        float: "left"
    },
    checkbox: {
        display: 'table-cell',
        textAlign: "center!important" as "center"
    },
    headerCheckbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'inherit'
    },
}));

export enum GridFilterType {
    text = 'text',
    numeric = 'numeric',
    date = 'date'
}

export const PageSizes = [
    ['10', '20', '50', '100'],
    ['20', '50', '100', '300'],
    ['100', '300', '500', '1000']
]

export enum PageSize {
    small = 10,
    medium = 20,
    large = 100
}

export interface IGridColumn {
    field: string,
    title: string,
    filter?: GridFilterType,
    width?: any,
    show?: boolean,
    cell?: any,
    isCheckboxFilter?: boolean,
    editable?: boolean,
    editor?: any
}

export interface IPagerItem {
    isVisible?: boolean,
    title?: string,
    icon: IconDefinition,
    iconColor?: string,
    onClick?: MouseEventHandler,
}

export interface IToolbarItem {
    title?: string,
    icon?: JSX.Element,
    element?: JSX.Element,
    onClick?: (item: any) => void,
    noSelectWarning?: boolean,
    isText?: boolean
}

const getPageSizes = (pageSize) => {
    let pageSizes = PageSizes[0];
    PageSizes.map(ps => {
        if (parseInt(ps[0]) === pageSize) {
            pageSizes = ps;
        }
    });

    return pageSizes;
}

const isColumnActive = (field: string, dataState: State) => {
    const isGrouped = dataState.group?.find(a => a.field === field);
    return (
        GridColumnMenuFilter.active(field, dataState.filter) || isGrouped
    );
};

export interface IGridProps extends GridProps {
    data?: any,
    columns: any,
    dataItemKey?: string,
    exportToExcel?: boolean,
    exportMultipleSheet?: boolean,
    pagerItems?: Array<IPagerItem>,
    toolbarItems?: Array<IToolbarItem>,
    leftToolbarItems?: Array<IToolbarItem>,
    pagerInfo?: ReactElement,
    hasCheckboxColumn?: boolean,
    getSelectedItems?: (items) => void,
    selectedItems?: any,
    onSelectionChange?: (item) => void,
    pager?: any,
    isLoading?: boolean,
    url?: string,
    conditionalHeader?: (item) => boolean
}

const aggregates: any = [];
const processWithGroups = (data: any, dataState: any) => {
    const groups = dataState.group;
    if (groups) {
        groups.map((group: any) => (group.aggregates = aggregates));
    }
    dataState.group = groups;
    const newDataState = process(data, dataState);
    setGroupIds({
        data: newDataState.data,
        group: dataState.group,
    });
    return newDataState;
};

const loadingPanel = (
    <div className="k-loading-mask">
        <span className="k-loading-text">Loading</span>
        <div className="k-loading-image"/>
        <div className="k-loading-color"/>
    </div>
);
export const SELECTED_FIELD: string = "selected";
export const EXPANDED_FIELD: string = "expanded";

const CustomGrid = (props: IGridProps) => {
    const theme: any = useTheme();
    const classes = useStyles();
    const {url} = props;
    const [page, setPage] = useState(0);
    const [data, setData] = useState(props.data);
    useEffect(() => {
        if (!props.data) return;
        setData(props.data);
    }, [props.data]);
    const [isLoading, setIsLoading] = useState(props.isLoading);
    useEffect(() => {
        setIsLoading(props.isLoading);
    }, [props.isLoading]);
    const DATA_ITEM_KEY: string = props.dataItemKey ? props.dataItemKey : "Id";
    const idGetter = getter(DATA_ITEM_KEY);
    const [selectedItem, setSelectedItem] = useState<{
        [id: string]: boolean | number[];
    }>(props.selectedItems ? props.selectedItems : {});

    const [collapsedState, setCollapsedState] = useState([]);
    const [columnsState, setColumnsState] = useState(props.columns);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const pageSize = props.pageSize ? props.pageSize : PageSize.medium;

    const initialState: any = {
        take: props.pageable !== false ? pageSize : 0,
        skip: 0,
        group: []
    }

    const [dataState, setDataState] = useState(initialState);

    const [result, setResult] = useState<any>({data: [], total: 0});

    useEffect(() => {
        setResult(processWithGroups(data, dataState));
    }, [data, dataState]);

    useEffect(() => {
        if (props.data?.length) {
            setTotalPages(Math.ceil((result.total || 0) / dataState.take));
        }
    }, [result.total, dataState]);

    const currentPage = Math.floor(dataState.skip / dataState.take) + 1;
    //const totalPages = Math.ceil((result.total || 0) / dataState.take);

    const pageSizes = getPageSizes(pageSize);
    const [pageSizeValue, setPageSizeValue] = useState(pageSizes[0]);

    const pagerItems = props.pagerItems ? props.pagerItems : [];
    const toolbarItems = props.toolbarItems ? props.toolbarItems : [];
    const leftToolbarItems = props.leftToolbarItems ? props.leftToolbarItems : [];

    const _grid = useRef<any>();
    const _export = useRef<ExcelExport | null>(null);

    const onColumnsSubmit = (columnsState) => {
        setColumnsState(columnsState);
    }

    const onPageSizeChange = (value) => {

        if (!value) {
            return;
        }
        if (currentPage > totalPages) {
            setDataState({
                ...dataState,
                take: value,
                skip: (totalPages - 1) * value
            })
        } else {
            setDataState({
                ...dataState,
                take: value,
                skip: (currentPage - 1) * value
            })
        }
        setPageSizeValue(value);
    }

    const pageChange = (e, value) => {
        if (!value) {
            return;
        }
        setDataState({
            ...dataState,
            skip: (value - 1) * dataState.take,
            take: dataState.take,
        });
    }

    const dataStateChange = (event: any) => {
        // const newDataState = processWithGroups(data, event.dataState);
        // setResult(newDataState);
        setDataState(event.dataState);
    };

    const expandChange = (event: any) => {
        const item = event.dataItem;
        if (item.groupId) {
            const newCollapsedIds: any = !event.value
                ? [...collapsedState, item.groupId]
                : collapsedState.filter((groupId) => groupId !== item.groupId);
            setCollapsedState(newCollapsedIds);
        }
    };

    const selectionChange = (event: any) => {
        const newSelectedState = getSelectedState({
            event,
            selectedState: selectedItem,
            dataItemKey: DATA_ITEM_KEY,
        });
        props.onSelectionChange ? props.onSelectionChange(getSelectedItems(newSelectedState)) : undefined;
        setSelectedItem(newSelectedState);
    };

    const onHeaderSelectionChange = useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            const checkboxElement: any = event.syntheticEvent.target;
            const checked = checkboxElement.checked;
            const newSelectedState = {};

            event.dataItems.forEach((item) => {
                if (props.conditionalHeader) {
                    if (props.conditionalHeader(item)) {
                        newSelectedState[idGetter(item)] = checked;
                    }
                } else {
                    newSelectedState[idGetter(item)] = checked;
                }
            });
            setSelectedItem(newSelectedState);
        },
        []
    );

    useEffect(() => {
        props.getSelectedItems ? props.getSelectedItems(getSelectedItems(selectedItem)) : undefined;
    }, [selectedItem]);

    const getSelectedItems = (selectedState) => {
        let selectedItems: any;
        if (props.selectable?.mode === "multiple") {
            selectedItems = data?.filter((item) => (selectedState[idGetter(item)]));
        } else {
            selectedItems = data?.find((item) => (selectedState[idGetter(item)]));
        }
        return selectedItems;
    }

    const exportToExcel = () => {
        if (_export.current !== null) {
            _export.current.save(process(data, {...dataState, take: data.length}).data, _grid.current.columns);
        }
    }
    const pagerInfoHtml = () => {
        let from = (currentPage - 1) * parseInt(pageSizeValue) + 1;
        const to = currentPage < totalPages ? currentPage * parseInt(pageSizeValue) : result.total;
        from = to > 0 ? from : 0;
        const of = 'از';
        const item = 'مورد';
        return (
            <div className={clsx(classes.pagerInfo, "flex items-center justify-center")}>
                <span
                    className={classes.pagerInfoText}>{`${from} - ${to} ${of} ${result.total} ${item}`}</span>
            </div>
        )
    }

    const pagerItemsHtml = () => {
        return (
            pagerItems.map((item, idx) => (
                item.isVisible ? <CustomTooltip key={idx} title={item.title} placement="top">
                    <IconButton onClick={item.onClick}>
                        <CustomFontAwesomeIcon icon={item.icon}
                                               color={item.iconColor ? item.iconColor : ""}/>
                    </IconButton>
                </CustomTooltip> : ""
            ))
        );
    }

    const pagerItemsMemo = useMemo(pagerItemsHtml, [pagerItems]);

    const selectedItems = getSelectedItems(selectedItem);

    const toolbarItemClick = (item: IToolbarItem) => {
        item.onClick ? item.onClick(selectedItems) : undefined;
    }

    const requestUrl = (page, pageSize) => {
        setIsLoading(true);
        return url ? axios.get(url, {
            params: {
                page: page,
                pageSize: pageSize
            }
        }).then((response: any) => {
            setData(response.data.Data.Data);
            setPage(response.data.Data.Page);
            setTotalCount(response.data.Data.TotalCount);
            setTotalPages(Math.ceil((response.data.Data.TotalCount || 0) / pageSize));
        }).catch((error) => {

        }).finally(() => {
            setIsLoading(false);
        }) : undefined;
    }

    useEffect(() => {
        if (!url) return;
        requestUrl(dataState.skip + 1, dataState.take);
    }, [url]);

    const expandedData = setExpandedState({
        data: result?.data,
        collapsedIds: collapsedState,
    });

    const selectedData = setSelectedState({
        data: expandedData,
        selectedState: selectedItem,
        dataItemKey: DATA_ITEM_KEY,
        selectedField: SELECTED_FIELD
    });

    const translations = {
        // Add translations for grid components here
        grid: {
            columns: {
                exampleColumn: 'مثال ستون',
                // Add more column translations as needed
            },
            filterMenu: {
                info: 'اطلاعات فیلتر',
                // Add more filter menu translations as needed
            },
            pager: {
                page: 'صفحه',
                // Add more pager translations as needed
            },
            // Add more general translations as needed
        },
    };

    return (
        <>
            <IntlProvider locale="fa-FA">
                    <div dir={theme.direction} className={`k-${theme.direction} h-full`}>
                        <ExcelExport ref={_export} dir={theme.direction}/>
                        {isLoading && loadingPanel}
                        <Grid
                            {...props}
                            ref={_grid}
                            className={clsx(classes.grid, "h-full", props.className)}
                            data={selectedData}
                            sortable={props.sortable ?? true}
                            resizable={props.resizable ?? true}
                            pageable={props.pageable ?? true}
                            selectable={props.selectable ?? {
                                enabled: true,
                                drag: false,
                                cell: false,
                                mode: 'single',
                            }}
                            pager={() => (
                                props.pager !== null ? <div className={clsx(classes.pager, "flex items-center")}>
                                    <div className={clsx(classes.pagerNav, "flex items-center")}>
                                        <Pagination count={totalPages} page={page ? page : currentPage}
                                                    onChange={(event, value) => pageChange(event, value)}
                                                    color="primary"/>
                                        <FormControl size="small">
                                            <Select variant="outlined"
                                                    value={pageSizeValue}
                                                    MenuProps={{
                                                        style: {zIndex: 15000}
                                                    }}
                                                    classes={{select: classes.pagerSelect}}
                                                    onChange={(event) => onPageSizeChange(event.target.value)}>
                                                {
                                                    pageSizes.map((item, index) => <MenuItem key={index}
                                                                                             value={item}>{item}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                        {
                                            props.exportToExcel ?
                                                <CustomTooltip title={'خروجی به اکسل'} placement="top">
                                                    <IconButton onClick={exportToExcel}>
                                                        <CustomFontAwesomeIcon icon={faFileExcel} color="green"/>
                                                    </IconButton>
                                                </CustomTooltip> : ""
                                        }
                                        {
                                            pagerItemsMemo
                                        }
                                    </div>
                                    {
                                        props.pagerInfo ? props.pagerInfo : pagerInfoHtml()
                                    }
                                </div> : ""
                            )}
                            dataItemKey={DATA_ITEM_KEY}
                            selectedField={SELECTED_FIELD}
                            onSelectionChange={selectionChange}
                            onHeaderSelectionChange={onHeaderSelectionChange}
                            {...dataState}
                            expandField={EXPANDED_FIELD}
                            onExpandChange={expandChange}
                            onDataStateChange={dataStateChange}
                        >
                            {
                                toolbarItems.length ? <GridToolbar>
                                    <div className={classes.rightItems}>
                                        {
                                            toolbarItems.map((item, idx) => (
                                                <CustomTooltip key={idx} title={item.title} placement="top">
                                                    {
                                                        item.element ? item.element :
                                                            <IconButton className={item?.isText ? classes.textItem : ''}
                                                                        onClick={() => toolbarItemClick(item)}>
                                                                {
                                                                    item.icon
                                                                }
                                                            </IconButton>
                                                    }
                                                </CustomTooltip>
                                            ))
                                        }
                                    </div>
                                    <div className={classes.leftItems}>
                                        {
                                            leftToolbarItems.map((item, idx) => (
                                                <CustomTooltip key={idx} title={item.title} placement="top">
                                                    <IconButton className={item?.isText ? classes.textItem : ''}
                                                                onClick={() => toolbarItemClick(item)}>
                                                        {
                                                            item.icon
                                                        }
                                                    </IconButton>
                                                </CustomTooltip>
                                            ))
                                        }
                                    </div>
                                </GridToolbar> : ""
                            }
                            {
                                props.hasCheckboxColumn ? <GridColumn
                                    className={classes.checkbox}
                                    headerClassName={classes.headerCheckbox}
                                    field={SELECTED_FIELD}
                                    width={50}
                                    headerSelectionValue={result.data.findIndex((item) => (props.conditionalHeader ? props.conditionalHeader(item) : true) && !selectedItem[idGetter(item)]) === -1}
                                /> : ""
                            }
                            {
                                columnsState.map((column: IGridColumn, idx) =>
                                    column.show ?
                                        <GridColumn
                                            key={idx}
                                            field={column.field}
                                            title={column.title}
                                            filter={column.filter}
                                            width={column.width}
                                            cell={column.cell}
                                            editable={column.editable}
                                            editor={column.editor}
                                            {
                                                ...props.filterable !== undefined && !props.filterable ?
                                                    ''
                                                    : {
                                                        columnMenu: (columnProps) => (
                                                            <CustomColumnMenu
                                                                {...columnProps}
                                                                columns={columnsState}
                                                                onColumnsSubmit={onColumnsSubmit}
                                                                isCheckboxFilter={column.isCheckboxFilter}
                                                                data={data}
                                                            />
                                                        )
                                                    }
                                            }

                                            headerClassName={isColumnActive(column.field, dataState) ? "active" : ""}
                                        />
                                        : ""
                                )
                            }
                        </Grid>
                    </div>
            </IntlProvider>
        </>
    );
}

export default CustomGrid;
