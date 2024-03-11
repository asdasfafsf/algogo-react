/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-tailwind/react';
import { useState } from 'react';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (

    <div className="h-full bg-gray-900">
      <div>
        Tab 1 content
      </div>
    </div>

  );
}
