import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ color: 'white', fontSize: 60, textAlign: 'center' }}>{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}