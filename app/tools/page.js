'use client';
import { useMemo, useState } from 'react';

function toGroovySnippet(kind, options) {
  switch (kind) {
    case 'set-property':
      return `// Set an Exchange Property\nmessage.setProperty('${options.name || 'MyProperty'}', ${options.valueType === 'number' ? options.value || 0 : `'${options.value || ''}'`});`;
    case 'get-property':
      return `// Get an Exchange Property\ndef value = message.getProperty('${options.name || 'MyProperty'}')`;
    case 'get-header':
      return `// Read an HTTP Header\ndef header = message.getHeader('${options.name || 'Authorization'}')`;
    case 'read-body':
      return `// Read body as String\ndef body = message.getBody(java.lang.String)\n// Parse JSON if needed\n// def json = new groovy.json.JsonSlurper().parseText(body)`;
    case 'set-header-basic-auth':
      return `// Set HTTP Basic Authorization header\ndef creds = '${options.username || 'user'}:${options.password || 'pass'}'\ndef basic = 'Basic ' + creds.bytes.encodeBase64().toString()\nmessage.setHeader('Authorization', basic)`;
    default:
      return '';
  }
}

function toContentModifierXML(pairs) {
  const entries = pairs.filter(p => p.name).map(p => `    <set headerName="${p.name}">${p.value}</set>`).join('\n');
  return `<ContentModifier>\n  <Headers>\n${entries || '    <!-- add <set headerName="X">value</set> -->'}\n  </Headers>\n</ContentModifier>`;
}

export default function ToolsPage() {
  const [kind, setKind] = useState('set-property');
  const [name, setName] = useState('MyProperty');
  const [value, setValue] = useState('Hello');
  const [valueType, setValueType] = useState('string');
  const [pairs, setPairs] = useState([{ name: 'X-CorrelationID', value: '${header.CorrelationID}' }]);

  const groovy = useMemo(() => toGroovySnippet(kind, { name, value, valueType, username: name, password: value }), [kind, name, value, valueType]);
  const xml = useMemo(() => toContentModifierXML(pairs), [pairs]);

  return (
    <div>
      <h1>Tools</h1>
      <p className="small">Generate Groovy and Content Modifier snippets for CPI.</p>

      <div className="hr" />
      <section className="card" style={{marginBottom:16}}>
        <h3>Groovy snippet generator</h3>
        <div className="form-row">
          <div>
            <label className="label">Action</label>
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="set-property">Set Exchange Property</option>
              <option value="get-property">Get Exchange Property</option>
              <option value="get-header">Get Header</option>
              <option value="read-body">Read Body</option>
              <option value="set-header-basic-auth">Set Basic Auth Header</option>
            </select>
          </div>
          <div>
            <label className="label">Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="label">Value</label>
            <input className="input" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <label className="label">Value Type</label>
            <select value={valueType} onChange={(e) => setValueType(e.target.value)}>
              <option value="string">String</option>
              <option value="number">Number</option>
            </select>
          </div>
        </div>
        <div className="label">Output</div>
        <pre className="code"><code>{groovy}</code></pre>
      </section>

      <section className="card">
        <h3>Content Modifier (Headers) helper</h3>
        {pairs.map((p, i) => (
          <div className="form-row" key={i}>
            <div>
              <label className="label">Header Name</label>
              <input className="input" value={p.name} onChange={(e) => {
                const next = pairs.slice(); next[i] = { ...p, name: e.target.value }; setPairs(next);
              }} />
            </div>
            <div>
              <label className="label">Value</label>
              <input className="input" value={p.value} onChange={(e) => {
                const next = pairs.slice(); next[i] = { ...p, value: e.target.value }; setPairs(next);
              }} />
            </div>
          </div>
        ))}
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button className="btn" onClick={() => setPairs([...pairs, { name: '', value: '' }])}>Add header</button>
          <button className="btn" onClick={() => setPairs([{ name: 'X-CorrelationID', value: '${header.CorrelationID}' }])}>Reset</button>
        </div>
        <div className="label" style={{marginTop:12}}>XML</div>
        <pre className="code"><code>{xml}</code></pre>
      </section>
    </div>
  );
}
