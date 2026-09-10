import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

function PreparedFooterLink({ children }: { children: ReactNode }) {
  return (
    <span aria-disabled="true" title="준비중" className="cursor-not-allowed">
      {children}
      <span className="sr-only"> 준비중</span>
    </span>
  );
}

export default function LandingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2"
              aria-label="알고고 홈"
            >
              <Logo size="sm" />
            </Link>
            <p className="text-sm text-muted-foreground">
              외부 저지 사이트의 문제를 모아
              <br />
              에디터와 실행환경을 제공합니다.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider">
              PLATFORM
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-foreground"
                >
                  문제
                </Link>
              </li>
              <li>
                <PreparedFooterLink>대회</PreparedFooterLink>
              </li>
              <li>
                <PreparedFooterLink>랭킹</PreparedFooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider">
              COMMUNITY
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <PreparedFooterLink>자유게시판</PreparedFooterLink>
              </li>
              <li>
                <PreparedFooterLink>질문 &amp; 답변</PreparedFooterLink>
              </li>
              <li>
                <PreparedFooterLink>디스코드</PreparedFooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider">
              CONNECT
            </h3>
            <div className="flex space-x-4 text-muted-foreground">
              <span aria-disabled="true" title="GitHub 준비중">
                <FontAwesomeIcon icon={faGithub} className="size-5" />
                <span className="sr-only">GitHub 준비중</span>
              </span>
              <span aria-disabled="true" title="Twitter 준비중">
                <FontAwesomeIcon icon={faXTwitter} className="size-5" />
                <span className="sr-only">Twitter 준비중</span>
              </span>
              <span aria-disabled="true" title="LinkedIn 준비중">
                <FontAwesomeIcon icon={faLinkedin} className="size-5" />
                <span className="sr-only">LinkedIn 준비중</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Algogo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
