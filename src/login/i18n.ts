import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
  de: {
    tan: "Einmalpasswort",
    tanProblem: "Handy nicht verfügbar?",
    restartLoginTooltip: "Zurück",
    tan_header:
      "Wir haben Ihnen Ihr Einmalpasswort per SMS zugeschickt. Bitte geben Sie dieses nun einfach ein.",
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
