import { create } from 'zustand';

interface ProblemStore {
  problem: ResponseProblem | undefined;
  setProblem: (problem: ResponseProblem) => void;
}

const useProblemStore = create<ProblemStore>((set) => ({
  problem: undefined,
  setProblem: (problem) => set({ problem }),
}));

export default useProblemStore;
