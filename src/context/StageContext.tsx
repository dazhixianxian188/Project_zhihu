import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { GrowthStage } from '../types';
import { STAGE_PROFILES } from '../types';

interface StageCtx {
  stage: GrowthStage;
  setStage: (s: GrowthStage) => void;
}

const Ctx = createContext<StageCtx>({ stage: 'B', setStage: () => {} });

/** 将阶段画像映射到全局 CSS 变量，实现"切换阶段即改变页面视觉与信息密度" */
function applyStageTheme(stage: GrowthStage) {
  const p = STAGE_PROFILES[stage];
  const root = document.documentElement;
  root.style.setProperty('--zh-primary', p.theme.primary);
  root.style.setProperty('--zh-primary-soft', p.theme.primarySoft);
  root.style.setProperty('--zh-primary-dark', p.theme.primary);
  root.style.setProperty('--zh-accent', p.theme.accent);
  root.style.setProperty('--zh-density', String(p.theme.densityScale));
  root.setAttribute('data-stage', stage);
  root.setAttribute('data-density', p.density);
}

export function StageProvider({ children }: { children: ReactNode }) {
  const [stage, setStageState] = useState<GrowthStage>('B');

  useEffect(() => {
    applyStageTheme(stage);
  }, [stage]);

  const setStage = (s: GrowthStage) => setStageState(s);

  return <Ctx.Provider value={{ stage, setStage }}>{children}</Ctx.Provider>;
}

export function useStage() {
  return useContext(Ctx);
}
