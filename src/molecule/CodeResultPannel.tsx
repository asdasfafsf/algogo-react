/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Tab from './Tab';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab />
  );
}
