import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {useTheme} from '../../hooks/Theme/useTheme';
import {useMemo} from 'react';

type SVGLinearGradientProps = {
	selected?: boolean;
}

export const SVGLinearGradient = ({ selected }: SVGLinearGradientProps) => {
	const theme = useTheme();

	const colors = useMemo(
		() => [theme.colors.primary, theme.colors.accent],
		[theme],
	);

	return (
		<Defs>
			<LinearGradient
				id='grad'
				x1='0'
				y1='50%'
				x2='100%'
				y2='50%'
				gradientUnits='userSpaceOnUse'
			>
				<Stop stopColor={selected ? colors[0] : theme.colors.text} />
				<Stop
					offset='1'
					stopColor={selected ? colors[1] : theme.colors.text}
				/>
			</LinearGradient>
		</Defs>
	);
};
