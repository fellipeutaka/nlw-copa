import {
  Keyboard,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export function KeyboardAvoidingView({
  children,
  ...rest
}: KeyboardAvoidingViewProps) {
  return (
    <RNKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </RNKeyboardAvoidingView>
  );
}
