import "./LabInvitation.css";

export default function LabInvitation() {
  return <aside className="lab-invitation container" aria-labelledby="lab-invitation-title">
    <div><p className="section-index">Code topology / Lab</p>
      <h2 id="lab-invitation-title">Want to inspect the code behind the work?</h2>
      <p>Explore the file and import structure of my public projects.</p>
    </div>
    <a id="code-topology" className="text-link" href={import.meta.env.BASE_URL + "?lab=code-topology"}>Open code topology <span aria-hidden="true">↗</span></a>
  </aside>;
}
