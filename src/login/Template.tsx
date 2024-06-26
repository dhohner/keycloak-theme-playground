import { useState, Suspense } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import loginUrl from "./assets/login.svg";
import logoUrl from "./assets/logo.svg";
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
    htmlClassName: undefined,
    bodyClassName: undefined,
  });

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  if (!isReady) {
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-full pl-1">
        <Suspense fallback={<Skeleton className="w-[108px] h-[50px]" />}>
          <img alt="ACME Logo" src={logoUrl} width={108} height={50} />
        </Suspense>
      </div>
      <div className="flex h-full w-full items-center justify-center md:px-6">
        <div className="flex-1 border bg-white px-6 py-4 max-w-[768px] max-h-[968px] md:rounded-xl md:shadow-lg">
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
          <div className="sm:divide-x sm:flex">
            <div className="hidden justify-center sm:flex">
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
                              <i
                                className={getClassName("kcResetFlowIcon")}
                              ></i>
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
                        className="flex items-center justify-center gap-2"
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
              <div className="flex justify-center sm:hidden">
                <Suspense
                  fallback={<Skeleton className="w-[268px] h-[268px]" />}
                >
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end pr-2 pb-1">
        <span className="flex flex-col text-sm">
          <span className="font-semibold">&nbsp;ACME&nbsp;Corp.</span>
          <div className="flex items-center justify-end">
            <span className="pr-1 font-semibold">&copy;</span>
            {new Date().getFullYear()}
          </div>
        </span>
      </div>
    </div>
  );
}
