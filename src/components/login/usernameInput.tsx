import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import React from "react";
import {I18n} from "@/login/i18n.ts";


export interface UsernameInputProps
    extends React.HTMLProps<HTMLDivElement> {
    isHidden?: boolean,
    loginWithEmailAllowed?: boolean,
    registrationEmailAsUsername?: boolean,
    username?: string,
    i18n: I18n,
}

const usernameInput = React.forwardRef<HTMLDivElement, UsernameInputProps>(
    ({...props}) => {
        const {msg, msgStr} = props.i18n;
        return (<div className="grid w-full max-w-sm items-center gap-1.5 pb-3">
                {!props.hidden &&
                    (() => {
                        const label = !props.loginWithEmailAllowed
                            ? "username"
                            : props.registrationEmailAsUsername
                                ? "email"
                                : "usernameOrEmail";

                        const autoCompleteHelper: typeof label =
                            label === "usernameOrEmail" ? "username" : label;

                        return (
                            <>
                                <Label htmlFor={autoCompleteHelper}>{msg(label)}</Label>
                                <Input
                                    tabIndex={1}
                                    id={autoCompleteHelper}
                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                    //the browser how to pre fill the form but before submit we put it back
                                    //to username because it is what keycloak expects.
                                    name={autoCompleteHelper}
                                    defaultValue={props.username ?? ""}
                                    type="text"
                                    autoFocus={true}
                                    autoComplete="off"
                                    placeholder={msgStr(label)}
                                />
                            </>
                        );
                    })()
                }
            </div>
        );
    });

export {usernameInput as UsernameInput};