import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login-tan.ftl",
});

const meta = {
  title: "login/LoginTan",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />,
};

//export const WitAbc: Story = {
//  render: () => <PageStory kcContext={{}} />,
//};
