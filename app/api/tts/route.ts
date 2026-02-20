import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, voiceGender } = await req.json();

    // معرف الصوت (Antoni للشامي)
    const VOICE_ID = voiceGender === 'female' ? '21m00Tcm4TlvDq8ikWAM' : 'N2lVS1wzihvS3JvFnfUC';

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      }),
    });

    if (!response.ok) throw new Error('API Error');

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
