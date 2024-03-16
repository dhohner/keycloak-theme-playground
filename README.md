<p align="center">
    <i>🚀 A starter/demo project for <a href="https://keycloakify.dev">Keycloakify</a> v9 🚀</i>
    <br/>
    <br/>
    <img src="https://github.com/codegouvfr/keycloakify-starter/workflows/ci/badge.svg?branch=main">
    <br/>
    <br/>
    <a href="https://starter.keycloakify.dev">Authenticated React SPA</a>
</p>

# Introduction

This repo constitutes an easily reusable setup for a Keycloak theme project OR for a Vite SPA React App that generates a
Keycloak theme that goes along with it.
If you are only looking to create a Keycloak theme (and not a Keycloak theme and an App that share the same codebase) there are a lot of things that you can remove from this starter: [Please read this section of the README](#standalone-keycloak-theme).

This starter is based on Vite. There is also [a Webpack based starter](https://github.com/keycloakify/keycloakify-starter-cra).

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter

cd keycloakify-starter

pnpm i # install dependencies (it's like npm install)

pnpm run storybook # Start Storybook
               # This is by far the best way to develop your theme
               # This enable to quickly see your pages in isolation and in different states.
               # You can create stories even for pages that you haven't explicitly overloaded. See src/keycloak-theme/login/pages/LoginResetPassword.stories.tsx
               # See Keycloakify's storybook for if you need a starting point for your stories: https://github.com/keycloakify/keycloakify/tree/main/stories

# Install mvn (Maven) if not already done. On mac it's 'brew install maven', on Ubuntu/Debian it's 'sudo apt-get install maven'

pnpm run build-keycloak-theme # Actually build the theme (generates the .jar to be imported in Keycloak)
                          # Read the instruction printed on the console to see how to test
                          # your theme on a real Keycloak instance.

npx eject-keycloak-page # Prompt that let you select the pages you want to customize
                        # This CLI tools is not guaranty to work, you can always copy pase pages
                        # from the Keycloakify repo.
                        # After you ejected a page you need to edit the src/keycloak-theme/login(or admin)/KcApp.tsx file
                        # You need to add a case in the switch for the page you just imported in your project.
                        # Look how it's done for the Login page and replicate for your new page.

npx initialize-email-theme # For initializing your email theme
                           # Note that Keycloakify does not feature React integration for email yet.

npx download-builtin-keycloak-theme # For downloading the default theme (as a reference)
                                    # Look for the files in dist_keycloak/src/main/resources/theme/{base,keycloak}
```

# Theme variant

Keycloakify enables you to create different variant for a single theme.
This enable you to have a single jar that embed two or more theme variant.

![Theme variant](https://content.gitbook.com/content/FcBKODbZbNDgm0rc6a9K/blobs/9iKgs2rv2Kfb2pbs4dRz/image.png)

You can enable this feature by providing multiple theme name in the Keycloakify build option.
[See documentation](https://docs.keycloakify.dev/build-options#themename)

# The storybook

![image](https://github.com/keycloakify/keycloakify/assets/6702424/a18ac1ff-dcfd-4b8c-baed-dcda5aa1d762)

```bash
pnpm i
pnpm run storybook
```
