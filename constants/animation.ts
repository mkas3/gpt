import {Easing} from 'react-native-reanimated';

export const defaultTimingEasing = Easing.inOut(Easing.quad);

export const defaultTimingConfig = {
	duration: 1000,
	easing: defaultTimingEasing,
}