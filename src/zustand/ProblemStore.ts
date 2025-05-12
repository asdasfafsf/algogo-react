import { create } from 'zustand';
import { Problem } from '@/type/Problem.type';

interface ProblemStore {
  problem: Problem | undefined;
  setProblem: (problem: Problem) => void;
}

const useProblemStore = create<ProblemStore>((set) => ({
  problem: undefined,
  setProblem: (problem) => set({ problem }),
}));

export default useProblemStore;
