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
        secureTextEntry = false,
        secureToggle = false,
        containerClassName = "",
        inputClassName = "",
        multiline = false,
        rows = 3,
        value,
        onChangeText,
        placeholder,
        editable = true,
        onFocus,
        onBlur,
        ...props
      },
      ref,
    ) => {
      const [hidePassword, setHidePassword] = useState(!!secureTextEntry);
      const [isFocused, setIsFocused] = useState(false);

      const handleTogglePassword = () => {
        setHidePassword(!hidePassword);
      };

      const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
      };

      const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
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
                ? "border-primary"
                : "border-gray-200"
            } ${error ? "border-red-500" : ""}`}
          >
            {leftIcon && <View className="ml-2">{leftIcon}</View>}

            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              multiline={multiline}
              numberOfLines={multiline ? rows : 1}
              editable={editable}
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry={secureTextEntry && hidePassword}
              className={`flex-1 py-2 px-3 text-base bg-transparent rounded-xl text-right ${inputClassName}`}
              style={multiline ? { textAlignVertical: "top" } : undefined}
              {...props}
            />

            {secureToggle ? (
              <TouchableOpacity
                onPress={handleTogglePassword}
                className="mr-2 p-1"
                activeOpacity={0.7}
              >
                {hidePassword ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            ) : (
              rightIcon && <View className="mr-2">{rightIcon}</View>
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