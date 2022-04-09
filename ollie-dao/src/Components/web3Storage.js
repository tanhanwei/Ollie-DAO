import { Web3Storage } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU5QUNhMkFDNDhjNTlENTA0MjU2YTM5OTE4ZTk2QzU4OTFERWJiMzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk0OTkwNzM0MjEsIm5hbWUiOiJPbGxpZSBEYW8ifQ.0XywBxSKKTcJWNl9IgXl1oX5ilFEOmfHzAH-xocSbiY";

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  //return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects() {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { hello: "world" };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "hello.json"),
  ];
  return files;
}

function createTestFileObjects() {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = {
    title: "Stream 0.001 ETH per seconds for hiring a Discord Mod.",
    details: `Our communities are growing super fast,
      and we had followers from all over the world.
      I'd like to hire Mr. C as our new Mod. He is a seasoned Discord mod
      who has successfully enagaged more than 100K users for 6 hours daily.`,
  };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [new File([blob], "hello.json")];
  return files;
}
function createProposalJSON(title, details) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = {
    title: title,
    details: details,
  };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [new File([blob], "proposal.json")];
  return files;
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

export async function uploadTestFile() {
  makeStorageClient();
  const files = createTestFileObjects();
  const cid = await storeFiles(files);
  return cid;
}

export async function uploadProposal(title, details) {
  makeStorageClient();
  const files = createProposalJSON(title, details);
  const cid = await storeFiles(files);
  return cid;
}

async function retrieve(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`);
  }

  // request succeeded! do something with the response object here...
}

export async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  console.log(files);
  for (const file of files) {
    //console.log(`${file.cid} -- ${file.name} -- ${file.size}`);
    //console.log(file);
  }
}

export async function getJSON(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    return { title: "Error", details: "Error" };
  }
}
