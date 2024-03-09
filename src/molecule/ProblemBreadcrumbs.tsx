/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumbs } from '@material-tailwind/react';

type ProblemBreadCrumbsProps = {
  path: string[],
  current: string
};

export default function ProblemBreadcrumbs(props: ProblemBreadCrumbsProps) {
  const { path, current } = props;

  return (
    <Breadcrumbs
      color="black"
      separator=">"
      className="bg-gray-900 text-white"
    >
      <a
        href="#"
        className="opacity-60 hover:opacity-100 text-white pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      {path.map((elem) => (
        <a href="#" className="text-white opacity-60 hover:opacity-100 hover:font-bold">
          <div className="h-full">{elem}</div>
        </a>
      )) }
      <a href="#" className="text-white font-bold">{current}</a>
    </Breadcrumbs>
  );
}
