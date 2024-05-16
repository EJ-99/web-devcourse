import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const taskButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: 'max-content',
  borderRadius: 4,
  marginTop: vars.spacing.small,
  fontSize: vars.fontSizing.T3,
  padding: vars.spacing.medium,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.secondaryDarkText,
    color: vars.color.brightText,
  },
});

export const listButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: 'max-content',
  borderRadius: 4,
  minWidth: vars.minWidth.list,
  marginTop: vars.spacing.small,
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.mainFaded,
  padding: vars.spacing.big2,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.mainFadedBright,
  },
});
