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
          className="h-8 min-w-0 flex-1 justify-between bg-background text-xs @[30rem]/editor-toolbar:w-24 @[30rem]/editor-toolbar:flex-none @[48rem]/editor-toolbar:w-32"
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
