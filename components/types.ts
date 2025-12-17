export const STATUSES = [
  { id: 'todo', label: 'To do' },
  { id: 'doing', label: 'I gang' },
  { id: 'review', label: 'Til review' },
  { id: 'done', label: 'Færdig' },
] as const;

export type StatusColumn = typeof STATUSES[number];
export type StatusId = StatusColumn['id'];

export type Card = {
  id: string;
  title: string;
  description?: string;
  status: StatusId;
};
