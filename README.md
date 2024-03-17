<p align="center">
    <i>🚀 Based On <a href="https://keycloakify.dev">Keycloakify</a> v9 🚀</i>
    <br/>
</p>

# Introduction

My personal playground to build a Keycloak theme using Keycloakify.

This starter is based on Vite. There is also [a Webpack based starter](https://github.com/keycloakify/keycloakify-starter-cra).

# Quick start

```bash
git clone git@github.com:dhohner/keycloak-theme-playground.git

cd keycloak-theme-playground

pnpm i # install dependencies (it's like npm install)

pnpm storybook # Start Storybook
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

# The storybook

![image](https://github.com/keycloakify/keycloakify/assets/6702424/a18ac1ff-dcfd-4b8c-baed-dcda5aa1d762)

```bash
pnpm i
pnpm storybook
```
