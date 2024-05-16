import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';
import { SiCalendly } from 'react-icons/si';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.spacing.medium,
  backgroundColor: vars.color.task,
  borderRadius: 10,
  marginBottom: vars.spacing.big2,
  boxShadow: vars.shadow.basic,
  cursor: 'pointer',
  gap: vars.spacing.small,
  ':hover': {
    backgroundColor: vars.color.taskHover,
    transform: 'scale(1.03)',
  },
});

export const title = style({
  fontSize: vars.fontSizing.T4,
  fontWeight: 'bold',
});

export const description = style({
  fontSize: vars.fontSizing.P1,
});