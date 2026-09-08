import "./ProjectWorld.css";

export type ProjectWorldId = "applied" | "market" | "novel";

interface ProjectWorldProps {
  project: ProjectWorldId;
  idPrefix: string;
  mobile?: boolean;
  open?: boolean;
}

const ink = "#14221c";
const secondary = "#526259";
const cream = "#F2F0E9";
const mint = "#A8E6CF";

/** Decorative, registered SVG worlds; semantic project content lives in the parent DOM. */
export function ProjectWorld({ project, idPrefix, mobile = false, open = false }: ProjectWorldProps) {
  if (project === "novel") return (
    <g data-project-world="novel">
      <image href={`${import.meta.env.BASE_URL}images/visual-novel.jpg`} x="0" y="0" width={mobile ? 660 : 1320} height="660" preserveAspectRatio={mobile ? "xMinYMid slice" : "xMidYMid slice"} />
    </g>
  );

  return <g className="pw-world" data-project-world={project} data-open={open} fontFamily="Manrope, Arial, sans-serif">
    {project === "market" ? <MarketWorld mobile={mobile} idPrefix={idPrefix} /> : <ArfiWorld mobile={mobile} />}
  </g>;
}

function ArfiWorld({ mobile }: { mobile: boolean }) {
  if (mobile) return <>
    <rect width="660" height="660" fill={cream} />
    <rect width="660" height="80" fill="#e5e8de" />
    <rect x="30" y="20" width="42" height="42" rx="10" fill={ink} />
    <text x="51" y="50" textAnchor="middle" fill={mint} fontSize="34" fontFamily="Georgia, serif" fontStyle="italic">a</text>
    <rect x="32" y="234" width="596" height="165" fill={mint} />
    <rect x="32" y="234" width="12" height="165" fill="#8ed3b8" />
    <path d="M32 418H628" stroke="#b5c4b7" />
    <g className="pw-motifs" fill={ink} fontWeight="650" letterSpacing="-3">
      <text x="30" y="194" fontSize="84">QUESTION</text>
      <text x="58" y="337" fontSize="78">EVIDENCE</text>
      <text x="30" y="561" fontSize="112">ANSWER</text>
    </g>
    <g className="pw-details">
      <text x="90" y="50" fill={ink} fontSize="28" fontWeight="700">Arfi</text>
      <text x="628" y="49" textAnchor="end" fill={secondary} fontSize="22">Internal work</text>
      <text x="32" y="122" fill={secondary} fontSize="22" letterSpacing="1">QUESTION</text>
      <text x="32" y="164" fill={ink} fontSize="34" fontWeight="550" letterSpacing="-.8">Where can I find the</text>
      <text x="32" y="205" fill={ink} fontSize="34" fontWeight="550" letterSpacing="-.8">onboarding checklist?</text>
      <text x="60" y="267" fill={ink} fontSize="22">Retrieved document · Example guide</text>
      <text x="60" y="308" fill={ink} fontSize="28" fontWeight="500">“The onboarding checklist is in</text>
      <text x="60" y="343" fill={ink} fontSize="28" fontWeight="500">the team handbook, under</text>
      <text x="60" y="378" fill={ink} fontSize="28" fontWeight="500">Getting started.”</text>
      <text x="32" y="452" fill={secondary} fontSize="22" letterSpacing="1">GROUNDED ANSWER</text>
      <text x="32" y="491" fill={ink} fontSize="31" fontWeight="500" letterSpacing="-.6">You’ll find it in the team</text>
      <text x="32" y="531" fill={ink} fontSize="31" fontWeight="500" letterSpacing="-.6">handbook’s Getting started</text>
      <text x="32" y="571" fill={ink} fontSize="31" fontWeight="500" letterSpacing="-.6">section.</text>
      <text x="32" y="608" fill={secondary} fontSize="23">Source: Example guide</text>
      <text x="32" y="644" fill={secondary} fontSize="22">Illustrative preview · Synthetic data</text>
    </g>
  </>;

  return <>
    <rect width="1320" height="660" fill={cream} />
    <rect width="1320" height="107" fill="#e5e8de" />
    <rect x="55" y="28" width="52" height="52" rx="13" fill={ink} />
    <text x="81" y="65" fill={mint} textAnchor="middle" fontSize="43" fontFamily="Georgia, serif" fontStyle="italic">a</text>
    <path d="M55 107H1260M56 313H456M55 393H1260" fill="none" stroke="#bac5b7" />
    <circle cx="483" cy="313" r="5" fill="#517761" />
    <path d="M497 313H573V261H626M616 254L626 261L616 268" fill="none" stroke="#517761" strokeWidth="2" />
    <rect x="659" y="145" width="599" height="210" fill={mint} />
    <rect x="659" y="145" width="38" height="210" fill="#8ed3b8" />
    <path d="M673 170H683M673 178H683M673 186H680" fill="none" stroke={ink} strokeWidth="1.5" />
    <circle cx="81" cy="443" r="26" fill={ink} />
    <text x="81" y="456" fill={mint} textAnchor="middle" fontSize="35" fontFamily="Georgia, serif" fontStyle="italic">a</text>
    <g className="pw-motifs" fill={ink} fontWeight="650" letterSpacing="-4">
      <text x="53" y="273" fontSize="102">QUESTION</text>
      <text x="720" y="285" fontSize="87">EVIDENCE</text>
      <text x="126" y="567" fontSize="164">ANSWER</text>
    </g>
    <g className="pw-details">
      <text x="125" y="62" fill={ink} fontSize="28" fontWeight="700">Arfi</text>
      <text x="187" y="62" fill={secondary} fontSize="21">Knowledge assistant</text>
      <text x="1260" y="62" fill={secondary} textAnchor="end" fontSize="17">Internal work</text>
      <text x="56" y="159" fill={secondary} fontSize="17" letterSpacing="2">QUESTION</text>
      <text x="55" y="215" fill={ink} fontSize="39" fontWeight="550" letterSpacing="-1.3">Where can I find the</text>
      <text x="55" y="265" fill={ink} fontSize="39" fontWeight="550" letterSpacing="-1.3">onboarding checklist?</text>
      <text x="722" y="182" fill={ink} fontSize="17" letterSpacing="1.1">RETRIEVED DOCUMENT</text>
      <text x="722" y="213" fill="#365845" fontSize="19">Example guide</text>
      <text x="722" y="259" fill={ink} fontSize="26" fontWeight="500">“The onboarding checklist is in the</text>
      <text x="722" y="297" fill={ink} fontSize="26" fontWeight="500">team handbook, under Getting started.”</text>
      <text x="128" y="438" fill={secondary} fontSize="17" letterSpacing="2">GROUNDED ANSWER</text>
      <text x="128" y="490" fill={ink} fontSize="34" fontWeight="500" letterSpacing="-.75">You’ll find it in the team handbook’s</text>
      <text x="128" y="536" fill={ink} fontSize="34" fontWeight="650" letterSpacing="-.75">Getting started section.</text>
      <text x="128" y="578" fill={secondary} fontSize="18">Source: Example guide</text>
      <text x="1260" y="629" textAnchor="end" fill={secondary} fontSize="18">Illustrative preview · Synthetic data</text>
    </g>
  </>;
}

function MarketWorld({ mobile, idPrefix }: { mobile: boolean; idPrefix: string }) {
  const arrow = `${idPrefix}-analytical-arrow`;
  const width = mobile ? 660 : 1320;
  return <>
    <defs><marker id={arrow} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="M2 2L10 6L2 10" fill="none" stroke={mint} strokeWidth="1.5" /></marker></defs>
    <rect width={width} height="660" fill="#314b3f" />
    <path d={`M0 330H${width}`} stroke="#617d6d" strokeWidth="1" />
    {mobile ? <>
      <g className="pw-details"><text x="32" y="52" fill={cream} fontSize="28" fontWeight="650">Poly Predictor Kit</text></g>
      <text x="32" y="116" fill={mint} fontSize="23" letterSpacing="1">01 / MARKET CONTEXT</text>
      <rect x="32" y="159" width="161" height="127" fill={cream} />
      <rect x="261" y="159" width="160" height="127" fill={mint} />
      <path d="M193 223H247" stroke={mint} strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <path d="M421 223H449" stroke={mint} strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="49" y="212" fill={ink} fontSize="29" fontWeight="650">Market</text>
      <text x="49" y="251" fill={ink} fontSize="29" fontWeight="650">data</text>
      <text x="341" y="234" textAnchor="middle" fill={ink} fontSize="31" fontWeight="650">Gemini</text>
      <text x="465" y="213" fill={cream} fontSize="28" fontWeight="550">Market</text>
      <text x="465" y="251" fill={cream} fontSize="28" fontWeight="550">summary</text>
      <text x="32" y="386" fill={mint} fontSize="23" letterSpacing="1">02 / COMMUNITY DISCUSSION</text>
      <rect x="32" y="421" width="161" height="146" fill={cream} />
      <rect x="261" y="421" width="170" height="146" fill="none" stroke={mint} strokeWidth="2" />
      <path d="M193 494H247" stroke={mint} strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <path d="M431 494H452" stroke={mint} strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="46" y="505" fill={ink} fontSize="27" fontWeight="650">Comments</text>
      <text x="346" y="466" textAnchor="middle" fill={mint} fontSize="27" fontWeight="550">TF-IDF</text>
      <text x="346" y="505" textAnchor="middle" fill={cream} fontSize="24" fontWeight="550">Logistic</text>
      <text x="346" y="537" textAnchor="middle" fill={cream} fontSize="24" fontWeight="550">regression</text>
      <text x="465" y="505" fill={cream} fontSize="27" fontWeight="550">Categories</text>
      <g className="pw-details"><text x="32" y="625" fill="#bdcfbf" fontSize="23">Two separate pipelines.</text></g>
    </> : <>
      <g className="pw-details"><text x="68" y="58" fill={cream} fontSize="25" fontWeight="650">Poly Predictor Kit</text></g>
      <g className="pw-details"><text x="1252" y="58" textAnchor="end" fill="#bdcfbf" fontSize="19" letterSpacing="2">TWO SEPARATE PIPELINES</text></g>
      <text x="68" y="133" fill={mint} fontSize="30" letterSpacing="1">01 / MARKET CONTEXT</text>
      <rect x="68" y="174" width="293" height="123" fill={cream} />
      <rect x="535" y="174" width="254" height="123" fill={mint} />
      <path d="M361 235H521" stroke={mint} strokeWidth="3" markerEnd={`url(#${arrow})`} />
      <path d="M789 235H973" stroke={mint} strokeWidth="3" markerEnd={`url(#${arrow})`} />
      <text x="94" y="249" fill={ink} fontSize="39" fontWeight="650" letterSpacing="-1">Market data</text>
      <text x="662" y="250" textAnchor="middle" fill={ink} fontSize="47" fontWeight="650" letterSpacing="-1.6">Gemini</text>
      <text x="1001" y="224" fill={cream} fontSize="37" fontWeight="550" letterSpacing="-.7">Market</text>
      <text x="1001" y="270" fill={cream} fontSize="37" fontWeight="550" letterSpacing="-.7">summary</text>
      <text x="68" y="401" fill={mint} fontSize="30" letterSpacing="1">02 / COMMUNITY DISCUSSION</text>
      <rect x="68" y="444" width="293" height="128" fill={cream} />
      <rect x="485" y="444" width="372" height="128" fill="none" stroke={mint} strokeWidth="2" />
      <path d="M361 508H471" stroke={mint} strokeWidth="3" markerEnd={`url(#${arrow})`} />
      <path d="M857 508H973" stroke={mint} strokeWidth="3" markerEnd={`url(#${arrow})`} />
      <text x="94" y="522" fill={ink} fontSize="39" fontWeight="650" letterSpacing="-1">Comments</text>
      <text x="671" y="490" textAnchor="middle" fill={mint} fontSize="31" fontWeight="600">TF-IDF</text>
      <text x="671" y="538" textAnchor="middle" fill={cream} fontSize="33" fontWeight="550" letterSpacing="-.7">Logistic regression</text>
      <text x="1001" y="521" fill={cream} fontSize="37" fontWeight="550" letterSpacing="-.7">Categories</text>
      <g className="pw-details"><text x="68" y="630" fill="#bdcfbf" fontSize="21">Separate pipelines. Two ways to understand a market.</text></g>
    </>}
  </>;
}
