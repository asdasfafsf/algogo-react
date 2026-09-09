import {
  ChevronDownIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from "@components/Dropdown/index";
import { Typography } from "@components/common/index";
import CodeTemplateAddModal from "./CodeTemplateAddModal";
import useCodeTemplateDropdown from "@hook/editor/useCodeTemplateDropdown";

export default function CodeTemplateDropdown() {
  const {
    open,
    toggleOpen,
    templateList,
    title,
    handleChangeTemplate,
    handleEditTemplate,
    handleAddTemplate,
  } = useCodeTemplateDropdown(CodeTemplateAddModal);
  const handler = toggleOpen;

  return (
    <Dropdown
      handler={handler}
      open={open}
      className="p-0 bg-gray-900 border-gray-800 rounded-md"
      showArrow={false}
    >
      <div className="flex w-36 h-10 items-center justify-between border-gray-800 rounded-md border-solid border py-2 px-4 cursor-pointer">
        <Typography
          className="text-gray-400 truncate max-w-[80px]"
          weight="semilight"
          variant="medium"
        >
          {title}
        </Typography>
        <ChevronDownIcon
          strokeWidth={2.5}
          className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <ul className="p-0 bg-gray-900 rounded-sm w-36">
        {[
          templateList.map((elem) => (
            <li
              key={elem.uuid}
              onClick={() => handleChangeTemplate(elem.uuid)}
              className="flex items-center justify-between w-full gap-1 p-3 bg-gray-900 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <Typography
                className="text-gray-400 truncate max-w-[100px]"
                weight="semilight"
                variant="medium"
              >
                {elem.name}
              </Typography>
              <div
                className="w-4 cursor-context-menu hover:text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTemplate(elem.uuid);
                }}
              >
                <PencilIcon className="size-4" />
              </div>
            </li>
          )),
          <li
            onClick={handleAddTemplate}
            key="추가하기"
            className="flex items-center w-full gap-1 p-3 bg-gray-900 rounded-md cursor-crosshair hover:bg-gray-600"
          >
            <PlusIcon className="size-4" />
            <Typography
              className="text-gray-400"
              weight="semilight"
              variant="medium"
            >
              추가하기
            </Typography>
          </li>,
        ]}
      </ul>
    </Dropdown>
  );
}
