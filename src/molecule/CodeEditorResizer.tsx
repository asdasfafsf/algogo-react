/* eslint-disable @typescript-eslint/naming-convention */
import useCodeEditorResizer from '../hook/useCodeEditorResizer';

export default function CodeEditorResizer() {
  const handleMouseDown = useCodeEditorResizer()[1];
  return (
    <div
      className="h-[10px] bg-gray-900 cursor-row-resize flex items-center justify-center group/size1 min-w-[360px] overflow-hidden"
    >
      <div
        className="fixed rounded-xl group-hover/size1:visible invisible w-12 h-12 bg-gray-900 flex justify-center"
      >
        {/* <ArrowUpIcon className="w-4 h-4 text-white" /> */}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-full h-full"
      />
    </div>
  );
}
