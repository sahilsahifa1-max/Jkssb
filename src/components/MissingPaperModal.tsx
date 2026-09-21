import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, CheckCircle2, AlertCircle, FilePlus } from 'lucide-react';
import { YEARS, SUBJECTS } from '../data/papers';

interface MissingPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const MissingPaperModal: React.FC<MissingPaperModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [subject, setSubject] = useState('mathematics');
  const [year, setYear] = useState('2024');
  const [examName, setExamName] = useState('');
  const [paperLink, setPaperLink] = useState('');
  const [studentNote, setStudentNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!examName.trim()) {
      onToast('Please provide the exam or post name', 'error');
      return;
    }

    // Prepare mailto link as transparent static contact mechanism
    const subjectLine = encodeURIComponent(`[JKSSB Paper Submission] ${subject.toUpperCase()} - ${year} - ${examName}`);
    const bodyText = encodeURIComponent(
      `Subject: ${subject}\nYear: ${year}\nExam/Post Name: ${examName}\nGoogle Drive or File Link: ${paperLink || 'Not provided'}\nStudent Notes: ${studentNote || 'None'}\n\nSubmitted via JKSSB Papers Archive.`
    );
    const mailtoUrl = `mailto:tariqahmadnengroo9622@gmail.com?subject=${subjectLine}&body=${bodyText}`;

    // Open email client safely
    window.location.href = mailtoUrl;

    setSubmitted(true);
    onToast('Thank you! Mail client opened to dispatch suggestion.', 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setExamName('');
    setPaperLink('');
    setStudentNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="missing-paper-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <FilePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="missing-paper-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                    Found a Missing Paper?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Help your fellow aspirants by suggesting or contributing verified question papers.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Year *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Exam Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Exam / Post / Cadre Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="e.g. Sub-Inspector 2024, VLW / Panchayat Secretary"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Drive or Cloud Link */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Public Google Drive / PDF Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={paperLink}
                    onChange={(e) => setPaperLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Any Additional Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    placeholder="Shift details, question paper series code, or answer key note..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Suggestion
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Suggestion Initiated!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto mb-5 leading-relaxed">
                Your email client was opened with the paper submission details. Submissions are reviewed for authenticity before being indexed into the archive.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 transition-colors"
              >
                Close Dialog
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
