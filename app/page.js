export default function Home() {
  return (
    <div className="hero">
      <h1>SAP Cloud Integration (CPI) Toolkit</h1>
      <p>
        Practical guides and small utilities for SAP Cloud Integration on SAP BTP. 
        Learn the essentials and generate handy snippets for your iFlows.
      </p>
      <div className="card-grid">
        <a className="card" href="/guides">
          <h3>Guides</h3>
          <p>Connectivity, security, Groovy, deployment, and operations checklists.</p>
          <span className="badge">Curated</span>
        </a>
        <a className="card" href="/tools">
          <h3>Tools</h3>
          <p>Groovy snippet generator, Content Modifier helper, and mapping tester.</p>
          <span className="badge">Interactive</span>
        </a>
        <a className="card" href="https://help.sap.com/docs/cloud-integration" target="_blank" rel="noreferrer">
          <h3>Official Docs</h3>
          <p>Jump to SAP documentation for product details and APIs.</p>
          <span className="badge">External</span>
        </a>
      </div>
    </div>
  );
}
