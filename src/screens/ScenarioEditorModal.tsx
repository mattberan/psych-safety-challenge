import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Round } from '../data/rounds'

const POINTS = [500, 400, 300, 200, 100]

interface Props {
  initial?: Round
  onSave: (round: Omit<Round, 'id'>) => void
  onClose: () => void
}

type AnswerDraft = { text: string; insight: string }

const emptyAnswer = (): AnswerDraft => ({ text: '', insight: '' })

export function ScenarioEditorModal({ initial, onSave, onClose }: Props) {
  const [category, setCategory] = useState(initial?.category ?? '')
  const [scenario, setScenario] = useState(initial?.scenario ?? '')
  const [context, setContext] = useState(initial?.context ?? 'We surveyed employees: ')
  const [facilitatorNote, setFacilitatorNote] = useState(initial?.facilitatorNote ?? '')
  const [answers, setAnswers] = useState<AnswerDraft[]>(
    initial?.answers.map(a => ({ text: a.text, insight: a.insight })) ??
    Array.from({ length: 5 }, emptyAnswer)
  )

  const updateAnswer = (i: number, field: keyof AnswerDraft, val: string) => {
    setAnswers(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: val } : a))
  }

  const canSave = category.trim() && scenario.trim() && answers[0].text.trim()

  const handleSave = () => {
    if (!canSave) return
    onSave({
      category: category.trim(),
      scenario: scenario.trim(),
      context: context.trim(),
      facilitatorNote: facilitatorNote.trim(),
      answers: answers.map((a, i) => ({
        text: a.text.trim(),
        insight: a.insight.trim(),
        points: POINTS[i],
      })),
    })
  }

  const inputStyle = {
    width: '100%', background: 'var(--surface2)',
    border: '1px solid var(--border-hover)',
    borderRadius: '8px', padding: '10px 14px',
    fontSize: '14px', color: 'var(--text-primary)',
    outline: 'none', resize: 'vertical' as const,
    fontFamily: 'inherit',
  }

  const labelStyle = {
    fontSize: '11px', fontWeight: 700 as const,
    color: 'var(--text-muted)', textTransform: 'uppercase' as const,
    letterSpacing: '0.08em', marginBottom: '6px', display: 'block',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)', border: '1px solid var(--border-hover)',
          borderRadius: '16px', padding: '32px',
          width: '100%', maxWidth: '680px',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              {initial ? 'Edit Scenario' : 'New Custom Scenario'}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {initial ? initial.category : 'Create your scenario'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '22px', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Category */}
          <div>
            <label style={labelStyle}>Category (short label)</label>
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. When Things Go Wrong" style={{ ...inputStyle, resize: 'none' }} />
          </div>

          {/* Scenario */}
          <div>
            <label style={labelStyle}>Scenario</label>
            <textarea value={scenario} onChange={e => setScenario(e.target.value)} rows={3} placeholder="Describe the workplace situation..." style={inputStyle} />
          </div>

          {/* Context question */}
          <div>
            <label style={labelStyle}>Survey question (shown on board)</label>
            <input value={context} onChange={e => setContext(e.target.value)} placeholder="We surveyed employees: ..." style={{ ...inputStyle, resize: 'none' }} />
          </div>

          {/* Answers */}
          <div>
            <label style={labelStyle}>Answers — #1 is most preferred, #5 is least</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {answers.map((answer, i) => (
                <div key={i} style={{
                  background: 'var(--bg)', border: '1px solid var(--border-hover)',
                  borderRadius: '10px', padding: '14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                      background: i === 0 ? 'var(--amber)' : i === 1 ? 'var(--amber)' : i === 2 ? '#3B82F6' : '#6B7280',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 900, color: '#000',
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {POINTS[i]} pts {i === 0 ? '· Most preferred' : i === 4 ? '· Least preferred' : ''}
                    </span>
                  </div>
                  <input
                    value={answer.text}
                    onChange={e => updateAnswer(i, 'text', e.target.value)}
                    placeholder={`Answer #${i + 1} — what the manager says or does`}
                    style={{ ...inputStyle, marginBottom: '8px', resize: 'none' }}
                  />
                  <input
                    value={answer.insight}
                    onChange={e => updateAnswer(i, 'insight', e.target.value)}
                    placeholder="Why employees rank it this way (shown after reveal)"
                    style={{ ...inputStyle, resize: 'none', fontSize: '13px' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Facilitator note */}
          <div>
            <label style={labelStyle}>Facilitator Note (discussion prompt)</label>
            <textarea value={facilitatorNote} onChange={e => setFacilitatorNote(e.target.value)} rows={2} placeholder="What to watch for, common mistakes, discussion prompts..." style={inputStyle} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <button onClick={onClose} style={{
            flex: 1, background: 'var(--surface2)', border: '1px solid var(--border-hover)',
            borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 600,
            color: 'var(--text-secondary)',
          }}>
            Cancel
          </button>
          <motion.button
            whileHover={canSave ? { filter: 'brightness(1.1)' } : {}}
            whileTap={canSave ? { scale: 0.97 } : {}}
            onClick={handleSave}
            disabled={!canSave}
            style={{
              flex: 2, background: canSave ? 'var(--amber)' : 'var(--surface2)',
              border: 'none', borderRadius: '8px', padding: '12px',
              fontSize: '15px', fontWeight: 800,
              color: canSave ? '#000' : 'var(--text-muted)',
            }}
          >
            {initial ? 'Save Changes →' : 'Add Scenario →'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
