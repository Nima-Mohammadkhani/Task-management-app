import React, { useEffect, useMemo } from "react";
import { Sheet } from "react-modal-sheet";
import type { BottomSheetProps } from "../../types/ui";

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  isOpen,
  onClose,
  children,
  snapPoints,
  hideBackdrop = false,
  backdropColor,
  zIndex,
  disableDrag = false,
  preventClose = false,
}) => {
  const sheetIsOpen = useMemo(
    () => (isOpen !== undefined ? isOpen : (visible ?? false)),
    [isOpen, visible],
  );

  const finalSnapPoints = useMemo(() => {
    if (snapPoints && snapPoints.length > 0) {
      const points = [...snapPoints].sort((a, b) => a - b);
      if (preventClose) {
        return points.filter((p) => p > 0);
      }
      return points[0] === 0 ? points : [0, ...points];
    }
    return preventClose ? [0.7, 1] : [0, 0.7, 1];
  }, [snapPoints, preventClose]);

  const initialSnap = useMemo(() => {
    if (snapPoints && snapPoints.length > 0) {
      if (preventClose) {
        return finalSnapPoints.length - 1;
      }
      const targetIndex = finalSnapPoints.findIndex((p) => p >= 0.5);
      return targetIndex >= 0 ? targetIndex : finalSnapPoints.length - 1;
    }
    return 1;
  }, [snapPoints, finalSnapPoints, preventClose]);

  useEffect(() => {
    if (sheetIsOpen) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [sheetIsOpen]);

  return (
    <div style={{ zIndex: zIndex }}>
      <Sheet
        isOpen={sheetIsOpen}
        onClose={preventClose ? () => {} : onClose}
        snapPoints={finalSnapPoints}
        initialSnap={initialSnap}
        tweenConfig={{
          ease: [0.32, 0.72, 0, 1],
          duration: 0.3,
        }}
        disableDrag={disableDrag}
        onSnap={(snapIndex) => {
          if (preventClose && snapIndex === 0 && finalSnapPoints.length > 1) {
            return;
          }
        }}
      >
        <Sheet.Container
          style={{
            backgroundColor: "var(--surface)",
            borderTop: "1px solid var(--surfaceBorder)",
          }}
        >
          <Sheet.Header />
          <Sheet.Content
            style={{
              padding: 0,
              backgroundColor: "var(--surface)",
              color: "var(--surfaceText)",
            }}
          >
            {children}
          </Sheet.Content>
        </Sheet.Container>
        {!hideBackdrop && (
          <Sheet.Backdrop
            style={{
              backgroundColor: backdropColor ?? "rgba(0,0,0,0.35)",
            }}
          />
        )}
      </Sheet>
    </div>
  );
};

export default BottomSheet;
