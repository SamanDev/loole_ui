import Swal from "sweetalert2";

export const Alert = (title, text, icon) => {
  Swal({
    title,
    text,
    icon,
    button: "Ok",
  });
};

export const Confirm = (title, text) => {
  return Swal({
    title,
    text,
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true,
  });
};
