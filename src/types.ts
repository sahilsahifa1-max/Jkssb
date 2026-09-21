export type SubjectId = 'mathematics' | 'science' | 'english' | 'sst' | 'urdu';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  shortName: string;
  code: string;
  description: string;
  folderUrl: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  accentGradient: string;
  availableYears: number[];
}

export interface QuestionPaper {
  id: string;
  title: string;
  subject: SubjectId;
  subjectName: string;
  year: number;
  exam: string;
  department: string;
  type: string;
  driveUrl: string; // Google Drive folder or specific link
  folderUrl: string; // User-provided verified subject drive folder
  tags: string[];
  verified: boolean;
  fileFormat: 'PDF Archive' | 'Drive Folder' | 'Document';
  language: string;
  notes?: string;
  availability: 'Available' | 'Drive Archive' | 'Pending Verification';
}

export interface FilterState {
  searchQuery: string;
  year: number | 'all';
  subject: SubjectId | 'all';
  exam: string | 'all';
  verifiedOnly?: boolean;
}

export interface NavRoute {
  view: 'home' | 'papers' | 'subject' | 'year' | 'paper-detail' | 'about' | 'contact' | '404';
  subject?: SubjectId | 'all';
  year?: number | 'all';
  paperId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
