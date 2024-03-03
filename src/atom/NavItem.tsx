import { Typography } from "@material-tailwind/react";


interface NavItemPropsType {
    label: string;
    isActive: boolean;
    to: string;
  }
  
export default function NavItem({ label, isActive, to='#'}: NavItemPropsType) {
    return (
      <a href={to} className="">
        <Typography
          as="li"
        //   variant="small"
          className={`p-1 font-medium
        ${isActive ? "!text-gray-900" : "text-gray-600"} hover:text-gray-900`}
        >
          {label}
        </Typography>
      </a>
    );
  }