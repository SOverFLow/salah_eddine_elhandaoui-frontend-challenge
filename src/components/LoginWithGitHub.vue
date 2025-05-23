<template>
  <div>
    <button
      @click="startDeviceFlow"
      class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Login with GitHub
    </button>

    <div v-if="userCode">
      <p>
        Go to
        <a
          class="text-blue-500"
          href="https://github.com/login/device"
          target="_blank"
        >
          https://github.com/login/device
        </a>
      </p>
      <p>
        Enter code: <strong>{{ userCode }}</strong>
      </p>
    </div>

    <div v-if="user">
      ✅ Logged in as: <strong>{{ user.login }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
const clientId = 'Ov23livucY8PmkAF7bkv'

async function startDeviceFlow() {
  const res = await fetch('/api/github/device-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      scope: 'read:user',
    }),
  });

  const data = await res.json();
  userCode.value = data.user_code;
  deviceCode.value = data.device_code;

  pollForAccessToken(data.device_code, data.interval);
}

async function pollForAccessToken(code: string, interval: number) {
  const poll = setInterval(async () => {
    const res = await fetch('/api/github/poll-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        device_code: code,
      }),
    });

    const data = await res.json();

    if (data.error === 'authorization_pending') return;

    clearInterval(poll);

    if (data.access_token) {
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      user.value = await userRes.json();
    } else {
      alert('Login failed: ' + data.error);
    }
  }, interval * 1000);
}

</script>
