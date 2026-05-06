export interface Answer {
  text: string
  points: number
  insight: string
}

export interface Round {
  id: string
  category: string
  scenario: string
  context: string
  answers: Answer[] // ordered 1st (most preferred) to last
  facilitatorNote: string
}

export const rounds: Round[] = [
  {
    id: 'r1',
    category: 'When Things Go Wrong',
    scenario: 'Your top performer just sent a report with a major error to a client. They come to your office looking mortified.',
    context: 'We surveyed employees: What do you most want your manager to say first?',
    answers: [
      {
        text: '"Let\'s figure out what happened and fix it together."',
        points: 500,
        insight: 'Forward-focused + collaborative. Employees feel safe to own mistakes when the response is problem-solving, not judgment.',
      },
      {
        text: '"What do you need from me right now?"',
        points: 400,
        insight: 'Puts the employee in control of next steps. Signals trust and support without taking over.',
      },
      {
        text: '"It\'s okay — everyone makes mistakes."',
        points: 300,
        insight: 'Validating, but generic. Employees appreciate it yet feel it doesn\'t acknowledge the seriousness.',
      },
      {
        text: '"I\'ll take care of it."',
        points: 200,
        insight: 'Well-intentioned but disempowering. It removes ownership and signals the employee can\'t handle recovery.',
      },
      {
        text: '"This can\'t happen again."',
        points: 100,
        insight: 'Shame-based warning. Even as a statement of fact, it triggers fear — not learning. The lowest-trust response.',
      },
    ],
    facilitatorNote: 'The trap: tenured managers often jump to "I\'ll handle it" or "this can\'t happen again." Both feel decisive but shut down psychological safety.',
  },
  {
    id: 'r2',
    category: 'Public Disagreement',
    scenario: 'In a team meeting, a junior employee directly contradicts your recommendation in front of the whole group.',
    context: 'We surveyed employees: What response would make them most likely to speak up again in the future?',
    answers: [
      {
        text: '"That\'s an interesting angle — tell me more."',
        points: 500,
        insight: 'Invites elaboration without ceding or defending. Models intellectual curiosity over hierarchy.',
      },
      {
        text: 'Pause, genuinely consider their point, then respond.',
        points: 400,
        insight: 'The pause itself is powerful. It signals the employee\'s input actually changed your processing — not just your words.',
      },
      {
        text: '"I appreciate the pushback — let\'s explore both options."',
        points: 300,
        insight: 'Good! Though "pushback" subtly frames their input as opposition rather than contribution.',
      },
      {
        text: '"Let\'s take this offline."',
        points: 200,
        insight: 'Protects the manager\'s position publicly. Signals to the room that disagreement belongs in private — chills future input.',
      },
      {
        text: '"I hear you, but here\'s why my approach is right..."',
        points: 100,
        insight: '"I hear you, but" is heard as "I don\'t hear you." The team remembers what follows the "but."',
      },
    ],
    facilitatorNote: 'Senior managers often default to "let\'s take this offline" — it feels diplomatic but signals to the whole room that public disagreement is unwelcome.',
  },
  {
    id: 'r3',
    category: 'The Disengaged Star',
    scenario: 'Your highest performer has been missing deadlines and seems checked out. In your 1:1 they say "I\'m fine."',
    context: 'We surveyed employees: What response makes you most likely to open up?',
    answers: [
      {
        text: '"I\'ve noticed some changes — I\'m not calling you out, I\'m genuinely worried about you."',
        points: 500,
        insight: 'Names the observation without accusation. "Genuinely worried" signals relationship over performance.',
      },
      {
        text: '"You don\'t have to share anything — but I\'m here if that changes."',
        points: 400,
        insight: 'Removing pressure often creates more openness than applying it. Trust the employee to come forward.',
      },
      {
        text: '"What would make work feel better right now?"',
        points: 300,
        insight: 'Future-focused and actionable. Slightly risky if the employee isn\'t ready — but plants a seed.',
      },
      {
        text: '"Is there anything outside work I should know about?"',
        points: 200,
        insight: 'Well-meaning but crosses a boundary for many employees — feels like fishing for personal information.',
      },
      {
        text: '"Okay — let\'s talk about these missed deadlines then."',
        points: 100,
        insight: 'Pivots immediately to performance. The employee hears: "I\'m here to manage output, not you."',
      },
    ],
    facilitatorNote: 'High performers often disengage silently before they quit. The manager who pivots to deadlines after "I\'m fine" loses them within months.',
  },
  {
    id: 'r4',
    category: 'The Bad Idea',
    scenario: 'In a brainstorm, a team member proposes an idea that you\'re 90% sure won\'t work and will waste the team\'s time.',
    context: 'We surveyed employees: What response keeps people contributing ideas in the future?',
    answers: [
      {
        text: '"What problem are you most trying to solve with this?"',
        points: 500,
        insight: 'Surfaces the underlying need without dismissing the idea. Often reveals a valid problem even if the solution isn\'t right.',
      },
      {
        text: '"Let\'s put it on the board — what would we need to test it cheaply?"',
        points: 400,
        insight: 'Treats ideas as hypotheses. Low-cost validation beats confident dismissal, and keeps the contributor engaged.',
      },
      {
        text: '"Interesting — what do others think?"',
        points: 300,
        insight: 'Spreads evaluation to the group rather than the manager. Good — but can feel like deflection.',
      },
      {
        text: '"I like the thinking, but I\'m not sure the timing is right."',
        points: 200,
        insight: 'The classic hedge. Employees decode "not the right timing" as "no" — and next time, they don\'t bother.',
      },
      {
        text: '"We tried something like that before — it didn\'t work."',
        points: 100,
        insight: 'History-as-veto. Shuts down iteration with experience. The employee hears: "your ideas come second to my memory."',
      },
    ],
    facilitatorNote: '"We tried that before" is the single most idea-killing phrase in management. It\'s often said by the most experienced people in the room.',
  },
  {
    id: 'r5',
    category: 'Team Conflict',
    scenario: 'Two of your best people are in open conflict and it\'s affecting the whole team. You\'ve pulled them both in.',
    context: 'We surveyed employees: What does a manager do that makes this better — not worse?',
    answers: [
      {
        text: 'Listen to each person separately first, then bring them together with clear ground rules.',
        points: 500,
        insight: 'Separate first = each person feels heard before being asked to hear. Skipping this step is the #1 facilitation mistake.',
      },
      {
        text: '"I\'m not here to judge — I need us to figure out how we work together going forward."',
        points: 400,
        insight: 'Future-focused framing removes the courtroom dynamic. The goal is function, not fault.',
      },
      {
        text: 'Name the impact on the team without blaming either person.',
        points: 300,
        insight: 'Externalizes the problem — the team dynamic is the issue, not either individual. Reduces defensiveness.',
      },
      {
        text: '"I need you both to be professionals and move past this."',
        points: 200,
        insight: '"Be professional" is a dismissal disguised as a directive. It tells employees their conflict isn\'t worth your time.',
      },
      {
        text: 'Identify who\'s more at fault and address them directly.',
        points: 100,
        insight: 'Manager-as-judge creates a winner and loser. The "loser" disengages; the "winner" feels validated to continue the conflict.',
      },
    ],
    facilitatorNote: 'Most managers jump straight to the joint meeting. The most effective intervention is always separate conversations first.',
  },
  {
    id: 'r6',
    category: 'Delivering Hard Feedback',
    scenario: 'A solid team member asks you directly: "Am I on track for a promotion this cycle?" They\'re not.',
    context: 'We surveyed employees: What do you want most in this moment — even if it\'s hard to hear?',
    answers: [
      {
        text: '"Honestly — not this cycle. Here\'s what I\'m seeing and what would change that."',
        points: 500,
        insight: 'Direct honesty paired with a path forward. Employees rank this highest even though it hurts — because it respects their ability to handle truth.',
      },
      {
        text: '"I want to be honest with you — can I share what I\'m observing?"',
        points: 400,
        insight: 'Asks permission before delivering hard news. Creates a moment of agency and signals respect.',
      },
      {
        text: '"It\'s too early to say — a lot can happen this cycle."',
        points: 300,
        insight: 'Keeps hope alive but withholds what the manager already knows. Employees often sense the hedge — and trust erodes.',
      },
      {
        text: '"You\'re doing great — let\'s see how the next few months go."',
        points: 200,
        insight: 'False positive. The employee will be blindsided at review time and question every piece of positive feedback going forward.',
      },
      {
        text: '"That\'s really a conversation for the review cycle."',
        points: 100,
        insight: 'The dodge. Employees asked directly and were refused directly. They\'ll apply elsewhere before the review.',
      },
    ],
    facilitatorNote: 'The kindest thing a manager can do is tell people the truth early enough to change. Avoiding hard feedback isn\'t kindness — it\'s self-protection.',
  },
  {
    id: 'r7',
    category: 'Taking Credit',
    scenario: 'In an exec presentation, your manager presents your team\'s work and takes full credit — without naming anyone.',
    context: 'We surveyed team members: What does a psychologically safe manager do in this moment?',
    answers: [
      {
        text: 'Proactively name the team members who did the work in the meeting itself.',
        points: 500,
        insight: 'Visibility is currency. The most trusted managers pass credit upward constantly — it costs them nothing and earns enormous loyalty.',
      },
      {
        text: 'Debrief with the team afterward and acknowledge their contribution explicitly.',
        points: 400,
        insight: 'Better late than never. Private recognition still matters, even if the public moment passed.',
      },
      {
        text: 'Send a follow-up email to leadership naming contributors.',
        points: 300,
        insight: 'Creates a written record of contribution. Less visible but durable.',
      },
      {
        text: 'Nothing — it reflects well on the whole team anyway.',
        points: 200,
        insight: 'The rationalization. The team doesn\'t see it this way. They notice exactly who got named and who didn\'t.',
      },
      {
        text: 'It\'s not appropriate to interrupt the presentation.',
        points: 100,
        insight: 'Process compliance over people. Nothing stops a sentence: "This was driven by Sarah and Marcus." Nothing.',
      },
    ],
    facilitatorNote: 'This scenario hits hardest with senior managers — many have been the person taking credit without realizing it. The debrief conversation is often the most valuable part.',
  },
  {
    id: 'r8',
    category: 'The Mistake You Made',
    scenario: 'You made a call that set the team back two weeks. Your team knows it. You\'re in the weekly standup.',
    context: 'We surveyed employees: What does your manager say that most restores your trust in them?',
    answers: [
      {
        text: '"I made the wrong call on this. It cost us two weeks and that\'s on me — here\'s what I\'m doing differently."',
        points: 500,
        insight: 'Full ownership without hedging. Employees forgive mistakes — they don\'t forgive denial. This is the highest-trust response.',
      },
      {
        text: '"I\'d make a different decision with what I know now — and I want to hear what you saw that I missed."',
        points: 400,
        insight: 'Owns the miss AND invites input. Turns the failure into a learning loop — models the exact behavior you want from your team.',
      },
      {
        text: '"This didn\'t go the way I expected — let\'s talk about what we learned."',
        points: 300,
        insight: 'Partially owns it but softens with "didn\'t go as expected." The team will appreciate the candor but notice the hedge.',
      },
      {
        text: '"There were a lot of factors at play — here\'s the context."',
        points: 200,
        insight: 'Context before accountability. The team hears: defense first. Even if the context is valid, it lands as excuse-making.',
      },
      {
        text: '"Let\'s focus on moving forward — what do we need to do this week?"',
        points: 100,
        insight: 'Pivots past accountability entirely. The team respects the drive but feels the silence about the mistake — and learns that accountability is optional for leaders.',
      },
    ],
    facilitatorNote: 'This is the most powerful round. When a leader models public accountability for their own mistakes, psychological safety scores on their teams jump measurably within months.',
  },
]
