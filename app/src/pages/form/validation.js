import * as Yup from "yup";

// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
    exoName: Yup.string().required("Exo Name is required"),
    difficulty: Yup.string(),
});