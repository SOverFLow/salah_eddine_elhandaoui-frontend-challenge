export default async function handler(req, res) {
    const { client_id, scope } = req.body;
  
    const result = await fetch("https://github.com/login/device/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id,
        scope,
      }),
    });
  
    const data = await result.json();
    res.status(200).json(data);
  }
  