import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
      <path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
      <path d="M19 10a7 7 0 1 0-9.43 6.3" />
      <path d="m22 22-3-3" />
    </svg>
  );
}
