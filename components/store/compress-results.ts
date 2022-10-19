import { atom } from "jotai";

export type CompressResults = {
  originalSize: number;
  improvedSize: number;
  zipHash: string;
};

export const compressResultsAtom = atom<CompressResults | null>(null);
