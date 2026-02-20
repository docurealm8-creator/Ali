"use client";
import React, { useState } from 'react';

export default function SyrianTTS() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const generateTTS = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceGender: 'male' }),
      });
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("خطأ في التوصيل");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }} dir="rtl">
      <h1 style={{ color: '#60a5fa' }}>الناطق السوري الذكي 🇸🇾</h1>
      <p style={{ color: '#94a3b8' }}>حول نصوصك إلى لهجة شامية طبيعية</p>
      
      <textarea 
        style={{ width: '100%', maxWidth: '500px', height: '150px', borderRadius: '15px', padding: '15px', fontSize: '18px', border: '1px solid #334155', backgroundColor: '#1e293b', color: 'white', outline: 'none' }}
        placeholder="اكتب هون شو ما بدك بالشامي..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <br />
      
      <button 
        onClick={generateTTS}
        disabled={loading || !text}
        style={{ width: '100%', maxWidth: '500px', padding: '15px', marginTop: '20px', backgroundColor: loading ? '#334155' : '#2563eb', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
      >
        {loading ? "جاري التوليد..." : "توليد الصوت الآن"}
      </button>

      {audioUrl && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '15px' }}>
          <audio controls src={audioUrl} style={{ width: '100%' }} autoPlay />
          <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '10px' }}>✓ تم توليد الصوت بنجاح</p>
        </div>
      )}
    </div>
  );
}
