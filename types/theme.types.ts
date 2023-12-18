export enum ThemeTypes {
	light,
	dark
}

export enum FontTypes {
	light,
	regular,
	medium,
	bold
}

export type Theme = {
	colors: {
		primary: string;
		lightPrimary: string;
		darkPrimary: string;
		accent: string;
		background: string;
		transparentBackground: string;
		moreTransparentBackground: string;
		text: string;
		extraTransparentText: string;
		extraText: string;
	}
	fonts: {
		[type in FontTypes]: string;
	}
}

export type ContextTheme = {
	type: ThemeTypes;
	theme: Theme;
};

export type Themes = {
	[theme in ThemeTypes]: ContextTheme;
};

export type StyledProps = {
	styledTheme: Theme;
}