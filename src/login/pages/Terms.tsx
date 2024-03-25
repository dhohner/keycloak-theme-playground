import { useRerenderOnStateChange } from "evt/hooks";
import { Markdown } from "keycloakify/tools/Markdown";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { evtTermMarkdown } from "keycloakify/login/lib/useDownloadTerms";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useDownloadTerms } from "keycloakify/login";
import { Button } from "@/components/ui/button";

export default function Terms(
  props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template } = props;

  const { msg, msgStr } = i18n;

  // NOTE: If you aren't going to customize the layout of the page you can move this hook to
  // KcApp.tsx, see: https://docs.keycloakify.dev/terms-and-conditions
  useDownloadTerms({
    kcContext,
    downloadTermMarkdown: async ({ currentLanguageTag }) => {
      const tos_url = (() => {
        switch (currentLanguageTag) {
          case "fr":
            return `${import.meta.env.BASE_URL}terms/fr.md`;
          default:
            return `${import.meta.env.BASE_URL}terms/en.md`;
        }
      })();

      const markdownString = await fetch(tos_url).then((response) =>
        response.text()
      );

      return markdownString;
    },
  });

  useRerenderOnStateChange(evtTermMarkdown);

  const { url } = kcContext;

  const termMarkdown = evtTermMarkdown.state;

  if (termMarkdown === undefined) {
    return null;
  }

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss }}
      displayMessage={false}
      headerNode={msg("termsTitle")}
    >
      <div className="py-4">
        <div className="max-h-[468px] sm:max-h-[568px] overflow-y-auto prose">
          <Markdown>{termMarkdown}</Markdown>
        </div>
      </div>
      <form
        className="form-actions flex-1 flex gap-4"
        action={url.loginAction}
        method="POST"
      >
        <Button
          name="cancel"
          id="kc-decline"
          type="submit"
          className="w-1/3"
          variant={"secondary"}
        >
          {msgStr("doDecline")}
        </Button>
        <Button name="accept" id="kc-accept" type="submit" className="w-2/3">
          {msgStr("doAccept")}
        </Button>
      </form>
    </Template>
  );
}
