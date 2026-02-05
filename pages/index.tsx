import React, { useEffect, useState } from 'react';

const darkBlue = '#081d39';

export default function Home() {
  const [yields, setYields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/yields')
      .then(r => r.json())
      .then(data => {
        setYields(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: darkBlue,
      color: '#fff',
      fontFamily: 'Inter, Arial'
    }}>
      {/* Header */}
      <header style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: 1 }}>Yibe</h1>
        <h2 style={{ fontWeight: 400, color: '#b3cdfa', fontSize: '1.3rem' }}>
          The DeFi Yield Scanner
        </h2>
        <p style={{ color: '#cce2ff', maxWidth: 520, margin: '1rem auto' }}>
          Easily compare DeFi yields. Powered by real-time, multi-chain data.<br />
          Uncomplicated. Open source. Secure.
        </p>
      </header>
      {/* Feature cards */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        margin: '2rem 0 3rem',
        flexWrap: 'wrap'
      }}>
        {[
          { title: 'Multi-Chain', desc: 'Scan top protocols across all major EVM chains.' },
          { title: 'Live APY', desc: 'See up-to-date yields across stablecoin markets.' },
          { title: 'Open Source', desc: 'Auditable & community-driven for your safety.' }
        ].map((f, i) => (
          <div key={i} style={{
            background: 'rgba(33, 53, 104, 0.92)',
            borderRadius: 10,
            padding: '1.5rem 2rem',
            minWidth: 240,
            boxShadow: '0 6px 32px #0003',
            border: '1px solid #223b62'
          }}>
            <h3 style={{ margin: 0, fontWeight: 700 }}>{f.title}</h3>
            <p style={{ margin: '0.5rem 0 0', color: '#aadffd' }}>{f.desc}</p>
          </div>
        ))}
      </section>
      {/* Yield Table */}
      <main style={{
        maxWidth: 900,
        background: '#102249',
        margin: '2rem auto',
        borderRadius: 14,
        boxShadow: '0 2px 18px #0002',
        padding: 28
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: 16, fontWeight: 600, color: '#aadffd' }}>Live Stablecoin Yields</h2>
        {loading ? (
          <p>Loading yields...</p>
        ) : yields && yields.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '1rem',
              background: '#0c1b34',
              borderRadius: 8
            }}>
              <thead>
                <tr>
                  <th style={thStyle}>Protocol</th>
                  <th style={thStyle}>Chain</th>
                  <th style={thStyle}>Asset</th>
                  <th style={thStyle}>APY (%)</th>
                  <th style={thStyle}>TVL ($)</th>
                </tr>
              </thead>
              <tbody>
                {yields.map((y, i) => (
                  <tr key={i} style={{ background: i % 2 ? '#0d2346' : '#102249' }}>
                    <td style={tdStyle}>{y.protocol || '-'}</td>
                    <td style={tdStyle}>{y.chain || '-'}</td>
                    <td style={tdStyle}>{y.asset || '-'}</td>
                    <td style={{ ...tdStyle, color: '#84f7c3', fontWeight: 600 }}>{y.apy ? (+y.apy).toFixed(2) : '-'}</td>
                    <td style={tdStyle}>{y.tvl_usd ? Number(y.tvl_usd).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No yield data found.</p>
        )}
      </main>
      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        fontSize: '1rem',
        color: '#aac'
      }}>
        Follow us on
        <a href="https://twitter.com/ilovenftt" style={{ color: '#aadffd', textDecoration: 'underline', marginLeft: 6 }}>@ilovenftt</a>
      </footer>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  color: '#aadffd',
  textAlign: 'left',
  fontWeight: 700,
  padding: '6px 10px',
  borderBottom: '2px solid #265388',
};
const tdStyle: React.CSSProperties = {
  color: '#eee',
  padding: '7px 10px',
};