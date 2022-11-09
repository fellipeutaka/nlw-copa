import Toast from "react-native-toast-message";

export function useToast() {
  return (message: string) =>
    Toast.show({
      text1: message,
    });
}
