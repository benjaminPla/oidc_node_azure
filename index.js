import express from "express";
import axios from "axios";
import qs from "querystring";
import "dotenv/config";

const api = express();

api.get("/login", (req, res) => {
  const url =
    "https://login.microsoftonline.com/" +
    `${process.env.TENANT_ID}` +
    "/oauth2/v2.0/authorize" +
    `?client_id=${process.env.CLIENT_ID}` +
    `&response_type=${process.env.RESPONSE_TYPE}` +
    `&scope=${process.env.SCOPE}`;
  res.redirect(url);
});

api.get("/login/callback", async (req, res) => {
  const { code } = req?.query;

  try {
    const request = await axios.post(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: process.env.GRANT_TYPE,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    );

    console.log(request.data);
    res.json(request.data);
  } catch (error) {
    const { status, data } = error.response;
    console.error(data);
    res.status(status).json(data);
  }
});

const port = process.env.PORT || 3000;
api.listen(port, () => console.log(`api on port ${port}`));
