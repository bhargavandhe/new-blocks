import { db } from "../fire";
import ipfs from "../ipfs";
import { collection, addDoc, getDoc } from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";
import { generate, verify } from "password-hash";
import axios from "axios";

export async function register(uid, password, ekyc) {
  // create doc -> uid
  // hash uid and pwd -> privateKey
  // aes on ekyc using privateKey
  // store on ipfs
  // get hash from ipfs
  // add to firebase

  const privateKey = generate(uid + password);

  const _data = AES.encrypt(JSON.stringify(ekyc), privateKey);

  const buffer = Buffer.from(_data.toString());
  ipfs.files.add(buffer).then(async (res) => {
    await db
      .collection("users")
      .doc(uid)
      .set({ blockHash: res[0].hash, privateKey: privateKey, requests: [] });

    // const re = await ipfs.files.cat(hash);
    // const dec = AES.decrypt(re.toString(), privateKey);
    // console.log(dec.toString(CryptoJS.enc.Utf8));
  });
}

export async function getData(uid) {
  const res = await db.collection("users").doc(uid).get();
  return res.data();
}

export async function login(uid, password) {
  return verify(uid + password, getData(uid).privateKey);
}
