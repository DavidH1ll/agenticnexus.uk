export default function Holding() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        {/* Status indicator */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          <span>Under Construction</span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          David Hill
        </h1>
        <p className="mb-12 font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Systems Architect &nbsp;|&nbsp; Information Security Leader
        </p>

        {/* Message */}
        <div className="mb-12 border-l-2 border-accent pl-5">
          <p className="text-lg leading-relaxed text-text">
            agenticnexus.uk is being built. The full site — agentic
            architecture, security research, and field journal — will
            be live shortly.
          </p>
        </div>

        {/* System info block */}
        <div className="mb-12 rounded-md border border-border bg-slate p-5 font-mono text-xs leading-relaxed">
          <div className="mb-2 flex justify-between">
            <span className="text-muted">node</span>
            <span className="text-emerald">agenticnexus.uk</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-muted">status</span>
            <span className="text-amber">provisioning</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-muted">build</span>
            <span className="text-text">in_progress</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">eta</span>
            <span className="text-text">soon</span>
          </div>
        </div>

        {/* Contact */}
        <p className="font-mono text-xs text-muted">
          In the meantime:{' '}
          <a
            href="mailto:hello@agenticnexus.uk"
            className="text-text transition-colors hover:text-accent"
          >
            hello@agenticnexus.uk
          </a>
        </p>
      </div>
    </main>
  )
}
