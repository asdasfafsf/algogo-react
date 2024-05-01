import { Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';

export default function ProblemTypeDropdown() {
  return (
    <Dropdown value="유형">
      <div>
        <div className="mb-2">
          <Typography variant="small">유형 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80">

          {optionList.map(({
            isSelected, name, value, type,
          }, index) => {
            if (type === '유형') {
              return (
                <ChipWithSelected
                  key={value}
                  onClick={(e) => {
                    const newOptionList = [...optionList];
                    newOptionList[index].isSelected = !newOptionList[index].isSelected;
                    setOptionList(newOptionList);
                  }}
                  size="sm"
                  value={name}
                  isSelected={isSelected}
                />
              );
            }
            return '';
          })}

        </div>
      </div>
    </Dropdown>
  );
}
