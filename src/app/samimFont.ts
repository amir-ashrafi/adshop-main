// src/fonts/samim.ts
import localFont from 'next/font/local';

const samimFont = localFont({
  src: [
    {
      path: '../../public/Samim.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-samim',
  display: 'swap',
});

export default samimFont;
