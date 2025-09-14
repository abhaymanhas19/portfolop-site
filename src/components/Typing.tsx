
import { useEffect, useState } from 'react'

type Props = { words: string[]; speed?: number; pause?: number; className?: string }
export default function Typing({ words, speed = 60, pause = 1200, className = "" }: Props) {
  const [text, setText] = useState("")
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let t: any
    const full = words[i % words.length]
    if (!deleting && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === full.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(full.slice(0, text.length - 1)), Math.max(30, speed * 0.6))
    } else if (deleting && text.length === 0) {
      setDeleting(false); setI((v) => v + 1)
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, words, speed, pause])

  return <span className={"typing-caret " + className}>{text}</span>
}
