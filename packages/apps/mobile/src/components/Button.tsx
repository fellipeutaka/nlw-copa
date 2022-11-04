import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from "react-native";

import { clsx } from "clsx";

interface ButtonProps extends TouchableWithoutFeedbackProps {
  isLoading?: boolean;
}

export function Button({
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={clsx(
        "bg-[#DB4437] h-14 w-full flex-row justify-center items-center rounded",
        {
          "opacity-30": isDisabled,
        }
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <ActivityIndicator color="white" /> : children}
    </TouchableOpacity>
  );
}
