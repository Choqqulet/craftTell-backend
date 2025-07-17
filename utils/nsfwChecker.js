import axios from 'axios';

export async function checkNsfw(buffer) {
  const base64 = buffer.toString('base64');
  const res = await axios.post(
    'https://api-inference.huggingface.co/models/Falconsai/nsfw_image_detection',
    { inputs: base64 },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
      },
    }
  );

  const results = res.data;
  const flagged = results.filter(r =>
    ['porn', 'nsfw', 'hentai', 'sexy'].includes(r.label)
  );

  return flagged.length > 0;
}