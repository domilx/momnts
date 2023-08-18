import * as React from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Button,
} from 'react-native';

const DEFAULT_HEIGHT = 800;
const VISIBLE_HEIGHT = 70; // height visible by default

function useAnimatedBottom(show: boolean, height: number = DEFAULT_HEIGHT) {
  const animatedValue = React.useRef(new Animated.Value(VISIBLE_HEIGHT / height)).current;

  const bottom = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height + VISIBLE_HEIGHT, 0], // offset by VISIBLE_HEIGHT
  });

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: show ? 1 : VISIBLE_HEIGHT / height,
      tension: 60,
      friction: 10,
      useNativeDriver: false,
    }).start();
  }, [show]);

  return bottom;
}

interface Props {
    children: React.ReactNode;
    show: boolean;
    height?: number;
    onOuterClick?: () => void;
  }
  
  export function BottomSheet({
    children,
    show,
    height = DEFAULT_HEIGHT,
    onOuterClick,
  }: Props) {
    const { height: screenHeight } = useWindowDimensions();
  
    const bottom = useAnimatedBottom(show, height);
  
    return (
      <>
        {show && (
          <Pressable onPress={onOuterClick} style={[styles.outerOverlay, { height: screenHeight }]}>
            <View />
          </Pressable>
        )}
        <Animated.View style={[styles.bottomSheet, { height, bottom }]}>
          {children}
        </Animated.View>
      </>
    );
  }

const styles = StyleSheet.create({
  outerOverlay: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'dodgerblue',
    borderRadius: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    marginHorizontal: 10,
  },
  bottomSheetContent: {
    flex: 1, // ensures the content takes full height of the bottom sheet
    justifyContent: 'center',
  },
});