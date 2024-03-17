import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
  de: {
    tan: "Einmalpasswort",
    tanProblem: "Handy nicht verfügbar?",
    restartLoginTooltip: "Zurück",
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
