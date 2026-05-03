import { useState, memo, forwardRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { InputProps } from "../../types/ui";

const Input = memo(
  forwardRef<TextInput, InputProps>(
    (
      {
        label,
        error,
        leftIcon,
        rightIcon,
        secureTextEntry,
        secureToggle = false,
        containerClassName = "",
        inputClassName = "",
        multiline = false,
        rows = 3,
        value,
        onChangeText,
        placeholder,
        editable = true,
        ...props
      },
      ref,
    ) => {
      const [hidePassword, setHidePassword] = useState(!!secureTextEntry);
      const [isFocused, setIsFocused] = useState(false);

      const handleTogglePassword = () => {
        setHidePassword(!hidePassword);
      };

      return (
        <View className={`w-full ${containerClassName}`}>
          {label && (
            <Text className="text-sm font-medium text-base-content mb-2">
              {label}
            </Text>
          )}

          <View
            className={`flex-row items-center border rounded-xl transition-all duration-200 bg-base-100 ${
              isFocused
                ? "border-primary ring-2 ring-primary/20"
                : "border-gray-200"
            } ${error ? "border-red-500 ring-2 ring-red-500/20" : ""}`}
          >
            {leftIcon && <View className="mr-2">{leftIcon}</View>}

            {multiline ? (
              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={rows}
                editable={editable}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`flex-1 py-2 px-3 text-base outline-none bg-transparent rounded-xl text-right ${inputClassName}`}
                style={{ textAlignVertical: "top" }}
                {...(props as any)}
              />
            ) : (
              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureTextEntry && hidePassword}
                editable={editable}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`flex-1 py-2 px-3 text-base outline-none bg-transparent rounded-xl text-right ${inputClassName}`}
                {...props}
              />
            )}

            {secureToggle ? (
              <TouchableOpacity
                onPress={handleTogglePassword}
                className="ml-2 p-1"
                activeOpacity={0.7}
              >
                {hidePassword ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            ) : (
              rightIcon && <View className="ml-2">{rightIcon}</View>
            )}
          </View>

          {error && <Text className="text-error text-sm mt-1">{error}</Text>}
        </View>
      );
    },
  ),
);

Input.displayName = "Input";
export default Input;
