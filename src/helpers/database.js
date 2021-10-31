import { db } from "../fire";
import ipfs from "../ipfs";
import { collection, addDoc, getDoc } from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";
import { generate, verify } from "password-hash";

export async function register(uid, password, ekyc) {
  // create doc -> uid
  // hash uid and pwd -> privateKey
  // aes on ekyc using privateKey
  // store on ipfs
  // get hash from ipfs
  // add to firebase
  // await db
  //   .collection("users")
  //   .doc(uid)
  //   .set({ blockHash: cid, privateKey: privateKey, requests: [] });
}

export async function login(uid, password) {
  const res = await db.collection("users").doc(uid).get();
  const data = res.data();

  const privateKey = generate(uid + password);

  const enc = AES.encrypt(
    JSON.stringify({ name: "bhargav andhe", message: "helloworld" }),
    privateKey
  );
  console.log(enc);

  const dec = AES.decrypt(enc.toString(), privateKey);
  console.log(Buffer(JSON.parse(dec.toString(CryptoJS.enc.Utf8))));

  // ipfs.add(Buffer(JSON.parse(dec.toString(CryptoJS.enc.Utf8))))

  return verify(uid + password, data.privateKey);
}
