import styled from 'styled-components/native';
import { FontTypes, StyledProps } from '../../../../../types/theme.types';
import { useTheme } from '../../../../../hooks/Theme/useTheme';
import { TextLayoutLine, ViewProps } from 'react-native';
import { MessageRoles } from '../../../../../types/message.types';
import React, { useState } from 'react';
import { Time } from './Time';
import Reanimated, { AnimateProps } from 'react-native-reanimated';
import { useFormattedDate } from '../../../../../hooks/Date/useFormattedDate';
import { useFormattedTime } from '../../../../../hooks/Date/useFormattedTime';
import { Text } from '../../../../Styled/Text';
import { View } from '../../../../Styled/View';
import { LoadingSVG } from '../../ChatBot/Icons/LoadingSVG';

type MessageProps = AnimateProps<ViewProps> & {
  owner: MessageRoles;
  date: string | Date;
  prevDate?: string | Date;
  timeHidden?: boolean;
  isLoading?: boolean;
  children?: string;
};

type StyledMessageProps = StyledProps & {
  owner?: MessageRoles;
};

const Styled = styled(Reanimated.View)<StyledMessageProps>`
  background-color: ${({ styledTheme, owner }) =>
    owner === MessageRoles.USER
      ? styledTheme.colors.darkPrimary
      : styledTheme.colors.transparentBackground};
  padding: 10px 14px 10px 14px;
  border-radius: ${({ owner }) =>
    owner === MessageRoles.USER ? '20px 20px 0 20px' : '20px 20px 20px 0'};
  width: fit-content;
  align-self: ${({ owner }) =>
    owner === MessageRoles.USER ? 'flex-end' : 'flex-start'};
  margin-top: 6px;
  margin-bottom: 6px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  column-gap: 6px;

  ${({ owner }) =>
    owner === MessageRoles.USER ? 'margin-left: 64px;' : 'margin-right: 64px;'}
`;

const MessageText = styled(Text)`
  text-align: left;
`;

const MessageExtraView = styled(View)<{ wrapped: boolean }>`
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
  margin-left: auto;
  ${({ wrapped }) => (wrapped ? 'marginTop: -12px;' : 'marginBottom: -3px;')}
`;

const StyledTime = styled(Text)<StyledProps>`
  color: ${({ styledTheme }) => styledTheme.colors.extraTransparentText};
`;

export const Message = ({
  owner,
  date,
  prevDate,
  children,
  timeHidden,
  isLoading,
  ...otherProps
}: MessageProps) => {
  const parsedTime = useFormattedTime(date);
  const parsedDate = useFormattedDate(date);
  const parsedPrevDate = prevDate ? useFormattedDate(prevDate) : undefined;
  const theme = useTheme();
  const [numberOfLines, setNumberOfLines] = useState(1);

  const onLayout = (layout: TextLayoutLine[]) => {
    setNumberOfLines(layout.length);
  };

  return (
    <>
      {parsedDate !== parsedPrevDate && parsedDate && (
        <Time time={parsedDate} />
      )}
      <Styled styledTheme={theme} owner={owner} {...otherProps}>
        {children && (
          <MessageText
            onTextLayout={(e) => onLayout(e.nativeEvent.lines)}
            fontSize={16}
            fontWeight={FontTypes.regular}
          >
            {children}
          </MessageText>
        )}
        <MessageExtraView wrapped={numberOfLines > 1}>
          {!timeHidden && (
            <StyledTime
              fontSize={12}
              fontWeight={FontTypes.medium}
              styledTheme={theme}
            >
              {parsedTime}
            </StyledTime>
          )}
          {isLoading && <LoadingSVG />}
        </MessageExtraView>
      </Styled>
    </>
  );
};
