import { db } from "../fire";
import ipfs from "../ipfs";
import { collection, addDoc, getDoc } from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";
import { generate, verify } from "password-hash";
import axios from "axios";
import { decrypt, encrypt } from "./cipher";

export async function register(uid, password, ekyc) {
  // create doc -> uid
  // hash uid and pwd -> privateKey
  // aes on ekyc using privateKey
  // store on ipfs
  // get hash from ipfs
  // add to firebase

  const privateKey = generate(uid + password);

  const buffer = Buffer.from(await encrypt(ekyc, privateKey));
  ipfs.files.add(buffer).then(async (res) => {
    console.log(res[0].hash);

    await db.collection("users").doc(uid).set({
      blockHash: res[0].hash,
      privateKey: privateKey,
      incomingRequests: {},
    });
  });
}

export async function updateKYC(ekyc, privateKey) {
  console.log(ekyc);
  const buffer = Buffer.from(await encrypt(ekyc, privateKey));
  ipfs.files.add(buffer).then(async (res) => {
    console.log(res[0].hash);

    await db
      .collection("users")
      .doc(ekyc.KycRes.UidData._attributes.uid)
      .update({
        blockHash: res[0].hash,
      });
  });
}

export async function getDataFromIPFS(blockHash) {
  if (blockHash) {
    const res = await ipfs.files.cat(blockHash);
    return res;
  } else return {};
}

export async function getDataFromFirebase(uid) {
  console.log(uid);
  const res = await db.collection("users").doc(uid).get();
  return res.data();
}

export async function getBlockData(blockHash, privateKey) {
  const ipfsData = await getDataFromIPFS(blockHash);
  const ekyc = await decrypt(ipfsData, privateKey);
  return {
    uid: ekyc.KycRes.UidData._attributes.uid,
    dob: ekyc.KycRes.UidData.Poi._attributes.dob,
    gender: ekyc.KycRes.UidData.Poi._attributes.gender,
    name: ekyc.KycRes.UidData.Poi._attributes.name,
    phone: ekyc.KycRes.UidData.Poi._attributes.phone,
    photo: ekyc.KycRes.UidData.Pht._text,
    co: ekyc.KycRes.UidData.Poa._attributes.co,
    country: ekyc.KycRes.UidData.Poa._attributes.country,
    dist: ekyc.KycRes.UidData.Poa._attributes.dist,
    house: ekyc.KycRes.UidData.Poa._attributes.house,
    lm: ekyc.KycRes.UidData.Poa._attributes.lm,
    loc: ekyc.KycRes.UidData.Poa._attributes.loc,
    pc: ekyc.KycRes.UidData.Poa._attributes.pc,
    state: ekyc.KycRes.UidData.Poa._attributes.state,
    vtc: ekyc.KycRes.UidData.Poa._attributes.vtc,
  };
}

export async function getEkyc(uid) {
  const firebaseData = await getDataFromFirebase(uid);
  const blockHash = firebaseData.blockHash;
  const privateKey = firebaseData.privateKey;

  console.log(getBlockData(blockHash, privateKey));

  return await getBlockData(blockHash, privateKey);
}

export async function getRawEkyc(uid) {
  const firebaseData = await getDataFromFirebase(uid);
  const blockHash = firebaseData.blockHash;
  const privateKey = firebaseData.privateKey;

  const ipfsData = await getDataFromIPFS(blockHash);
  const ekyc = await decrypt(ipfsData, privateKey);
  console.log(ekyc);
  return ekyc;
}

export async function login(uid, password) {
  const data = await getDataFromFirebase(uid);
  localStorage.setItem(
    "user",
    JSON.stringify({
      uid: uid,
      userData: data,
    })
  );
  return verify(uid + password, data.privateKey);
}

export async function pushRequest(ownerUID, requesterUID) {
  await db
    .collection("users")
    .doc(ownerUID)
    .set({ incomingRequests: { [requesterUID]: false } }, { merge: true });
}

export async function popRequest(uid) {
  await db.collection("users").doc(uid).update({ incomingRequests: {} });
}

export async function sendKYC(ownerUID, requesterUID) {
  const ownerData = await db.collection("users").doc(ownerUID).get();
  const blockHash = ownerData.data().blockHash;
  const privateKey = ownerData.data().privateKey;

  db.collection("users")
    .doc(requesterUID)
    .set({
      requestResponses: {
        blockHash: blockHash,
        privateKey: privateKey,
      },
    });
}

export async function getResponses(uid) {
  const res = await db.collection("users").doc(uid).get();
  console.log(res.data().requestResponses);
  return res.data().requestResponses;
}
