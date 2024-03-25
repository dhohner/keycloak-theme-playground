import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login.ftl",
});

const meta = {
  title: "login/Login",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />,
};

export const WithoutPasswordField: Story = {
  render: () => <PageStory kcContext={{ realm: { password: false } }} />,
};

export const WithoutRegistration: Story = {
  render: () => (
    <PageStory kcContext={{ realm: { registrationAllowed: false } }} />
  ),
};

export const WithoutPasswordReset: Story = {
  render: () => (
    <PageStory kcContext={{ realm: { resetPasswordAllowed: false } }} />
  ),
};

export const WithPresetUsername: Story = {
  render: () => (
    <PageStory kcContext={{ login: { username: "max.mustermann@mail.com" } }} />
  ),
};

export const WithImmutablePresetUsername: Story = {
  render: () => (
    <PageStory
      kcContext={{
        auth: {
          attemptedUsername: "max.mustermann@mail.com",
          showUsername: true,
        },
        usernameHidden: true,
        message: {
          type: "info",
          summary:
            "Bitte melden Sie sich erneut an, um Ihre Identität zu bestätigen.",
        },
      }}
    />
  ),
};
