import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import clsx from "clsx";

type Props = {
  title: string;
  isSelected: boolean;
} & TouchableOpacityProps;

export function Option({ title, isSelected = false, ...rest }: Props) {
  return (
    <TouchableOpacity className="flex-1 h-8" {...rest}>
      <View
        className={clsx("h-full w-full justify-center items-center rounded", {
          "bg-zinc-700": isSelected,
        })}
      >
        <Text className="text-zinc-100 font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
