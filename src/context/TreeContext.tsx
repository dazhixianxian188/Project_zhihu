import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { TreeElementKey } from '../types/tree';
import { createInitialTree, applyGrowthBehavior, summarizeGrowth } from '../engine/treeEngine';
import type { TreeState } from '../types/tree';

interface TreeCtx {
  state: TreeState;
  completeTask: (taskId: string, reward: TreeElementKey) => void;
  grow: (element: TreeElementKey, when?: string) => void;
  summary: string;
  latestEventTitle: string | null;
}

const Ctx = createContext<TreeCtx | null>(null);

export function TreeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TreeState>(() => createInitialTree());

  const grow = (element: TreeElementKey, when = '今天') => {
    setState((s) => applyGrowthBehavior(s, element, when));
  };

  const completeTask = (taskId: string, reward: TreeElementKey) => {
    setState((s) => {
      if (s.completedTasks.includes(taskId)) return s;
      const next = applyGrowthBehavior(s, reward, '今天');
      return { ...next, completedTasks: [...next.completedTasks, taskId] };
    });
  };

  const summary = useMemo(() => summarizeGrowth(state), [state]);
  const latestEventTitle = state.growthEvents[0]?.title ?? null;

  return (
    <Ctx.Provider value={{ state, completeTask, grow, summary, latestEventTitle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTree() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTree must be used within TreeProvider');
  return ctx;
}
