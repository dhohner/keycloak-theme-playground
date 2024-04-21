import type { FormEventHandler } from "react";
import { useState } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { UsernameInput } from "@/components/login/usernameInput.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function LoginUsername(
  props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { social, realm, url, usernameHidden, login } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we log in with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const usernameInputProps = {
    isHidden: usernameHidden,
    loginWithEmailAllowed: realm.loginWithEmailAllowed,
    registrationEmailAsUsername: realm.registrationEmailAsUsername,
    username: login.username,
    i18n: {msg, msgStr} as I18n,
  }

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
      infoNode={
        <div id="kc-registration">
          <span className="flex justify-center gap-1 text-sm">
            {msg("noAccount")}
            <a
              tabIndex={6}
              href={url.registrationUrl}
              className="font-semibold"
            >
              {msg("doRegister")}
            </a>
          </span>
        </div>
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div className="mx-auto pt-5 max-w-[368px]">
                <UsernameInput {...usernameInputProps} />
                {realm.resetPasswordAllowed && (
                  <span className="flex justify-end text-sm">
                    <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                      {msg("doForgotPassword")}
                    </a>
                  </span>
                )}
              </div>
              <div className="pt-4">
                <hr/>
              </div>
              <div className="mx-auto max-w-[368px]">
                <div id="kc-form-options" className="flex justify-end pt-3">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="flex items-center space-x-2">
                      <Checkbox tabIndex={3} id="rememberMe" {...(login.rememberMe === "on"
                        ? {
                          checked: true,
                        }
                        : {})} />
                      <label htmlFor="rememberMe"
                             className="peer-disabled:cursor-not-allowed text-sm font-medium leading-none peer-disabled:opacity-70">
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div id="kc-form-buttons" className="mx-auto pt-5 max-w-[368px]">
                <Button
                  tabIndex={3}
                  className="w-full"
                  name="login"
                  id="kc-login"
                  type="submit"
                  disabled={isLoginButtonDisabled}
                >
                  {msgStr("doLogIn")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  );
}
