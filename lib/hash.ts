export async function generateHash(data:any){

  const encoder = new TextEncoder();

  const encoded = encoder.encode(JSON.stringify(data));

  const buffer = await crypto.subtle.digest("SHA-256", encoded);

  const hashArray = Array.from(new Uint8Array(buffer));

  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2,"0"))
    .join("");

  return hashHex;

}