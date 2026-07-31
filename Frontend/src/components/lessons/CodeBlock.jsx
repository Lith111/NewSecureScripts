import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

export default function CodeBlock({ code, language = 'javascript', title }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-200 bg-slate-900 my-5 group">
      {/* شريط عنوان أنيق */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm" />
          </div>
          <Code2 className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-mono font-medium text-slate-400 tracking-wide">
            {title || language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            copied
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20'
              : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-600/50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              نسخت!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              نسخ الكود
            </>
          )}
        </button>
      </div>

      {/* محتوى الكود */}
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0 0 1rem 1rem',
          fontSize: '0.85rem',
          background: '#0f172a',
          lineHeight: '1.7',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}