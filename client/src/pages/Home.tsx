import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowRight, AtSign, Check, CirclePlay, Facebook, LockKeyhole, Mail, Menu, MessageCircle, ShieldCheck, Sparkles, Twitter, X, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  ["01", "Explore free tips", "Start with the public updates and available platform information."],
  ["02", "Create account", "Register securely to continue through the membership pathway."],
  ["03", "Choose membership", "Review the available membership option before continuing."],
  ["04", "Access after verification", "Access opens after payment review and administrator verification."],
];

function BrandMark({ type }: { type: "magnum" | "toto" | "nine" | "hero" }) {
  if (type === "hero") return <div className="hero-mark"><span>4D</span><small>MY • POOLS</small><b>LIVE</b></div>;
  const asset = type === "magnum" ? "/manus-storage/magnum-logo_41c4bcc4.png" : type === "toto" ? "/manus-storage/toto-style-mark_dc1f04a3.png" : "/manus-storage/nine-lotto-mark_adfb7d22.png";
  return <div className={`brand-tile ${type}`}><img src={asset} alt={`${type} mark`} /></div>;
}

export default function Home() {
  const { user } = useAuth();
  const { data: dailyUpdate } = trpc.content.latestDailyUpdate.useQuery();
  const membershipRequest = trpc.membership.requestAccess.useMutation({
    onSuccess: () => toast.success("Your membership request has been submitted for review."),
    onError: () => toast.error("We could not submit the request right now. Please try again."),
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [proofOpen, setProofOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const handleContinue = () => {
    if (!user) { startLogin(); return; }
    membershipRequest.mutate({ plan: "vip" });
  };

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <header className="topbar">
        <button className="wordmark" onClick={() => scrollTo("top")} aria-label="Back to top">MALAYSIAN 4D6D.</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("top")}>Home</button><button onClick={() => scrollTo("free-tips")}>Free Tips</button><button onClick={() => scrollTo("results")}>Results</button><button onClick={() => scrollTo("performance")}>Performance</button><button onClick={() => scrollTo("vip")}>VIP</button>
        </nav>
        <div className="top-actions"><button className="signin" onClick={() => startLogin()}><LockKeyhole size={14} /> {user ? "Account" : "Sign In"}</button><button className="orange-btn small" onClick={() => scrollTo("vip")}>Get Started <ArrowRight size={15} /></button><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="float-logo logo-one"><BrandMark type="magnum" /></div><div className="float-logo logo-two"><BrandMark type="nine" /></div><div className="float-logo logo-three"><BrandMark type="toto" /></div><div className="hero-brand"><BrandMark type="hero" /></div>
          <div className="eyebrow"><Sparkles size={12} /> PRIVATE MEMBERSHIP EXPERIENCE</div><h1>1st Direct Win <span>1000%</span></h1><p className="hero-copy">Join our platform for top-tier predictions and daily updates. A focused membership experience built around a disciplined process and transparent proof media.</p>
          <div className="hero-actions"><button className="orange-btn" onClick={() => scrollTo("vip")}>Start Your Membership <ArrowRight size={17} /></button><button className="ghost-btn" onClick={() => setProofOpen(true)}><CirclePlay size={16} /> Watch Proof</button></div>
          <div className="promise-row"><span><Check /> Focused daily updates</span><span><Check /> A disciplined member flow</span><span><Check /> Clear access pathway</span></div>
        </section>

        <section className="steps-section section-pad" id="free-tips"><div className="section-kicker">A STRAIGHTFORWARD PATH</div><h2>How it works</h2><div className="steps-grid">{steps.map(([number, title, copy]) => <article className="step-card" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="proof-section section-pad" id="results"><div className="proof-copy"><div className="section-kicker">PROOF MEDIA</div><h2>See the process in action.</h2><p>Watch the supplied proof media before choosing your membership path.</p><button className="proof-preview" onClick={() => setProofOpen(true)}><CirclePlay size={28} /><span>SINGAPORE POOLS 4D6D <b>• Member proof</b></span></button></div><div className="proof-frame"><div className="scanline" /><div className="proof-frame-inner"><ShieldCheck size={31} /><span>MEMBER PROOF</span><strong>4D • VERIFIED</strong><small>Transparent process media</small></div></div></section>

        <section className="daily-section section-pad" id="performance"><div className="daily-image">{dailyUpdate?.imageUrl ? <img className="daily-upload" src={dailyUpdate.imageUrl} alt={dailyUpdate.title} /> : <img className="daily-upload" src="/manus-storage/daily-photo_7c027871.jpg" alt="Malaysian 4D6D daily update" />}</div><div><div className="section-kicker">DAILY PHOTO</div><h2>{dailyUpdate?.title ?? "Today’s daily update"}</h2><p>{dailyUpdate?.caption ?? "Today’s photo is now published. Check back tomorrow for the next daily update."}</p><div className="caption">MALAYSIAN 4D6D <b>• Daily update</b></div></div></section>

        <section className="member-section section-pad" id="vip"><div className="member-card"><div><div className="section-kicker">MEMBER ACCESS</div><h2>Ready to enter the membership flow?</h2><p>Use your account to continue through the available membership steps.</p></div><button className="orange-btn" onClick={handleContinue} disabled={membershipRequest.isPending}>{membershipRequest.isPending ? "Submitting…" : <>Continue <ArrowRight size={17} /></>}</button></div></section>

        <section className="connect-section section-pad"><div className="section-kicker">STAY CONNECTED</div><h2>Connect with us</h2><p>Follow the official profiles or contact us directly through WhatsApp and email.</p><div className="socials"><a href="https://facebook.com/profile.php?id=61592890808867" target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook</a><a href="https://x.com/IsmailHossenDx" target="_blank" rel="noreferrer"><Twitter size={17} /> X / Twitter</a><a href="https://www.youtube.com/@ProbashiVoicesymy" target="_blank" rel="noreferrer"><Youtube size={17} /> YouTube</a><a href="https://threads.com/@4d6dmktshe" target="_blank" rel="noreferrer"><AtSign size={17} /> Threads</a><a href="mailto:golapiloveyou557@gmail.com"><Mail size={17} /> Email</a><a href="https://wa.me/8801863211541" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp <b>+880 1863 211541</b></a><a href="https://wa.me/8801341926364" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp <b>+880 1341 926364</b></a></div></section>
      </main>

      <footer className="footer"><div className="wordmark">MALAYSIAN 4D6D.</div><p><b>Responsible use:</b> Membership content is informational only. Outcomes are not guaranteed, past results do not predict future results, and you should participate only within your own limits.</p><div className="footer-links"><button onClick={() => scrollTo("top")}>About</button><button onClick={() => alert("FAQ section coming soon.")}>FAQ</button><button onClick={() => scrollTo("vip")}>Contact</button></div><small>Made with Manus</small></footer>
      {proofOpen && <div className="modal-backdrop" onClick={() => setProofOpen(false)}><div className="proof-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setProofOpen(false)}><X /></button><CirclePlay size={48} /><h3>Member proof media</h3><p>Proof media will be available here when uploaded by the site owner.</p><button className="orange-btn" onClick={() => setProofOpen(false)}>Close</button></div></div>}
    </div>
  );
}
