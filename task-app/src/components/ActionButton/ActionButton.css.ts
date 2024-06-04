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
  marginTop: vars.spacing.small,
  fontSize: vars.fontSizing.T3,
  color: vars.color.brightText,
  minWidth: vars.minWidth.list,
  backgroundColor: vars.color.mainFaded,
  padding: vars.spacing.big2,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.mainFadedBright,
  },
});
