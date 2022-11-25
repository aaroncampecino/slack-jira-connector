const hiCallback = async ({
  context,
  client,
  say,
  body,
  message,
  payload,
  event,
}) => {
  console.log("context " + context);
  console.log(JSON.stringify(context));

  console.log("body " + body);
  console.log(JSON.stringify(body));

  console.log("message " + message);
  console.log(JSON.stringify(message));

  console.log("payload " + payload);
  console.log(JSON.stringify(payload));

  console.log("event " + event);
  console.log(JSON.stringify(event));

  client.chat.postMessage({
    channel: "C03DZ4H9WF8",
    token:
      "xoxe.xoxb-1-MS0yLTM0ODE3ODg2NTQ2NTgtMzk4OTgwNDE5Nzg3NS0zOTc1MzQzNTU4NDU1LTQ0MjU1NjA5MTgxMDAtZjlmNmI3ZjRkMTVlNDE4M2I4MWNmNzBhYWYxZDIyMTNhNGU2OWY5Yzc3Y2VkMjhlY2IzY2M4NjYwNzllYzRjOQ",
    text: `<!channel> this is from Workspace 1`,
  });

  say(`hello mofos`);
};

module.exports = { hiCallback };
