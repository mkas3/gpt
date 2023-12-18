import styled from 'styled-components/native';
import { View } from '../../../../Styled/View';
import { StyledProps } from '../../../../../types/theme.types';
import { useTheme } from '../../../../../hooks/Theme/useTheme';
import { TextBase } from '../../../../Styled/Text/TextBase';
import { useMemo } from 'react';
import { useFormattedDate } from '../../../../../hooks/Date/useFormattedDate';
import { useNowDate } from '../../../../../hooks/Date/useNowDate';

type TimeProps = {
  time: string;
};

const StyledWrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

const Styled = styled(View)<StyledProps>`
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
  font-size: 12px;
  padding: 6px 14px 7px 14px;
  border-radius: 16px;
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled(TextBase)`
  font-size: 10px;
  line-height: 14px;
`;

export const Time = ({ time }: TimeProps) => {
  const nowDate = useNowDate();
  const todayDate = useFormattedDate(nowDate);
  const yesterdayDate = useFormattedDate(nowDate, (date) => date.getDate() - 1);

  const theme = useTheme();

  return (
    <StyledWrapper>
      <Styled styledTheme={theme}>
        <StyledText>
          {time === todayDate
            ? 'сегодня'
            : time === yesterdayDate
              ? 'вчера'
              : time}
        </StyledText>
      </Styled>
    </StyledWrapper>
  );
};
