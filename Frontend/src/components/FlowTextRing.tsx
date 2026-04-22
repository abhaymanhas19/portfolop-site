type RingProps={ text:string; radius?:number; size?:number; speedSec?:number; tiltDeg?:number; yPercent?:number; }
export default function FlowTextRing({ text, radius=280, size=48, speedSec=28, tiltDeg=36, yPercent=40 }:RingProps){
  const chars=Array.from(text.toUpperCase()).filter(Boolean); const sequence=Array.from({length:size},(_,i)=>chars[i%chars.length]); const step=360/size;
  return (<div className="ring3d" style={{pointerEvents:'none'}} aria-hidden>
    <div className="ring3d__belt" style={{ ['--rx' as any]: `${tiltDeg}deg`, top: `${yPercent}%` }}>
      <div className="ring3d__spin" style={{ ['--speed' as any]: `${speedSec}s` }}>
        {sequence.map((ch,i)=>(<span key={i} className="ring3d__char" style={{ ['--angle' as any]: `${i*step}deg`, ['--radius' as any]: `${radius}px` }}>{ch}</span>))}
      </div>
    </div>
  </div>)
}
