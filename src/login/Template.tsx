// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState, useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import loginUrl from "./assets/login.svg";

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

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    styles: [`${url.resourcesPath}/css/login.css`],
    htmlClassName: "h-screen",
    bodyClassName: "bg-slate-100 h-full flex",
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
            <div className={clsx("alert", `alert-${message.type}`)}>
              {message.type === "success" && (
                <span className={getClassName("kcFeedbackSuccessIcon")}></span>
              )}
              {message.type === "warning" && (
                <span className={getClassName("kcFeedbackWarningIcon")}></span>
              )}
              {message.type === "error" && (
                <span className={getClassName("kcFeedbackErrorIcon")}></span>
              )}
              {message.type === "info" && (
                <span className={getClassName("kcFeedbackInfoIcon")}></span>
              )}
              <span
                className="kc-feedback-text"
                dangerouslySetInnerHTML={{
                  __html: message.summary,
                }}
              />
            </div>
          )}
        <div className="sm:flex sm:divide-x">
          <img
            src={loginUrl}
            className="hidden sm:block"
            alt="Login Illustration"
            width={268}
          />
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
                    <div className="col-md-10">
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
                  <div className="col-md-10">
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
                </>
              )}
            </header>
            <div className="block sm:hidden">
              <hr />
            </div>
            <div className="flex justify-center sm:hidden">
              <img src={loginUrl} alt="Login Illustration" width={268} />
            </div>
            <hr />
            {children}
            {displayInfo && (
              <div id="kc-info" className="pt-3">
                <div
                  id="kc-info-wrapper"
                  className={getClassName("kcInfoAreaWrapperClass")}
                >
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
