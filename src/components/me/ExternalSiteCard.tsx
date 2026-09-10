import { ExternalLink } from "lucide-react";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

interface ExternalSiteCardProps {
  name: string;
  description: string;
  icon: string;
  siteUrl: string;
}

export default function ExternalSiteCard({
  name,
  description,
  icon,
  siteUrl,
}: ExternalSiteCardProps) {
  return (
    <Card className="border-border/60 bg-background shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-xl">
            <span aria-hidden="true">{icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display font-semibold">{name}</p>
              <Badge variant="secondary">준비 중</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mt-4 text-muted-foreground"
        >
          <a href={siteUrl} target="_blank" rel="noreferrer">
            사이트 보기
            <ExternalLink />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
