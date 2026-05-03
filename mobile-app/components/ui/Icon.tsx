import { TouchableOpacity, Text, View } from 'react-native';
import * as Icons from 'lucide-react-native';
import { IconProps } from '../../types/ui';

type LucideIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  label,
  onClick,
  className = '',
  hoverEffect = false,
}) => {
  const LucideIcon = Icons[name as keyof typeof Icons] as LucideIconComponent;
  if (!LucideIcon) return null;

  const finalSize = typeof size === 'number' ? size : sizeMap[size];

  const IconElement = (
    <LucideIcon width={finalSize} height={finalSize} color={color} />
  );

  if (onClick) {
    return (
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={hoverEffect ? 0.7 : 0.9}
        className={`flex-row items-center justify-center ${className}`}
        accessibilityLabel={label}
      >
        {IconElement}
        {label && <Text className="mr-2 text-sm text-gray-700">{label}</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={`flex-row items-center justify-center ${className}`}
      accessibilityLabel={label}
    >
      {IconElement}
      {label && <Text className="mr-2 text-sm text-gray-700">{label}</Text>}
    </View>
  );
};

export default Icon;