import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useLanguageDropdown from "@hook/useLanguageDropdown";
export default function LanguageDropdown() {
  const { open, handler, selectedIndex, languageList, handleUpdate } =
    useLanguageDropdown();
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        if (next !== open) handler();
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-28 justify-between border-white/15 bg-gray-900 text-gray-100 hover:bg-gray-800"
          aria-label="코드 언어"
        >
          {languageList[selectedIndex]}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark w-36" align="start">
        {languageList.map((language, index) => (
          <DropdownMenuItem
            key={language}
            onClick={(e) => handleUpdate(e, index)}
            className="justify-between"
          >
            {language}
            {index === selectedIndex && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
