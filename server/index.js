const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.post('/auth/github/token', async (req, res) => {
  const { code } = req.body
  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    )

    const accessToken = tokenRes.data.access_token

    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    res.json({ user: userRes.data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to authenticate' })
  }
})

app.listen(4000, () => {
  console.log('✅ Express server running on http://localhost:4000')
})
