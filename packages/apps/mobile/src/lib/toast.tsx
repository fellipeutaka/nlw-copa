import Root, { ToastConfig } from "react-native-toast-message";

import { Toast as StyledToast } from "@nlw-copa/components/Toast";

const toastConfig: ToastConfig = {
  message: (props) => <StyledToast {...props} />,
};

export function Toast() {
  return <Root config={toastConfig} position="top" type="message" />;
}
