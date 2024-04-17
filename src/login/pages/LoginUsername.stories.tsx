import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login-username.ftl",
});

const meta = {
  title: "login/LoginUsername",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />,
};

export const WithoutRememberMe: Story = {
  render: () => (
    <PageStory
      kcContext={{ realm: { rememberMe: false, registrationAllowed: true } }}
    />
  ),
};

//export const WitAbc: Story = {
//  render: () => <PageStory kcContext={{}} />,
//};
