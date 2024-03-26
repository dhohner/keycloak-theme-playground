import { useState } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { FormEventHandler } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function LoginTan(
  props: PageProps<Extract<KcContext, { pageId: "login-tan.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template } = props;

  const { realm, url } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    formElement.submit();
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss }}
      headerNode={msg("doLogIn")}
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          <form
            id="kc-form-login"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            <div className="mx-auto max-w-[368px] pt-4">
              <div className="pb-4">{msgStr("tan_header")}</div>
              <div className="grid w-full max-w-sm items-center gap-1.5 pb-4">
                <Label htmlFor="password">{msg("tan")}:</Label>
                <InputOTP
                  tabIndex={1}
                  autoFocus
                  name="password"
                  id="password"
                  maxLength={6}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="mx-auto max-w-[368px] pb-4">
              Haben Sie Probleme beim Login? Dann klicken Sie einfach
              <a
                type="submit"
                tabIndex={3}
                className="cursor-pointer font-semibold text-slate-800"
              >
                &nbsp;hier&nbsp;
              </a>
              und wir versenden ein neues Passwort!
            </div>
            {realm.resetPasswordAllowed && (
              <div className="flex justify-end pb-1 text-sm">
                <span>
                  <a
                    tabIndex={4}
                    href={url.loginResetCredentialsUrl}
                    className="cursor-pointer font-semibold text-slate-800"
                  >
                    {msgStr("tanProblem")}
                  </a>
                </span>
              </div>
            )}
            <div className="pb-3">
              <hr />
            </div>
            <div id="kc-form-buttons" className="mx-auto max-w-[420px] pt-5">
              <div className="flex w-full justify-between">
                <Button
                  className="self-center"
                  type="reset"
                  tabIndex={5}
                  variant={"link"}
                >
                  <a id="reset-login" href={url.loginRestartFlowUrl}>
                    {msgStr("restartLoginTooltip")}
                  </a>
                </Button>
                <Button
                  tabIndex={2}
                  className="w-2/3"
                  name="login"
                  id="kc-login"
                  type="submit"
                  disabled={isLoginButtonDisabled}
                >
                  {msgStr("doLogIn")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
