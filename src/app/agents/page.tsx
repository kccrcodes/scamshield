import { AgentCardList } from "@/features/analysis/components/AgentCardList";

export default function AgentsPage() {
  return (
    <main className="page-shell page-narrow">
      <section className="panel panel-strong">
        <p className="eyebrow">Platform roadmap</p>
        <h1>One live agent now, four monetizable modules queued behind it.</h1>
        <p>
          LinkGuardian is the shipping wedge product. The other modules are scaffolded so
          the product already reads like a platform, but only the live agent is wired into
          the analysis flow.
        </p>
      </section>
      <AgentCardList />
    </main>
  );
}
