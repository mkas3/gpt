import {useMemo} from 'react';

export const useNowDate = () => {
	return useMemo(() => {
		return new Date();
	}, []);
}