import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    width="120"
    height="30"
    {...props}
  >
    <style>
      {`.font-playfair { font-family: 'Playfair Display', serif; }`}
    </style>
    <rect width="200" height="50" fill="transparent" />
    <text
      x="10"
      y="35"
      fontFamily="Playfair Display, serif"
      fontSize="30"
      fontWeight="bold"
      fill="hsl(var(--primary-foreground))"
      className="font-playfair"
    >
      KJSGHS
    </text>
  </svg>
);

export default Logo;
