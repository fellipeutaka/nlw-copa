import { ToastConfig } from "react-native-toast-message";

import { Toast } from "@nlw-copa/components/Toast";

export const toastConfig: ToastConfig = {
  message: (props) => <Toast {...props} />,
};
