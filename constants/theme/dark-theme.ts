import {FontTypes, Theme} from '../../types/theme.types';

export const darkTheme: Theme = {
	colors: {
		primary: '#6DB816',
		lightPrimary: '#B3FF5A',
		darkPrimary: '#5F8411',
		accent: '#B6C820',
		background: '#000000',
		transparentBackground: 'rgba(25 24 19 / 0.70)',
		moreTransparentBackground: 'rgba(0 0 0 / 0.45)',
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