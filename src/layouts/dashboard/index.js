/**
 =========================================================
 * Nedamat Dashboard React - v1.0.0
 =========================================================
 */
import {setDirection, useMaterialUIController} from "../../context";
import {useEffect, useState} from "react";
import {Autocomplete, InputAdornment, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {faCheck, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {SaveButton} from "../../components/ColorButton/SaveButton";
import {CheckButton} from "../../components/ColorButton/CheckButton";
import CustomNotification from "../../components/Custom/CustomNotification";
import serviceUrls from "../../configuration/serviceUrls";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import {serviceURLColumns} from "../../project-columns";
import CustomMUIGrid from "../../components/Custom/CustomMUIGrid";
import GridToolbar from "./components/GridToolbar";
import ReactLoading from "react-loading";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    loading: {
        margin: 'auto'
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [, dispatch] = useMaterialUIController();
    const [settingInfo, setSettingInfo] = useState([]);
    const [settingValue, setSettingValue] = useState({
        NEDAMAT_TOKEN_TYPE: '',
        NEDAMAT_MAP_TYPE: '',
        NEDAMAT_INSTANCE_COUNT: '',
        NEDAMAT_TOKEN_SERVICE_USERNAME: '',
        NEDAMAT_TOKEN_SERVICE_PASSWORD: '',
        NEDAMAT_TOKEN_SERVICE_URL: '',
        NEDAMAT_SERVICE_SRID: '',
        NEDAMAT_SERVICE_NAME: '',
        NEDAMAT_REVERSE_COORDINATE: '',
        NEDAMAT_COMPANY_NAME: '',
        NEDAMAT_CHUNCK_COUNT: '',
        NEDAMAT_COMPANY_ID_FIELD_NAME: '',
        NEDAMAT_WFS_RETRY_COUNT: ''
    })
    const [url, setUrl] = useState([]);
    const [urlLoading, setUrlLoading] = useState(true);
    const [settingLoading, setSettingLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [changeSetting, setChangeSetting] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const mapTypeOptions = [{
        label: 'WFS',
        value: '2'
    }, {
        label: 'Map Service',
        value: '1'
    }];

    const companyTypeOptions = [{
        label: 'فراعمران نگار',
        value: 'FARAOMRAN'
    }, {
        label: 'اهم',
        value: 'OHM'
    }];

    const tokenTypeOptions = [{
        label: 'Bearer Token',
        value: '1'
    }, {
        label: 'ArcGis',
        value: '2'
    }];

    const reverseCoordinateOptions = [{
        label: "بله",
        value: "1"
    }, {
        label: "خیر",
        value: "0"
    }];

    useEffect(() => {
        setDirection(dispatch, "rtl");
        return () => setDirection(dispatch, "ltr");
    }, []);

    const getValue = (settingName) => {
        if (settingName) {
            const setting = settingInfo.find(item => item.SettingName === settingName);
            return setting ? setting.SettingValue : undefined;
        }
    }

    useEffect(() => {
        setSettingValue({
            NEDAMAT_INSTANCE_COUNT: getValue('NEDAMAT_INSTANCE_COUNT'),
            NEDAMAT_MAP_TYPE: getValue('NEDAMAT_MAP_TYPE'),
            NEDAMAT_TOKEN_SERVICE_PASSWORD: getValue('NEDAMAT_TOKEN_SERVICE_PASSWORD'),
            NEDAMAT_TOKEN_SERVICE_URL: getValue('NEDAMAT_TOKEN_SERVICE_URL'),
            NEDAMAT_TOKEN_TYPE: getValue('NEDAMAT_TOKEN_TYPE'),
            NEDAMAT_TOKEN_SERVICE_USERNAME: getValue('NEDAMAT_TOKEN_SERVICE_USERNAME'),
            NEDAMAT_SERVICE_NAME: getValue('NEDAMAT_SERVICE_NAME'),
            NEDAMAT_SERVICE_SRID: getValue('NEDAMAT_SERVICE_SRID'),
            NEDAMAT_REVERSE_COORDINATE: getValue('NEDAMAT_REVERSE_COORDINATE'),
            NEDAMAT_COMPANY_NAME: getValue('NEDAMAT_COMPANY_NAME'),
            NEDAMAT_CHUNCK_COUNT: getValue('NEDAMAT_CHUNCK_COUNT'),
            NEDAMAT_COMPANY_ID_FIELD_NAME: getValue('NEDAMAT_COMPANY_ID_FIELD_NAME'),
            NEDAMAT_WFS_RETRY_COUNT: getValue('NEDAMAT_WFS_RETRY_COUNT'),
        })
    }, [settingInfo]);

    const handleDropDownChange = (settingName, item) => {
        setSettingValue({...settingValue, [settingName]: item?.value});
    }

    const handleChange = (event) => {
        setSettingValue({...settingValue, [event.target.name]: event.target.value});
    };

    useEffect(() => {
        axios.get(serviceUrls.urls.GetSettings).then((response) => {
            if (response.status === 200) {
                setSettingInfo(response.data.Data)
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت تنظیمات');
        }).finally(() => {
            setSettingLoading(false)
        })
    }, [changeSetting]);

    useEffect(() => {
        axios.get(serviceUrls.urls.GetAllUrls).then((response) => {
            if (response.status === 200) {
                setUrl(response.data.Data);
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت تنظیمات');
        }).finally(() => setUrlLoading(false))
    }, [refresh])

    const checkForTrue = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === false) {
                return false;
            }
        }
        return true;
    }

    const saveChanges = () => {
        const postData = Object.entries(settingValue).map(([key, value]) => ({
            SettingName: key,
            SettingValue: value,
            SystemName: 'NEDAMAT'
        }));
        const truthyValue = postData.map(m => !!m.SettingValue);
        console.log(truthyValue);
        if (!checkForTrue(truthyValue)){
            CustomNotification.showToastWarning('تمام فیلدها باید پر باشند');
        }
        else {
            setSettingLoading(true);
            axios.post(
                serviceUrls.urls.setSettings, postData
            ).then((response) => {
                if (response.status == 200) {
                    CustomNotification.showToastSuccess('تنظیمات با موفقیت ذخیره گردید');
                    setChangeSetting(!changeSetting);
                }
            }).catch(() => {
                CustomNotification.showToastError('خطا در ذخیره تنظیمات');
            }).finally(() => {
                setSettingLoading(false)
            })
        }

    }

    const checkToken = () => {
        setSettingLoading(true);
        const formData = new FormData();
        formData.append('username', settingValue.NEDAMAT_TOKEN_SERVICE_USERNAME);
        formData.append('password', settingValue.NEDAMAT_TOKEN_SERVICE_PASSWORD);
        formData.append('client', 'referer');
        formData.append('expiration', 60);
        formData.append('f', 'json');
        axios.post(
            settingValue.NEDAMAT_TOKEN_SERVICE_URL,formData
        ).then((response) => {
            if (response.status == 200) {
                CustomNotification.showToastSuccess('تنظیمات با موفقیت ذخیره گردید');
                setChangeSetting(!changeSetting);
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در ذخیره تنظیمات');
        }).finally(() => {
            setSettingLoading(false)
        })

    }

    const handleChangeData = () => {
        setRefresh(prev => !prev);
    }

    const handleRowClick = (params) => {
        setSelectedRowId(params.row)
    };

    return (
        <DashboardLayout>
            <DashboardNavbar path={'تنظیمات'}/>
            <div style={{padding: '20px, 20px'}}>
                {
                    settingLoading ?
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                            <ReactLoading className={classes.loading} type={'spin'} color={'black'} height={50}
                                          width={50}/>
                        </div> : (
                            <>
                                <Typography display='block' textAlign='center' fontWeight='bold' fontSize='20px'
                                            marginBottom='40px'>ثبت
                                    اطلاعات پایه</Typography>
                                <div style={{display: "flex"}}>
                                    <Autocomplete
                                        freeSolo
                                        value={settingValue.NEDAMAT_COMPANY_NAME ? {
                                            label: settingValue.NEDAMAT_COMPANY_NAME == 'FARAOMRAN' ? 'فراعمران نگار' : 'اهم',
                                            value: settingValue.NEDAMAT_COMPANY_NAME
                                        } : ""}
                                        getOptionLabel={(option) => option.label || ''}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={companyTypeOptions}
                                        noOptionsText='انتخاب کنید'
                                        onChange={
                                            (event, item) =>
                                                handleDropDownChange("NEDAMAT_COMPANY_NAME", item)
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                       style={{marginLeft: 75, width: 190}}
                                                       variant='outlined'
                                                       size='small'
                                                       label='نام شرکت'
                                                       placeholder='انتخاب کنید'/>
                                        )}
                                    />
                                    <Autocomplete
                                        freeSolo
                                        value={settingValue.NEDAMAT_MAP_TYPE ? {
                                            label: settingValue.NEDAMAT_MAP_TYPE == '1' ? 'Map Service' : 'WFS',
                                            value: settingValue.NEDAMAT_MAP_TYPE
                                        } : ""}
                                        getOptionLabel={(option) => option.label || ''}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={mapTypeOptions}
                                        noOptionsText='انتخاب کنید'
                                        onChange={
                                            (event, item) =>
                                                handleDropDownChange("NEDAMAT_MAP_TYPE", item)
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                       style={{marginLeft: 75, width: 190}}
                                                       variant='outlined'
                                                       size='small'
                                                       label='نوع ارتباط'
                                                       placeholder='انتخاب کنید'/>
                                        )}
                                    />
                                    <Autocomplete
                                        freeSolo
                                        value={settingValue.NEDAMAT_TOKEN_TYPE ? {
                                            label: settingValue.NEDAMAT_TOKEN_TYPE == '1' ? 'Bearer Token' : 'ArcGis',
                                            value: settingValue.NEDAMAT_TOKEN_TYPE
                                        } : ""}
                                        getOptionLabel={(option) => option.label || ''}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={tokenTypeOptions}
                                        noOptionsText='انتخاب کنید'
                                        onChange={
                                            (event, item) =>
                                                handleDropDownChange("NEDAMAT_TOKEN_TYPE", item)
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                       style={{marginLeft: 75, width: 190}}
                                                       variant='outlined'
                                                       size='small'
                                                       label='نوع توکن'
                                                       placeholder='انتخاب کنید'/>
                                        )}
                                    />
                                    <TextField
                                        style={{width: 190}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_COMPANY_ID_FIELD_NAME'
                                        onChange={handleChange}
                                        label='فیلد امور'
                                        value={settingValue.NEDAMAT_COMPANY_ID_FIELD_NAME}
                                    />
                                </div>
                                <div style={{display: "flex", marginTop: 40, justifyContent: "space-between"}}>
                                    <TextField
                                        style={{width: "80%"}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_TOKEN_SERVICE_URL'
                                        onChange={handleChange}
                                        label='آدرس توکن'
                                        value={settingValue.NEDAMAT_TOKEN_SERVICE_URL}
                                    />
                                </div>
                                <div style={{display: "flex", marginTop: 40}}>
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_INSTANCE_COUNT'
                                        onChange={handleChange}
                                        label='تعداد instance '
                                        value={settingValue.NEDAMAT_INSTANCE_COUNT}
                                    />
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_SERVICE_NAME'
                                        onChange={handleChange}
                                        label='نام سرویس نقشه'
                                        value={settingValue.NEDAMAT_SERVICE_NAME}
                                    />
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_SERVICE_SRID'
                                        onChange={handleChange}
                                        label='عدد سیستم مختصات (برای مثال 3857) '
                                        value={settingValue.NEDAMAT_SERVICE_SRID}
                                    />
                                    <Autocomplete
                                        freeSolo
                                        value={settingValue.NEDAMAT_REVERSE_COORDINATE ? {
                                            label: settingValue.NEDAMAT_REVERSE_COORDINATE == 1 ? 'بله' : 'خیر',
                                            value: settingValue.NEDAMAT_REVERSE_COORDINATE
                                        } : ""}
                                        getOptionLabel={(option) => option.label || ''}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={reverseCoordinateOptions}
                                        noOptionsText='انتخاب کنید'
                                        onChange={
                                            (event, item) =>
                                                handleDropDownChange("NEDAMAT_REVERSE_COORDINATE", item)
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                       style={{marginLeft: 75, width: 190}}
                                                       variant='outlined'
                                                       size='small'
                                                       label='الزام برعکس کردن مختصات پلیگنها'
                                                       placeholder='انتخاب کنید'/>
                                        )}
                                    />
                                </div>
                                <div style={{display: "flex", marginTop: 40}}>
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_CHUNCK_COUNT'
                                        onChange={handleChange}
                                        label='شکستن داده ها به تعداد'
                                        value={settingValue.NEDAMAT_CHUNCK_COUNT}
                                    />
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_WFS_RETRY_COUNT'
                                        onChange={handleChange}
                                        label='تعداد تکرار فراخواندن سرویس'
                                        value={settingValue.NEDAMAT_WFS_RETRY_COUNT}
                                    />
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        variant="outlined"
                                        size="small"
                                        name='NEDAMAT_TOKEN_SERVICE_USERNAME'
                                        onChange={handleChange}
                                        label='نام کاربری'
                                        value={settingValue.NEDAMAT_TOKEN_SERVICE_USERNAME}
                                    />
                                    <TextField
                                        style={{width: 190, marginLeft: 75}}
                                        label='گذرواژه'
                                        variant="outlined"
                                        onChange={handleChange}
                                        name={'NEDAMAT_TOKEN_SERVICE_PASSWORD'}
                                        value={settingValue.NEDAMAT_TOKEN_SERVICE_PASSWORD}
                                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                        size='small'
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div style={{display: "flex", marginTop: 40}}>
                                    <CheckButton sx={{width: 190, fontSize: 13, fontWeight: 'bold'}} onClick={checkToken} variant="contained">
                                        <FontAwesomeIcon
                                            style={{marginLeft: 10}}
                                            color="black"
                                            icon={faCheck}/>
                                        تست برقراری ارتباط
                                    </CheckButton>
                                    <SaveButton sx={{width: 190, fontSize: 13, fontWeight: 'bold' ,marginLeft: 9}}
                                                onClick={saveChanges}
                                                variant="contained">
                                        <FontAwesomeIcon
                                            style={{marginLeft: 10}}
                                            color="white"
                                            icon={faFloppyDisk}/>
                                        ثبت
                                    </SaveButton>
                                </div>
                            </>)
                }
                <div style={{
                    marginTop: 25,
                    padding: '10px 15px',
                    border: '1px solid',
                    borderColor: '#afaeae',
                    borderRadius: 5
                }}>
                    <GridToolbar handleChangeStatus={handleChangeData} selectedData={selectedRowId}/>
                    <CustomMUIGrid width={'100%'}
                                   dir={'ltr'}
                                   onRowClick={handleRowClick}
                                   data={url}
                                   columns={serviceURLColumns}
                                   loading={urlLoading}/>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
