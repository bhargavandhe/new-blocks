import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { xml2js } from "xml-js";

export async function generateCaptcha() {
  const baseURL =
    "https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha";

  return await axios({
    method: "post",
    url: baseURL,
    data: {
      langCode: "en",
      captchaLength: "3",
      captchaType: "2",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function sendOTP(uid, captchaTxnId, captchaValue) {
  const uuid = uuidv4();
  const baseURL =
    "https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp";

  return await axios({
    method: "post",
    url: baseURL,
    data: {
      uidNumber: uid,
      captchaTxnId: captchaTxnId,
      captchaValue: captchaValue,
      transactionId: "MYAADHAAR:" + uuid,
    },
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en_in",
      "x-request-id": uuid,
    },
  });
}

export async function getEkyc(txnId, otp, uid) {
  console.log(txnId, otp, uid);
  const baseURL = "https://stage1.uidai.gov.in/onlineekyc/getEkyc/";

  const res = await axios({
    method: "post",
    url: baseURL,
    data: {
      txnId: txnId,
      otp: otp,
      uid: uid,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res.data);

  return xml2js(res.data.eKycString, { compact: true, spaces: 4 });
}
