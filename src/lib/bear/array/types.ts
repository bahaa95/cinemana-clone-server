export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type Options = {
  mutate?: boolean;
};
