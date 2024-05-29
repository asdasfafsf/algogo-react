/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumbs } from '@material-tailwind/react';

type ProblemBreadCrumbsPath = {
  to: string;
  path: string;
};

type ProblemBreadCrumbsProps = {
  pathList: ProblemBreadCrumbsPath[],
  current: string
};

export default function ProblemBreadcrumbs({ pathList, current }: ProblemBreadCrumbsProps) {
  return (
    <Breadcrumbs
      className="text-white bg-gray-900"
      color="black"
      fullWidth
      separator=">"
    >
      <a
        href="/"
        className="opacity-60 hover:opacity-100 text-white pb-0.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      {pathList.map(({ path, to }) => (
        <a href={to} className="text-white opacity-60 hover:opacity-100 hover:font-bold">
          <div className="h-full">{path}</div>
        </a>
      )) }
      <a href="#" className="w-auto font-bold text-white">{current}</a>
    </Breadcrumbs>
  );
}
