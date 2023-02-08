import * as yup from "yup";
import { addDays, addMonths, format } from "date-fns";
const today = Date.now();


const schema = yup.object().shape({
    start-date: yup.date().typeError("Date is required")

});

export default schema;
