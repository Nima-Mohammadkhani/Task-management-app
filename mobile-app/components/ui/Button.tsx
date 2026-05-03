import React, { useState } from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps } from "@/types/ui";

interface EnhancedButtonProps extends ButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconClassName?: string;
  iconRotate?: number;
  iconCenter?: boolean;
  iconSize?: number;
  rippleColor?: any;
  onPress?: void
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  textClassName = "",
  style,
  textStyle,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  iconSize = 20,
  iconClassName = "",
  iconRotate = 0,
  iconCenter = false,
  rippleColor,
}: EnhancedButtonProps) => {
  const [opacity] = useState(new Animated.Value(1));

  const baseClasses =
    "flex-row rounded-lg items-center justify-center overflow-hidden";

  const variantClasses: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-primary bg-transparent",
  };

  const textBase = "font-semibold font-vazir";
  const textVariant: Record<string, string> = {
    primary: "text-primary-content",
    secondary: "text-secondary-content",
    outline: "text-primary",
  };

  const iconColor = variant === "outline" ? "#FDE047" : "#FFFFFF";

  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabled ? "bg-gray-400 border-gray-300" : ""} ${className}`;

  const textClasses = `${textBase} ${textVariant[variant]} ${disabled ? "text-gray-200" : ""} ${textClassName}`;

  return (
    <Pressable
      onPress={!disabled && !loading && onPress ? onPress : undefined}
      disabled={disabled || loading}
      android_ripple={{
        color:
          rippleColor ||
          (variant === "outline"
            ? "rgba(253,224,71,0.15)"
            : "rgba(255,255,255,0.2)"),
        borderless: false,
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={buttonClasses}
      style={style}
    >
      <Animated.View
        style={{
          opacity,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: iconCenter
            ? "center"
            : title
              ? "flex-start"
              : "center",
          flex: iconCenter ? 1 : undefined,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "outline" ? "#FDE047" : "#FFFFFF"}
            size="small"
          />
        ) : (
          <>
            {iconLeft && !iconCenter && (
              <Ionicons
                name={iconLeft as any}
                size={iconSize}
                color={iconColor}
                className={iconClassName}
                style={{
                  marginRight: title ? 6 : 0,
                  transform: [{ rotate: `${iconRotate}deg` }],
                }}
              />
            )}
            {title && (
              <Text className={textClasses} style={textStyle}>
                {title}
              </Text>
            )}
            {iconRight && (
              <Ionicons
                name={iconRight as any}
                size={iconSize}
                color={iconColor}
                className={iconClassName}
                style={{
                  marginLeft: title && !iconCenter ? 6 : 0,
                  transform: [{ rotate: `${iconRotate}deg` }],
                }}
              />
            )}
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default Button;
