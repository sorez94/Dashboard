import React, {useEffect, useState} from 'react';
import DateTimeService from "../../../service/DateTimeService";
import DatePicker from "react-multi-date-picker";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CustomFontAwesomeIcon from "../../../components/Custom/CustomFontAwesomeIcon";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@mui/styles";
import {IHistoryFilter} from "./ServiceHistoryTab";
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import axios from "axios";
import serviceUrls from "../../../configuration/serviceUrls";
import CustomNotification from "../../../components/Custom/CustomNotification";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SaveButton} from "../../../components/ColorButton/SaveButton";
import CustomMUIGrid from "../../../components/Custom/CustomMUIGrid";
import {tempColumns} from "../../../project-columns";

const useStyles = makeStyles({
    root: {
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(46,135,236)', // Change 'green' to the desired hover color
        },
    },
});

const TempHistoryTab = () => {
    const classes = useStyles();
    const [tempHistoryData, setTempHistoryData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [serverFilter, setServerFilter] = useState<IHistoryFilter>({
        fromDate: '',
        layerName: '',
        toDate: ''
    });

    useEffect(() => {
        if (!open) return;
        doSearch();
    }, [open]);

    const doSearch = () => {
        axios.get(serviceUrls.urls.GetTempHistories, {
            params: {
                StartDate: serverFilter.fromDate,
                EndDate: serverFilter.toDate,
                LayerNameInPersian: serverFilter.layerName
            }
        }).then((response) => {
            if (response.status === 200) {
                setTempHistoryData(response.data.Data.map((item) => ({
                    ...item,
                    StartDate: item.StartDate ? DateTimeService.toPersianDateTime(item.StartDate) : '',
                    EndDate: item.EndDate ? DateTimeService.toPersianDateTime(item.EndDate) : ''
                })));
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت دیتا');
        }).finally(() => setLoading(false))
    }

    const handleFilterDateChange = (name: string, value?: any) => {
        setServerFilter({...serverFilter, [name]: DateTimeService.toGregorianDate(value)});
    }

    const handleFilterInputChange = (event) => {
        setServerFilter({...serverFilter, [event.target.name]: event.target.value});
    }

    const removeDateTimeChange = (name: string) => {
        setServerFilter({...serverFilter, [name]: ""});
    }

    return (
        <>
            <div>
                <DatePicker
                    portal
                    zIndex={1100}
                    onChange={(value) => handleFilterDateChange("fromDate", value)}
                    render={(value, openCalender, handleValueChange) => {
                        return (
                            <TextField
                                className={classes.root}
                                style={{marginLeft: 10}}
                                size="small"
                                variant="outlined"
                                label={'از تاریخ'}
                                onFocus={openCalender}
                                onChange={handleValueChange}
                                InputProps={{
                                    style: {color: 'black'},
                                    endAdornment: <IconButton onClick={() => removeDateTimeChange("fromDate")}>
                                        <CustomFontAwesomeIcon icon={faXmark} fontSize={14}/>
                                    </IconButton>,
                                    classes: {root: "p-0"}
                                }}
                                value={serverFilter.fromDate ? DateTimeService.toPersianDate(serverFilter.fromDate) : ""}
                            />
                        )
                    }}
                    calendar={persian} locale={persian_fa}
                />
                <DatePicker
                    portal
                    zIndex={1100}
                    onChange={(value) => handleFilterDateChange("toDate", value)}
                    render={(value, openCalender, handleValueChange) => {
                        return (
                            <TextField
                                className={classes.root}
                                style={{marginLeft: 10, marginRight: 10}}
                                size="small"
                                variant="outlined"
                                label={'از تاریخ'}
                                onFocus={openCalender}
                                onChange={handleValueChange}
                                InputProps={{
                                    style: {color: 'black'},
                                    endAdornment: <IconButton onClick={() => removeDateTimeChange("toDate")}>
                                        <CustomFontAwesomeIcon icon={faXmark} fontSize={14}/>
                                    </IconButton>,
                                    classes: {root: "p-0"}
                                }}
                                value={serverFilter.toDate ? DateTimeService.toPersianDate(serverFilter.toDate) : ""}
                            />
                        )
                    }}
                    calendar={persian} locale={persian_fa}
                />
                <TextField
                    className={classes.root}
                    style={{width: "240px", marginLeft: 10, marginRight: 10}}
                    InputProps={{
                        style: {color: 'black'},
                    }}
                    variant="outlined"
                    size="small"
                    name='layerName'
                    onChange={handleFilterInputChange}
                    label='نام لایه'
                    value={serverFilter.layerName}
                />
                <SaveButton sx={{width: 180, position: 'absolute', height: 40, marginLeft: 5}} onClick={doSearch}
                            variant="contained">
                    <FontAwesomeIcon
                        style={{marginLeft: 10}}
                        color="white"
                        icon={faMagnifyingGlass}/>
                    جستجو
                </SaveButton>
            </div>
            <CustomMUIGrid width={'100%'} {...serverFilter} data={tempHistoryData} columns={tempColumns}
                           loading={loading}/>
        </>

    );
};

export default TempHistoryTab;
