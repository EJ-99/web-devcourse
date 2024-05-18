import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const wrapper = style({
  // width: '100vw',
  // height: '100vh',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
});

export const modalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 800,
  height: 'max-content',
  maxHeight: 500,
  overflowY: 'auto',
  borderRadius: 14,
  padding: 20,
  boxShadow: vars.shadow.basic,
  backgroundColor: vars.color.mainDarker,
  opacity: 0.95,
  color: vars.color.brightText,
});

export const header = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 40,
  fontSize: vars.fontSizing.T2,
});

export const closeButton = style({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

export const body = style({
  maxHeight: 400,
  overflowY: 'auto',
  width: '100%',
});
