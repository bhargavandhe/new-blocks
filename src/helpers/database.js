import { db } from "../fire";
import ipfs from "../ipfs";
import { collection, addDoc, getDoc } from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";
import { generate, verify } from "password-hash";
import axios from "axios";
import { encrypt } from "./cipher";

export async function register(uid, password, ekyc) {
  // create doc -> uid
  // hash uid and pwd -> privateKey
  // aes on ekyc using privateKey
  // store on ipfs
  // get hash from ipfs
  // add to firebase

  const privateKey = generate(uid + password);

  // const _data = AES.encrypt(JSON.stringify(ekyc), privateKey);

  const buffer = Buffer.from(encrypt(ekyc, privateKey));
  ipfs.files.add(buffer).then(async (res) => {
    await db
      .collection("users")
      .doc(uid)
      .set({ blockHash: res[0].hash, privateKey: privateKey, requests: [] });
  });
}

export async function getDataFromIPFS(blockHash) {
  const res = await ipfs.files.cat(blockHash);
  return res;
}

export async function getDataFromFirebase(uid) {
  const res = await db.collection("users").doc(uid).get();
  return res.data();
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
