import CustomFontAwesomeIcon from "./components/Custom/CustomFontAwesomeIcon";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

export const osColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 200,
        hide: false
    },
    {
        field: "InsertCount",
        headerName: "تعداد درج",
        width: 100,
        hide: false
    },
    {
        field: "UpdateCount",
        headerName: "تعداد ویرایش",
        width: 100,
        hide: false
    },
    {
        field: "DeleteCount",
        headerName: "تعداد حذف",
        width: 100,
        hide: false
    },
    {
        field: "Status",
        headerName: "وضعیت",
        width: 70,
        hide: false,
        renderCell: (status) => {
            return status.value === 1 ?
                <CustomFontAwesomeIcon icon={faCheck} color={'green'}/>:
                <CustomFontAwesomeIcon icon={faXmark} color={'red'}/>
        },
    },

    {
        field: "StartDate",
        headerName: "تاریخ شروع",
        width: 200,
        hide: true
    },
    {
        field: "EndDate",
        headerName: "تاریخ پایان",
        width: 200,
        hide: true
    },
];

export const serverColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 250,
        hide: true
    },
    {
        field: "Count",
        headerName: "تعداد",
        width: 80,
        hide: true
    },
    {
        field: "PartNumber",
        headerName: "شماره پارت",
        width: 100,
        hide: true
    },
    {
        field: "Status",
        headerName: "وضعیت",
        width: 70,
        hide: true,
        renderCell: (status) => {
            return status.value === 1 ?
                <CustomFontAwesomeIcon icon={faCheck} color={'green'}/> :
                <CustomFontAwesomeIcon icon={faXmark} color={'red'}/>
        },
    },
    {
        field: "StartDate",
        headerName: "تاریخ شروع",
        width: 200,
        hide: true
    },
    {
        field: "EndDate",
        headerName: "تاریخ پایان",
        width: 200,
        hide: true
    },
];

export const tempColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 200,
        hide: false
    },
    {
        field: "FeatureCount",
        headerName: "تعداد",
        width: 200,
        hide: false
    }, ,
    {
        field: "StartDate",
        headerName: "تاریخ شروع",
        width: 200,
        hide: true
    },
    {
        field: "EndDate",
        headerName: "تاریخ پایان",
        width: 200,
        hide: true
    },
];

export const osLastColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 200,
        hide: false
    },
    {
        field: "InsertCount",
        headerName: "تعداد درج",
        width: 200,
        hide: false
    },
    {
        field: "UpdateCount",
        headerName: "تعداد ویرایش",
        width: 200,
        hide: false
    },
    {
        field: "DeleteCount",
        headerName: "تعداد حذف",
        width: 200,
        hide: false
    }
];

export const serverLastColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 200,
        hide: true
    },
    {
        field: "FeatureCount",
        headerName: "تعداد",
        width: 200,
        hide: true
    }
];

export const tempLastColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "LayerNameInPersian",
        headerName: "نام لایه",
        width: 200,
        hide: false
    },
    {
        field: "FeatureCount",
        headerName: "تعداد",
        width: 200,
        hide: false
    }
];

export const serviceURLColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "Name",
        headerName: "آدرس URL",
        width: 650,
        hide: false,
        align: 'right',
    },
    {
        field: "RegionName",
        headerName: "نام امور",
        width: 150,
        hide: false,
        align: 'right',
    }
];

export const jobColumns = [
    {
        field: "Id",
        headerName: "شناسه",
        width: 70,
        hide: true
    },
    {
        field: "StartDate",
        headerName: "تاریخ شروع",
        width: 165,
        hide: false
    },{
        field: "EndDate",
        headerName: "تاریخ پایان",
        width: 165,
        hide: false
    },{
        field: "TotalCount",
        headerName: "تعداد کل تغیرات",
        width: 120,
        hide: false
    },
];
