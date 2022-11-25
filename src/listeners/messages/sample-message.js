const hiCallback = async ({ context, client, say }) => {
  console.log("context " + context);
  console.log(JSON.stringify(context));
  say(`hello mofos`);
};

module.exports = { hiCallback };
