import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  Text as RNText,
  TextProps,
} from "react-native";

import { clsx } from "clsx";

interface ButtonProps extends TouchableWithoutFeedbackProps {
  isLoading?: boolean;
}

export function Root({ isLoading, disabled, children, ...props }: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={clsx(
        "bg-amber-300 h-14 w-full flex-row justify-center items-center rounded",
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

export function Text(props: TextProps) {
  return (
    <RNText {...props} className="text-black uppercase font-bold text-sm" />
  );
}
