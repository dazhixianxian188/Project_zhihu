import { useState } from 'react';
import { useStage } from '../../../context/StageContext';
import { useTree } from '../../../context/TreeContext';
import { ZhiYa } from '../../../components/ZhiYa';
import { STAGE_PROFILES } from '../../../types';
import './Assistant.css';

/**
 * AI 助手「和知护聊聊」—— 不是普通 ChatGPT 复制品。
 * 随成长阶段改变语气：低龄陪伴式 / 青少年分析式 / 大学生决策支持式。
 * 知芽作为视觉陪伴在旁。
 */
export function Assistant() {
  const { stage } = useStage();
  const { grow } = useTree();
  const profile = STAGE_PROFILES[stage];

  const opening =
    stage === 'A' ? '我可以陪你一起看看。遇到什么事都可以告诉我，我们一起想办法。'
    : stage === 'B' ? '我们可以一起分析一下。你想聊聊信息、网络交往，还是最近的学习状态？'
    : '我可以帮你梳理现有信息，并提供几个可选方案，最终由你来判断。';

  const [messages, setMessages] = useState<{ from: 'ai' | 'me'; text: string }[]>([
    { from: 'ai', text: opening },
  ]);
  const [input, setInput] = useState('');
  const [thanked, setThanked] = useState(false);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply =
      stage === 'A'
        ? '我明白你的感受。我们不急着下结论，先一起看看这件事是怎么回事，好吗？'
        : stage === 'B'
        ? '这是个值得想一想的问题。你觉得这里面哪些是事实，哪些是别人的观点或情绪？'
        : '从你提供的信息看，可以从证据、来源和上下文几个角度梳理。我整理了几个方向，供你权衡：①核对原始出处；②交叉验证；③区分事实与观点。';
    setMessages((m) => [...m, { from: 'me', text }, { from: 'ai', text: reply }]);
    setInput('');
  };

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>和知护聊聊</h1>
        <p>你的成长陪伴助手。不替你做决定，而是帮你逐渐形成自己的判断。</p>
      </div>

      <div className="assist">
        <div className="assist__side zh-card">
          <ZhiYa form={profile.budForm} size={96} />
          <p className="assist__greeting">「{profile.greeting}」</p>
          <p className="assist__muted">知芽一直在旁边陪着你。</p>
          <button
            className="zh-btn-ghost"
            disabled={thanked}
            onClick={() => { grow('trunk'); setThanked(true); }}
          >
            {thanked ? '✓ 已记录一次主动调整' : '记录一次主动自我管理'}
          </button>
        </div>

        <div className="assist__chat zh-card">
          <div className="assist__messages">
            {messages.map((m, i) => (
              <div key={i} className={'assist__msg assist__msg--' + m.from}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="assist__input">
            <input
              className="zh-input"
              placeholder="说说你遇到的事……"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="zh-btn-primary" onClick={send}>发送</button>
          </div>
        </div>
      </div>
    </div>
  );
}
