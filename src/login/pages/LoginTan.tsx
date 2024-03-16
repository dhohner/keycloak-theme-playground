import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { FormEventHandler } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function LoginTan(
  props: PageProps<Extract<KcContext, { pageId: "login-tan.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { realm, url, login } = kcContext;

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
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
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
            <div>
              <hr />
              <div className="mx-auto max-w-[368px] pt-5 text-2xl">
                Wir haben Ihnen ihr Einmalpasswort per SMS zugeschickt. Bitte
                geben Sie dieses nun einfach ein.
              </div>
              <div className="mx-auto flex max-w-[368px] flex-col pt-5">
                <label
                  htmlFor="password"
                  className="self-start text-2xl font-bold text-slate-700"
                >
                  {msg("tan")}:
                </label>
                <InputOTP
                  tabIndex={1}
                  containerClassName="self-start flex items-center gap-2 pt-3"
                  autoFocus
                  name="password"
                  defaultValue={login.password ?? ""}
                  id="password"
                  maxLength={6}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 3).map((slot, index) => (
                          <InputOTPSlot
                            className="h-16 w-16 text-2xl"
                            key={index}
                            {...slot}
                          />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(3).map((slot, index) => (
                          <InputOTPSlot
                            className="h-16 w-16 text-2xl"
                            key={index}
                            {...slot}
                          />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="mx-auto max-w-[368px] pt-5 text-2xl">
              Haben Sie Probleme beim Login? Dann klicken Sie einfach{" "}
              <a
                tabIndex={2}
                className="cursor-pointer font-bold text-slate-800"
              >
                hier
              </a>{" "}
              und wir versenden ein neues Passwort!
            </div>
            {realm.resetPasswordAllowed && (
              <div className="mx-auto max-w-[368px] pt-5 text-2xl">
                <span>
                  <a
                    tabIndex={4}
                    href={url.loginResetCredentialsUrl}
                    className="cursor-pointer font-bold text-slate-800"
                  >
                    {msg("tanProblem")}
                  </a>
                </span>
              </div>
            )}
            <div id="kc-form-buttons" className="mx-auto max-w-[420px]">
              <Button
                tabIndex={3}
                className="h-14 w-full text-2xl"
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
