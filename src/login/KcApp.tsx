import "./KcApp.css";
import { lazy, Suspense } from "react";
import Fallback from "keycloakify/login";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const Login = lazy(() => import("./pages/Login"));
const Terms = lazy(() => import("./pages/Terms"));
const LoginTan = lazy(() => import("./pages/LoginTan"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
/* const classes = {
  // NOTE: The classes are defined in ./KcApp.css
  kcHtmlClass: "my-root-class",
  kcHeaderWrapperClass: "my-color my-font",
} satisfies PageProps["classes"];
*/

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    //NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
    //We could display a loading progress but it's usually a matter of milliseconds.
    return null;
  }

  /*
   * Examples assuming i18n.currentLanguageTag === "en":
   * i18n.msg("access-denied") === <span>Access denied</span>
   * i18n.msg("foo") === <span>foo in English</span>
   */

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                {...{ kcContext, i18n, Template }}
                doUseDefaultCss={false}
              />
            );
          case "login-username.ftl":
            return (
              <LoginUsername
                {...{ kcContext, i18n, Template }}
                doUseDefaultCss={false}
              />
            );
          case "terms.ftl":
            return (
              <Terms
                {...{ kcContext, i18n, Template }}
                doUseDefaultCss={false}
              />
            );
          case "login-tan.ftl":
            return (
              <LoginTan
                {...{ kcContext, i18n, Template }}
                doUseDefaultCss={false}
              />
            );
          default:
            return (
              <Fallback
                {...{ kcContext, i18n }}
                Template={Template}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
