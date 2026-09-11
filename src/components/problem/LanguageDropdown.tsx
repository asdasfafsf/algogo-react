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
  const { open, handleOpenChange, selectedIndex, languageList, handleUpdate } =
    useLanguageDropdown();
  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-32 justify-between bg-background text-xs"
          aria-label="코드 언어"
        >
          {languageList[selectedIndex]}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {languageList.map((language, index) => (
          <DropdownMenuItem
            key={language}
            onSelect={() => handleUpdate(index)}
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
