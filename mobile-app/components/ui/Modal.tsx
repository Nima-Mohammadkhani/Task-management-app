import { View, Modal as RNModal, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import type { ModalProps } from '../../types/ui';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-11/12 max-w-sm',
    md: 'w-11/12 max-w-md',
    lg: 'w-11/12 max-w-lg',
    xl: 'w-11/12 max-w-4xl',
    full: 'w-11/12 max-w-7xl',
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <TouchableOpacity
          className="absolute inset-0 bg-black/50"
          activeOpacity={1}
          onPress={onClose}
        />

        <MotiView
          from={{ opacity: 0, scale: 0.9, translateY: 20 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, translateY: 20 }}
          transition={{ type: 'timing', duration: 200 }}
          className={`bg-base-100 rounded-2xl shadow-2xl ${sizeClasses[size]} ${className}`}
        >
          {children}
        </MotiView>
      </View>
    </RNModal>
  );
};

export default Modal;