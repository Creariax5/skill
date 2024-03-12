import * as Yup from "yup";

// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
    exoReps: Yup.string().required("Number of rep or time is required"),
});