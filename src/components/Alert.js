// utils/swalHelper.js
import Swal from "sweetalert2";

export const showAlertSuccess = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });
};

export const showAlertError = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });
};
