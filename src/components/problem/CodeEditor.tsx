
import React from 'react';
import CodeControlPanel from './CodeControlPanel';
import MonacoEditor from './MonacoEditor';

export function CodeEditor() {

  return (
    <div
      className="flex w-full h-full bg-gray-900"
    >
      <div className="w-full">
        <CodeControlPanel />
        <MonacoEditor />
      </div>
    </div>
  );
}

export default React.memo(CodeEditor);
