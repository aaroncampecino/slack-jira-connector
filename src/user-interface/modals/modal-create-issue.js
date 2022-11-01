const { Modal, Blocks, Elements, Option } = require("slack-block-builder");

module.exports = () => {
  return Modal({
    title: "Create issue",
    submit: "Create",
    callbackId: "view-create-issue",
  })
    .blocks(
      Blocks.Input({ label: "Summary", blockId: "summary" }).element(
        Elements.TextInput({ actionId: "summary" })
      ),
      Blocks.Input({ label: "Description", blockId: "description" }).element(
        Elements.TextInput({ actionId: "description" }).multiline(true)
      )
    )
    .buildToJSON();
};
