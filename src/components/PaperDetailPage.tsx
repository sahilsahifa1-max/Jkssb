import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Share2, 
  Copy, 
  Check, 
  CheckCircle2, 
  FolderOpen, 
  Calendar, 
  BookOpen, 
  FileText, 
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { QuestionPaper, NavRoute, SubjectId } from '../types';
import { PAPERS, SUBJECTS } from '../data/papers';

interface PaperDetailPageProps {
  paper: QuestionPaper;
  onNavigate: (route: NavRoute) => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PaperDetailPage: React.FC<PaperDetailPageProps> = ({
  paper,
  onNavigate,
  onToast,
}) => {
  const [copied, setCopied] = useState(false);

  // Find related papers from the same subject or same year
  const relatedPapers = PAPERS.filter(
    (p) => p.id !== paper.id && (p.subject === paper.subject || p.year === paper.year)
  ).slice(0, 3);

  // Next and previous year paper in this subject
  const sameSubjectPapers = PAPERS.filter((p) => p.subject === paper.subject).sort((a, b) => b.year - a.year);
  const currentIndex = sameSubjectPapers.findIndex((p) => p.id === paper.id);
  const nextPaper = currentIndex > 0 ? sameSubjectPapers[currentIndex - 1] : null;
  const prevPaper = currentIndex < sameSubjectPapers.length - 1 ? sameSubjectPapers[currentIndex + 1] : null;

  const handleShareOrCopy = async () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: paper.title,
          text: `Check out this official question paper on JKSSB Papers:`,
          url: currentUrl,
        });
        onToast('Shared successfully!');
        return;
      } catch (err) {
        // user dismissed
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      onToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      onToast('Failed to copy URL', 'error');
    }
  };

  return (
    <article id={`paper-detail-${paper.id}`} className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back & Breadcrumb Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => onNavigate({ view: 'papers' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Papers
          </button>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-sky-600 dark:hover:text-sky-400 font-medium">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'subject', subject: paper.subject })} className="hover:text-sky-600 dark:hover:text-sky-400 font-medium capitalize">
              {paper.subjectName}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'year', year: paper.year })} className="hover:text-sky-600 dark:hover:text-sky-400 font-medium">
              {paper.year}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Question Paper
            </span>
          </nav>
        </div>

        {/* Paper Main Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xl shadow-slate-950/5 dark:shadow-black/30">
          
          {/* Header Metadata Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Year {paper.year}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {paper.subjectName}
            </span>
            {paper.isComingSoon ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Coming soon
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                2020–2025 Archive
              </span>
            )}
            {paper.verified && !paper.isComingSoon && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Drive Folder
              </span>
            )}
          </div>

          {/* Title H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
            {paper.displayTitle || `${paper.subjectName} — ${paper.year}`}
          </h1>

          {/* Archive Notice */}
          <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-3">
            {paper.isComingSoon
              ? '2026 papers will be indexed once examination cycles are completed.'
              : `Question paper available in the ${paper.subjectName} archive.`}
          </p>

          {/* Department & Description */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            Official question paper repository for {paper.exam} under the {paper.department}. Verified and accessible directly via Google Drive.
          </p>

          {/* Key Facts Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 mb-8 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-medium block">Year</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{paper.year}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-medium block">Subject</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{paper.subjectName}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-medium block">Archive Span</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">2020–2025</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-medium block">Source</span>
              <strong className="text-sm font-bold text-sky-600 dark:text-sky-400">Google Drive</strong>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 pb-6 border-b border-slate-100 dark:border-slate-800">
            {paper.isComingSoon ? (
              <span className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-center cursor-not-allowed">
                2026 Papers Coming Soon
              </span>
            ) : (
              <a
                href={paper.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-md shadow-sky-600/20 transition-all text-center uppercase tracking-wide"
              >
                <FolderOpen className="w-4 h-4" />
                <span>OPEN GOOGLE DRIVE ARCHIVE</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            )}

            <button
              onClick={handleShareOrCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share / Copy Link'}</span>
            </button>
          </div>

          {/* Notes & Verification Details */}
          {paper.notes && (
            <div className="mt-6 p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="font-semibold text-sky-800 dark:text-sky-300 block mb-1">
                Archival Note:
              </strong>
              {paper.notes}
            </div>
          )}

          {/* Drive Transparency Callout */}
          <div className="mt-5 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              This link directly opens the verified Google Drive folder repository for {paper.subjectName} (2020–2025 archive). You can view the question sheet, print questions, or download PDF files directly without any login wall.
            </p>
          </div>

        </div>

        {/* Previous / Next Navigation */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPaper ? (
            <button
              onClick={() => onNavigate({ view: 'paper-detail', paperId: prevPaper.id })}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">Previous Year Paper</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {prevPaper.title}
                </span>
              </div>
            </button>
          ) : <div />}

          {nextPaper ? (
            <button
              onClick={() => onNavigate({ view: 'paper-detail', paperId: nextPaper.id })}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-right transition-colors flex items-center justify-end gap-3 ml-auto w-full"
            >
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">Next Year Paper</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {nextPaper.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
            </button>
          ) : <div />}
        </div>

        {/* Related Papers Section */}
        {relatedPapers.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Related Question Papers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPapers.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate({ view: 'paper-detail', paperId: rel.id })}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-400 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300">
                      {rel.year}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 mt-3 flex items-center gap-1">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
