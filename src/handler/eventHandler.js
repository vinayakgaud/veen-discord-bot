import getAllFiles from "../utils/getAllFiles.js";

export default (client) => {
  const eventFolders = getAllFiles("./src/events/", true);
  for (const eventFolder of eventFolders) {
    const evetnFiles = getAllFiles(eventFolder);
    const eventName = eventFolder.split("\\").pop(); //replace(/\\/g, "/"). /regex to replace backward slash with forward slash
    client.on(eventName, async (arg) => {
      for (const eventFile of evetnFiles) {
        const evenFunction = import(eventFile);
        await evenFunction(client, arg);
      }
    });
  }
};
