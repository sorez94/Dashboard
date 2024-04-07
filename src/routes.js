/**
 For adding a new route you can follow the existing routes in the routes array.
 1. The `type` key with the `collapse` value is used for a route.
 2. The `type` key with the `title` value is used for a title inside the Sidenav.
 3. The `type` key with the `divider` value is used for a divider between Sidenav items.
 4. The `name` key is used for the name of the route on the Sidenav.
 5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
 6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
 7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
 inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
 8. The `route` key is used to store the route location which is used for the react router.
 9. The `href` key is used to store the external links location.
 10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
 10. The `component` key is used to store the component of its route.
 */

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

// @mui icons
import LastRun from "./layouts/lastRun";
import {faHistory, faInfoCircle, faPlayCircle, faReceipt} from "@fortawesome/free-solid-svg-icons";
import CustomFontAwesomeIcon from "./components/Custom/CustomFontAwesomeIcon";
import ExecuteManual from "./layouts/execute-manual";
import History from "./layouts/history";

const routes = [
    {
        type: "collapse",
        name: "تنظیمات",
        key: "dashboard",
        icon: <CustomFontAwesomeIcon icon={faInfoCircle}/>,
        route: "/dashboard",
        component: <Dashboard/>,
    },
    {
        type: "collapse",
        name: "وضعیت آخرین اجرا",
        key: "last-run",
        icon: <CustomFontAwesomeIcon icon={faReceipt}/>,
        route: "/last-run",
        component: <LastRun/>,
    },
    {
        type: "collapse",
        name: "اجرا به صورت دستی",
        key: "execute-manual",
        icon: <CustomFontAwesomeIcon icon={faPlayCircle}/>,
        route: "/execute-manual",
        component: <ExecuteManual/>,
    },
    {
        type: "collapse",
        name: "تاریخچه",
        key: "history",
        icon: <CustomFontAwesomeIcon icon={faHistory}/>,
        route: "/history",
        component: <History/>,
    },

];

export default routes;
