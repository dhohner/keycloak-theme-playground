// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState, Suspense } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import loginUrl from "./assets/login.svg";
import { SuspenseImg } from "@/components/ui/suspenseImg";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ResetIcon } from "@radix-ui/react-icons";

const getAlertVariant = (type: string): "destructive" | "default" =>
  type === "error" ? "destructive" : "default";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg } = i18n;

  const { auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    styles: [],
    htmlClassName: "h-screen",
    bodyClassName: "bg-slate-200 h-full flex",
  });

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  if (!isReady) {
    return null;
  }

  return (
    <div className="flex flex-1 h-full items-center justify-center">
      <div className="max-w-[768px] max-h-[968px] flex-1 rounded-xl border bg-white px-6 py-4 shadow-2xl">
        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
        {displayMessage &&
          message !== undefined &&
          (message.type !== "warning" || !isAppInitiatedAction) && (
            <div className="pb-5">
              <Alert variant={getAlertVariant(message.type)}>
                <div className="flex items-center gap-5">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <AlertDescription className="font-semibold">
                    {message.summary}
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          )}
        <div className="sm:flex sm:divide-x">
          <div className="hidden sm:flex justify-center">
            <Suspense fallback={<Skeleton className="w-[268px] h-[268px]" />}>
              <SuspenseImg
                src={loginUrl}
                alt="Login Illustration"
                width={268}
                height={268}
              />
            </Suspense>
          </div>
          <div className="flex-1 sm:pl-8">
            <header className="pb-4 text-center text-xl font-semibold">
              {!(
                auth !== undefined &&
                auth.showUsername &&
                !auth.showResetCredentials
              ) ? (
                displayRequiredFields ? (
                  <div className={getClassName("kcContentWrapperClass")}>
                    <div
                      className={clsx(
                        getClassName("kcLabelWrapperClass"),
                        "subtitle"
                      )}
                    >
                      <span className="subtitle">
                        <span className="required">*</span>
                        {msg("requiredFields")}
                      </span>
                    </div>
                    <div>
                      <h1 id="kc-page-title">{headerNode}</h1>
                    </div>
                  </div>
                ) : (
                  <h1 id="kc-page-title">{headerNode}</h1>
                )
              ) : displayRequiredFields ? (
                <div className={getClassName("kcContentWrapperClass")}>
                  <div
                    className={clsx(
                      getClassName("kcLabelWrapperClass"),
                      "subtitle"
                    )}
                  >
                    <span className="subtitle">
                      <span className="required">*</span>{" "}
                      {msg("requiredFields")}
                    </span>
                  </div>
                  <div>
                    {showUsernameNode}
                    <div className={getClassName("kcFormGroupClass")}>
                      <div id="kc-username">
                        <label id="kc-attempted-username">
                          {auth?.attemptedUsername}
                        </label>
                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                          <div className="kc-login-tooltip">
                            <i className={getClassName("kcResetFlowIcon")}></i>
                            <span className="kc-tooltip-text">
                              {msg("restartLoginTooltip")}
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {showUsernameNode}
                  <div className={getClassName("kcFormGroupClass")}>
                    <div
                      id="kc-username"
                      className="flex justify-center items-center gap-2"
                    >
                      <label id="kc-attempted-username">
                        {auth?.attemptedUsername}
                      </label>
                      <a id="reset-login" href={url.loginRestartFlowUrl}>
                        <ResetIcon className="h-5 w-5"></ResetIcon>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </header>
            <div className="block sm:hidden">
              <hr />
            </div>
            <div className="flex sm:hidden justify-center">
              <Suspense fallback={<Skeleton className="w-[268px] h-[268px]" />}>
                <SuspenseImg
                  src={loginUrl}
                  alt="Login Illustration"
                  width={268}
                  height={268}
                />
              </Suspense>
            </div>
            <hr />
            {children}
            {displayInfo && (
              <div id="kc-info" className="pt-2">
                {infoNode}
              </div>
            )}
            <span
              className={clsx({
                ["pt-1"]: displayInfo,
                ["pt-2"]: !displayInfo,
                ["text-xs flex justify-center"]: true,
              })}
            >
              <span className="font-semibold">&copy;</span>
              {new Date().getFullYear()}
              <span className="font-semibold">&nbsp;ACME</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
