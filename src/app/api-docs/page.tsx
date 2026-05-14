const endpoint = "https://scamshield-plum.vercel.app/api/v1/check";

const curlExample = `curl -X POST ${endpoint} \\
  -H "Content-Type: application/json" \\
  -d '{
    "input_type": "voice_transcript",
    "content": "VIETCOMBANK: Your account will be locked in 15 minutes. Read your OTP to cancel the freeze.",
    "locale": "en-US"
  }'`;

export default function ApiDocsPage() {
  return (
    <main className="page-shell page-narrow">
      <section className="panel panel-strong">
        <p className="eyebrow">Public REST API</p>
        <h1>Integrate ScamShield with one JSON request.</h1>
        <p>
          Banks, logistics companies, and marketplaces can submit suspicious content and
          receive a normalized risk result from the routed ScamShield agent platform.
        </p>
      </section>

      <section className="panel docs-section">
        <h2>Endpoint</h2>
        <pre className="code-block">{`POST ${endpoint}`}</pre>
      </section>

      <section className="panel docs-section">
        <h2>Request</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_type</td>
                <td>string</td>
                <td>The evidence category to route to the right analyzer.</td>
              </tr>
              <tr>
                <td>content</td>
                <td>string</td>
                <td>Suspicious URL, message, seller profile, listing, or payment text.</td>
              </tr>
              <tr>
                <td>locale</td>
                <td>string</td>
                <td>Optional. Use en-US or vi-VN. Defaults to en-US.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel docs-section">
        <h2>Response</h2>
        <pre className="code-block">{`{
  "risk_level": "high",
  "risk_score": 86,
  "signals": [
    {
      "label": "Bank impersonation",
      "severity": "high",
      "evidence": "Claims to be Vietcombank and asks for OTP."
    }
  ],
  "recommended_action": "Do not share OTPs or transfer money.",
  "short_report": "This message shows high-risk bank impersonation signals.",
  "analyzed_by": "VoiceShield"
}`}</pre>
      </section>

      <section className="panel docs-section">
        <h2>cURL Example</h2>
        <pre className="code-block">{curlExample}</pre>
      </section>

      <section className="panel docs-section">
        <h2>Supported Input Types</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>input_type</th>
                <th>Routes to</th>
                <th>Use for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>url</td>
                <td>LinkGuardian</td>
                <td>Suspicious login, payment, or marketplace links.</td>
              </tr>
              <tr>
                <td>payment_text</td>
                <td>LinkGuardian</td>
                <td>Payment instructions, bank transfer requests, and QR payment text.</td>
              </tr>
              <tr>
                <td>seller_text</td>
                <td>LinkGuardian</td>
                <td>Seller messages and identity claims.</td>
              </tr>
              <tr>
                <td>listing_text</td>
                <td>LinkGuardian</td>
                <td>Marketplace listing descriptions and checkout instructions.</td>
              </tr>
              <tr>
                <td>voice_transcript</td>
                <td>VoiceShield</td>
                <td>SMS, WhatsApp messages, and phone call transcripts.</td>
              </tr>
              <tr>
                <td>shop_profile</td>
                <td>ShopScan</td>
                <td>Shopee, TikTok Shop, Lazada, or seller profile text.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
