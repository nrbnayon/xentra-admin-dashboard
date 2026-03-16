"use client";

import TranslatedText from "@/components/Shared/TranslatedText";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  content: string;
  setContent: (val: string) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSave: () => void;
}

export default function PolicyModal({
  isOpen,
  onClose,
  title,
  description,
  content,
  setContent,
  isEditing,
  setIsEditing,
  onSave,
}: PolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col">
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#1F2937]">
              <TranslatedText text={title} />
            </h2>
            <p className="text-sm text-[#4B5563] font-medium">
              <TranslatedText text={description} />
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[400px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none font-sans"
            />
          ) : (
            <div className="space-y-4 text-sm text-[#4B5563] font-medium whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t border-gray-100 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 border border-gray-200 rounded-full font-bold text-[#4B5563] hover:bg-gray-50 transition-all cursor-pointer"
          >
            <TranslatedText text="Cancel" />
          </button>
          {isEditing ? (
            <button
              onClick={onSave}
              className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              <TranslatedText text="Save" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              <TranslatedText text="Edit" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
