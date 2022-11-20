import type { SVGProps } from 'react'
import React from 'react'

const WarningOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 5.25C11.4142 5.25 11.75 5.58579 11.75 6V11C11.75 11.4142 11.4142 11.75 11 11.75C10.5858 11.75 10.25 11.4142 10.25 11V6C10.25 5.58579 10.5858 5.25 11 5.25Z"
      fill="currentColor"
    />
    <path
      d="M11 15C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13C10.4477 13 9.99998 13.4477 9.99998 14C9.99998 14.5523 10.4477 15 11 15Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.2944 2.47643C8.36631 1.11493 9.50182 0.25 11 0.25C12.4981 0.25 13.6336 1.11493 14.7056 2.47643C15.7598 3.81544 16.8769 5.79622 18.3063 8.33053L18.7418 9.10267C19.9234 11.1976 20.8566 12.8523 21.3468 14.1804C21.8478 15.5376 21.9668 16.7699 21.209 17.8569C20.4736 18.9118 19.2466 19.3434 17.6991 19.5471C16.1576 19.75 14.0845 19.75 11.4248 19.75H10.5752C7.91552 19.75 5.84239 19.75 4.30082 19.5471C2.75331 19.3434 1.52637 18.9118 0.790989 17.8569C0.0331793 16.7699 0.152183 15.5376 0.653135 14.1804C1.14334 12.8523 2.07658 11.1977 3.25818 9.1027L3.69361 8.33067C5.123 5.79629 6.24019 3.81547 7.2944 2.47643ZM8.47297 3.40432C7.49896 4.64148 6.43704 6.51988 4.96495 9.12994L4.60129 9.77472C3.37507 11.9488 2.50368 13.4986 2.06034 14.6998C1.6227 15.8855 1.68338 16.5141 2.02148 16.9991C2.38202 17.5163 3.05873 17.8706 4.49659 18.0599C5.92858 18.2484 7.9026 18.25 10.6363 18.25H11.3636C14.0974 18.25 16.0714 18.2484 17.5034 18.0599C18.9412 17.8706 19.6179 17.5163 19.9785 16.9991C20.3166 16.5141 20.3773 15.8855 19.9396 14.6998C19.4963 13.4986 18.6249 11.9488 17.3987 9.77471L17.035 9.12993C15.5629 6.51987 14.501 4.64148 13.527 3.40431C12.562 2.17865 11.8126 1.75 11 1.75C10.1874 1.75 9.43793 2.17865 8.47297 3.40432Z"
      fill="currentColor"
    />
  </svg>
)

export default WarningOutline
