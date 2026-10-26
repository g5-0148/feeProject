import React, { useState, useEffect } from "react";

export default function JsConceptsHub() {
  const [localVal, setLocalVal] = useState(() => localStorage.getItem("skillsphere_demo_storage") || "");
  const [sessionVal, setSessionVal] = useState(() => sessionStorage.getItem("skillsphere_session_demo") || "");
  const [cookieVal, setCookieVal] = useState("");

  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )skillsphere_cookie=([^;]+)"));
    if (match) setCookieVal(match[2]);
  }, []);

  const saveToLocalStorage = (val) => {
    setLocalVal(val);
    localStorage.setItem("skillsphere_demo_storage", val);
  };

  const saveToSessionStorage = (val) => {
    setSessionVal(val);
    sessionStorage.setItem("skillsphere_session_demo", val);
  };

  const saveToCookie = (val) => {
    setCookieVal(val);
    document.cookie = `skillsphere_cookie=${val}; path=/; max-age=3600`;
  };

  const [counterCount, setCounterCount] = useState(0);
  const incrementClosure = () => setCounterCount((c) => c + 1);

  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map((n) => n * 2);
  const evens = numbers.filter((n) => n % 2 === 0);

  const sampleObj = { app: "SkillSphere", version: "2.0", active: true };
  const jsonString = JSON.stringify(sampleObj, null, 2);
  const parsedObj = JSON.parse(jsonString);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "var(--primary)" }}>⚡ JavaScript, DOM, BOM & Storage Master Hub</h2>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          This interactive module covers all advanced JavaScript topics required for your FEE-II evaluation in an easy-to-learn, simple format.
        </p>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>1. Variables (`var`, `let`, `const`) & Closures</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
          <code>var</code> has function scope & is hoisted. <code>let</code> and <code>const</code> have block scope. Closures allow inner functions to remember outer variables.
        </p>
        <div style={{ background: "var(--social-bg)", padding: 12, borderRadius: 6, fontSize: 13, marginBottom: 12 }}>
          <strong>Closure Counter Demo:</strong> Count = {counterCount}
        </div>
        <button className="btn" onClick={incrementClosure}>Increment via Closure</button>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>2. Higher-Order Functions & Array Methods (`map`, `filter`, `reduce`)</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Original Array: [1, 2, 3, 4, 5]</p>
        <ul style={{ fontSize: 13, paddingLeft: 20, color: "var(--text)" }}>
          <li><code>map(n =&gt; n * 2)</code> Result: [{doubled.join(", ")}]</li>
          <li><code>filter(n =&gt; n % 2 === 0)</code> Result: [{evens.join(", ")}]</li>
        </ul>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>3. JSON Handling (`JSON.stringify` & `JSON.parse`)</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Serialized JSON String:</p>
        <pre style={{ background: "var(--social-bg)", padding: 10, borderRadius: 6, fontSize: 12 }}>{jsonString}</pre>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>Parsed Object App Name: <strong>{parsedObj.app}</strong></p>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>4. BOM & Web Storage (LocalStorage, SessionStorage, Cookies)</h3>
        
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>LocalStorage Demo:</label>
          <input placeholder="Type to save in localStorage" value={localVal} onChange={(e) => saveToLocalStorage(e.target.value)} />
          <small style={{ color: "var(--muted)" }}>Persists even after closing browser.</small>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>SessionStorage Demo:</label>
          <input placeholder="Type to save in sessionStorage" value={sessionVal} onChange={(e) => saveToSessionStorage(e.target.value)} />
          <small style={{ color: "var(--muted)" }}>Clears when tab is closed.</small>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Cookies Demo:</label>
          <input placeholder="Type to save in document.cookie" value={cookieVal} onChange={(e) => saveToCookie(e.target.value)} />
          <small style={{ color: "var(--muted)" }}>Stored with 1-hour expiration.</small>
        </div>
      </div>
    </div>
  );
}