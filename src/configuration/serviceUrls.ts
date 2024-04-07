const serviceUrls = {
    urls: {
        GetSettings:`/Setting/GetSettings`,
        setSettings:`/Setting/SetSettings`,
        GetFeatureClasses:`/FeatureClasses/GetFeatureClasses`,
        GetLastLayersHistory:`/ServiceHistory/GetLastLayersHistory`,
        GetLastLayersServiceHistoryDetails:`/ServiceHistory/GetLastLayersServiceHistoryDetails`,
        GetServiceHistoryDetails:`/ServiceHistory/GetServiceHistoryDetails`,
        GetLastLayersTempHistory:`/TempHistory/GetLastLayersTempHistory`,
        GetTempHistories:`/TempHistory/GetTempHistories`,
        GetLastLayersOSHistory:`/OSHistory/GetLastLayersOSHistory`,
        GetOSHistories:`/OSHistory/GetOSHistories`,
        GetServiceHistoriesDateRange:`/ServiceHistory/GetServiceHistoriesDateRange`,
        GetTempHistoriesDateRange:`/TempHistory/GetTempHistoriesDateRange`,
        GetOSHistoriesDateRange:`/OSHistory/GetOSHistoriesDateRange`,
        GetJobHistoryDetails:`/JobHistory/GetJobHistoryDetails`,
        ExecuteJob: '/JobHistory/StartDailyJob',
        GetAllUrls: '/ServiceUrl/GetAllUrls',
        AddUrl: '/ServiceUrl/AddUrl',
        DeleteUrl: '/ServiceUrl/DeleteUrl',
        ExecuteJob2: '/Wfs/StartWfsService',
    },
}

export default serviceUrls;
