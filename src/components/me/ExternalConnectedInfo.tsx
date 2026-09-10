import { Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import ExternalSiteCard from "./ExternalSiteCard";

const externalSites = [
  {
    name: "백준 Online Judge",
    description: "백준에서 해결한 문제를 가져오는 기능입니다.",
    icon: "🏆",
    siteUrl: "https://www.acmicpc.net",
  },
  {
    name: "Codeforces",
    description: "Codeforces에서 해결한 문제를 가져오는 기능입니다.",
    icon: "🚀",
    siteUrl: "https://codeforces.com",
  },
] as const;

export default function ExternalConnectedInfo() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <Code2 className="size-5 text-muted-foreground" />
          풀이 사이트 연결
        </CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          아직 제공되지 않는 기능입니다.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {externalSites.map((site) => (
          <ExternalSiteCard key={site.name} {...site} />
        ))}
      </CardContent>
    </Card>
  );
}
