import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./page/App"));
const NotFound = lazy(() => import("./page/NotFound"));
const SignUp = lazy(() => import("./page/SignUp"));
const Login = lazy(() => import("./page/Login"));
const Problem = lazy(() => import("./page/Problem"));
const My = lazy(() => import("./page/My"));
const OAuth = lazy(() => import("./page/OAuth"));
const Error = lazy(() => import("./page/Error"));
const Landing = lazy(() => import("./page/Landing"));
const TodayProblem = lazy(() => import("./page/TodayProblem"));
const OAuthV2Callback = lazy(() => import("./page/OAuthV2Callback"));
const OAuthV2ConnectCallback = lazy(
  () => import("./page/OAuthV2ConnectCallback"),
);
const OAuthV2DisconnectCallback = lazy(
  () => import("./page/OAuthV2DisconnectCallback"),
);

export function RouteLoadingState() {
  return (
    <main
      className="flex min-h-dvh items-center justify-center bg-background px-5 text-foreground"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-border border-t-primary"
        />
        화면을 불러오는 중이에요
      </div>
    </main>
  );
}

function routeElement(Page: ComponentType) {
  return (
    <Suspense fallback={<RouteLoadingState />}>
      <Page />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: routeElement(App),
  },
  {
    path: "/signup",
    element: routeElement(SignUp),
  },
  {
    path: "/login",
    element: routeElement(Login),
  },
  {
    path: "/problem",
    element: routeElement(App),
  },
  {
    path: "/problem/today",
    element: routeElement(TodayProblem),
  },
  {
    path: "/problem/:problemUuid",
    element: routeElement(Problem),
  },
  {
    path: "/landing",
    element: routeElement(Landing),
  },
  {
    path: "/me",
    element: routeElement(My),
  },
  {
    path: "/oauth/v2/callback/:provider",
    element: routeElement(OAuthV2Callback),
  },
  {
    path: "/oauth/v2/connect/callback/:provider",
    element: routeElement(OAuthV2ConnectCallback),
  },
  {
    path: "/oauth/v2/disconnect/callback/:provider",
    element: routeElement(OAuthV2DisconnectCallback),
  },
  {
    path: "/oauth/token",
    element: routeElement(OAuth),
  },
  {
    path: "/error",
    element: routeElement(Error),
  },
  {
    path: "/*",
    element: routeElement(NotFound),
  },
]);

export default router;
