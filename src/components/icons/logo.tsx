
import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="26" cy="26" r="25" fill="#34A853" stroke="white" strokeWidth="2" />
    <path
      d="M26 10V14.5M26 37.5V42M42 26H37.5M14.5 26H10M36.2132 15.7868L33.0312 18.9688M18.9688 33.0312L15.7868 36.2132M36.2132 36.2132L33.0312 33.0312M18.9688 18.9688L15.7868 15.7868"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="26" cy="26" r="12" fill="#F4B400" />
    <circle cx="26" cy="26" r="8" fill="white" />
    <path
      d="M26 20V32"
      stroke="#EA4335"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 24L26 20L30 24"
      stroke="#EA4335"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
