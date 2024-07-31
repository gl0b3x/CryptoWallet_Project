import axios from "axios";

export default class Api {
  static async getAllCrypto(params = {}) {
    const response = await axios.get("https://openapiv1.coinstats.app/coins", {
      headers: {
        "X-API-KEY": "wUWjMtPlR5zoFTC+Woyt2la2mJsKYKxbGGVwElYpLIQ=",
        accept: "application/json",
        // "Cache-Control": "no-cache",
      },
      params: params,
    });
    return response;
  }

  static async getCryptoById(coindId) {
    const response = await axios.get(
      `https://openapiv1.coinstats.app/coins/${coindId}`,
      {
        headers: {
          "X-API-KEY": "wUWjMtPlR5zoFTC+Woyt2la2mJsKYKxbGGVwElYpLIQ=",
          accept: "application/json",
          // "Cache-Control": "no-cache",
        },
      },
    );
    return response;
  }

  static async getCryptoChart(coindId, period) {
    const response = await axios.get(
      `https://openapiv1.coinstats.app/coins/${coindId}/charts?period=${period}`,
      {
        headers: {
          "X-API-KEY": "wUWjMtPlR5zoFTC+Woyt2la2mJsKYKxbGGVwElYpLIQ=",
          accept: "application/json",
          // "Cache-Control": "no-cache",
        },
      },
    );
    return response;
  }
}
