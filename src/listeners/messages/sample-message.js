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
    channel: process.env.WORKSPACE_2_CHANNEL,
    token: process.env.WORKSPACE_2_TOKEN,
    text: `<!channel> this is from Workspace 1`,
  });

  say(`hello mofos`);
};

module.exports = { hiCallback };
