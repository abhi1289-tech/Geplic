export async function getSignatureEvidence() {

  let ip = "unknown";

  try {

    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();

    ip = data.ip;

  } catch (err) {

    console.error("IP fetch failed");

  }

  const userAgent = navigator.userAgent;

  const platform = navigator.platform;

  const timestamp = new Date().toISOString();

  return {
    ip,
    userAgent,
    platform,
    timestamp
  };

}