import {FontTypes, Theme} from '../../types/theme.types';

export const lightTheme: Theme = {
	colors: {
		primary: '#B3FF5A',
		lightPrimary: '#B3FF5A',
		darkPrimary: '#5F8411',
		accent: '#E7FF1C',
		background: '#000000',
		transparentBackground: 'rgba(25 24 19 / 0.7)',
		moreTransparentBackground: 'rgba(25 24 19 / 0.4)',
		text: '#FFFFFF',
		extraTransparentText: 'rgba(255 255 255 / 0.5)',
		extraText: '#595959'
	},
	fonts: {
		[FontTypes.light]: 'Roboto-Light',
		[FontTypes.regular]: 'Roboto-Regular',
		[FontTypes.medium]: 'Roboto-Medium',
		[FontTypes.bold]: 'Roboto-Bold',
	}
}