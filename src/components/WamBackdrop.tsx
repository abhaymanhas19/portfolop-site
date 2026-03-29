export default function WamBackdrop() {
  return (
    <div aria-hidden className="wam-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="wam-backdrop__aurora wam-backdrop__aurora--one" />
      <div className="wam-backdrop__aurora wam-backdrop__aurora--two" />
      <div className="wam-backdrop__pulse" />
      <div className="wam-backdrop__grain" />
    </div>
  )
}
