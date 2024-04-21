import { useState, type FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {UsernameInput} from "@/components/login/usernameInput.tsx";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, Template, doUseDefaultCss } = props;

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const userNameInputProps = {
    isHidden: usernameHidden,
    loginWithEmailAllowed: realm.loginWithEmailAllowed,
    registrationEmailAsUsername: realm.registrationEmailAsUsername,
    username: login.username,
    i18n: { msg, msgStr} as I18n,
  }

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss }}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
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
          <form
            id="kc-form-login"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            <div className="mx-auto max-w-[368px] pt-5">
              <UsernameInput {...userNameInputProps} />
              {realm.password && (
                <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
                  <Label htmlFor="password">{msg("password")}</Label>
                  <Input
                    tabIndex={2}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder={msgStr("password")}
                  />
                </div>
              )}
              {realm.resetPasswordAllowed && (
                <span className="flex justify-end text-sm">
                  <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                    {msg("doForgotPassword")}
                  </a>
                </span>
              )}
            </div>
            <div className="pt-4">
              <hr />
            </div>
            <div id="kc-form-buttons" className="mx-auto max-w-[368px] pt-5">
              <Input
                type="hidden"
                id="id-hidden-input"
                name="credentialId"
                {...(auth?.selectedCredential !== undefined
                  ? {
                      value: auth.selectedCredential,
                    }
                  : {})}
              />
              <Button
                tabIndex={4}
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
        </div>
      </div>
    </Template>
  );
}
