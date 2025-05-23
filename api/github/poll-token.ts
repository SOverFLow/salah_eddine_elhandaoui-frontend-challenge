export default async function handler(req, res) {
    const { client_id, device_code } = req.body;
  
    const result = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id,
        device_code,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });
  
    const data = await result.json();
    res.status(200).json(data);
  }
  