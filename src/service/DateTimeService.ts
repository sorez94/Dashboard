import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import {DateObject} from "react-multi-date-picker";
import GlobalFunctions from "./GlobalFunction";

class DateTimeService {
    toPersianDate(value: any) {
        const date = new DateObject(new Date(value)).convert(persian, persian_fa);
        return date.format("YYYY/MM/DD");
    }

    toPersianDigitDate(value: any) {
        const date = new DateObject(new Date(value)).convert(persian, persian_fa);
        return GlobalFunctions.toEnglishDigits(date.format("YYYY/MM/DD"));
    }

    toPersianDateTime(value: any) {
        const date = new DateObject(new Date(value)).convert(persian, persian_fa);
        return date.format("HH:mm:ss YYYY/MM/DD");
    }

    toPersianDigitDateTime(value: any) {
        const date = new DateObject(new Date(value)).convert(persian, persian_fa);
        return GlobalFunctions.toEnglishDigits(date.format("HH:mm:ss YYYY/MM/DD "));
    }

    toGregorianDate(value: any) {
        const date = new DateObject(new Date(value)).convert(gregorian, gregorian_en);
        return date.format("MM/DD/YYYY");
    }

    toGregorianDateTime(value: any) {
        const date = new DateObject(new Date(value)).convert(gregorian, gregorian_en);
        return date.format("MM/DD/YYYY HH:mm:ss a");
    }
}

const instance = new DateTimeService();
export default instance;
