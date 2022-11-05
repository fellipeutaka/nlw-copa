import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import { colors } from "@nlw-copa/tailwind-config";

export const TextField = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      placeholderTextColor={colors.zinc[500]}
      className="bg-zinc-800 text-white py-3 px-6 border border-zinc-500 rounded w-full focus:border-amber-300"
    />
  );
});

TextField.displayName = "TextField";
