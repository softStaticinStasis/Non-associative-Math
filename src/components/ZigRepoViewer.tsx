import React, { useState } from 'react';
import { zigRepositoryFiles } from '../zigCodeTemplates';
import { FileCode, Download, Copy, Check, Folder, ChevronRight } from 'lucide-react';

export default function ZigRepoViewer() {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const activeFile = zigRepositoryFiles[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe file downloader for developers
  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Generate an aggregate instruction txt detailing the repo structure
    let combined = `==========================================================\n`;
    combined += `GEOMETRIC UNIFICATION OF GROUP THEORY - ZIG MATH REPOSITORY\n`;
    combined += `==========================================================\n\n`;
    
    zigRepositoryFiles.forEach(f => {
      combined += `--- FILE: ${f.path} ---\n`;
      combined += `Description: ${f.description}\n`;
      combined += `----------------------------------------------------------\n`;
      combined += f.content;
      combined += `\n\n`;
    });

    const blob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "group_theory_unification_repository.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#09090b] rounded-xl border border-[#27272a] p-5 flex flex-col h-full" id="zig-repo-viewer">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <div>
          <span className="text-[10px] tracking-widest font-mono text-[#71717a] uppercase font-medium">Built-in Math Source Repository</span>
          <h2 className="text-xl font-serif italic text-zinc-100 flex items-center gap-2">
            <FileCode size={20} className="text-[#c5a059]" />
            .zig Math Engine Sources
          </h2>
        </div>

        <button
          onClick={handleDownloadAll}
          className="self-start sm:self-auto flex items-center gap-2 py-1.5 px-3 bg-[#111113] hover:bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#c5a059] font-mono text-xs rounded transition active:scale-[0.98]"
        >
          <Download size={13} />
          Export Complete Repo (.txt)
        </button>
      </div>

      {/* Editor Body Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[400px]">
        {/* Left Side: Directory Explorer */}
        <div className="md:col-span-1 bg-black/40 rounded p-3 border border-[#27272a]/60 flex flex-col gap-1.5 h-full overflow-y-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#71717a] font-mono tracking-wider uppercase border-b border-[#27272a] pb-2 mb-2">
            <Folder size={12} className="text-[#71717a]" />
            Workspace Files
          </div>

          {zigRepositoryFiles.map((file, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left font-mono text-xs transition duration-200 ${
                  isActive
                    ? 'bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] font-semibold'
                    : 'bg-transparent border border-transparent text-[#71717a] hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <ChevronRight size={12} className={isActive ? "text-[#c5a059]" : "text-[#71717a]"} />
                <span className="truncate">{file.name}</span>
              </button>
            );
          })}

          <div className="mt-auto pt-4 border-t border-[#27272a]/60 flex flex-col gap-2">
            <div className="text-[10px] text-[#71717a] font-mono p-2 bg-black/20 rounded border border-[#27272a] leading-relaxed">
              <span className="font-semibold text-[#a1a1aa]">ZIG COMPATIBLE:</span> Requires compiler version <code className="text-[#a1a1aa] bg-[#111113] px-1 py-0.5 rounded">v0.11.x +</code>. Run via <code className="text-[#a1a1aa] bg-[#111113] px-1 py-0.5 rounded">zig build-exe main.zig</code>.
            </div>
          </div>
        </div>

        {/* Right Side: File Reader & Editor */}
        <div className="md:col-span-3 bg-[#050505] rounded border border-[#27272a] overflow-hidden flex flex-col h-full relative group">
          
          {/* File Header */}
          <div className="bg-[#111113] px-4 py-2 flex justify-between items-center border-b border-[#27272a]">
            <div className="flex flex-col">
              <span className="text-xs font-mono font-medium text-zinc-300">{activeFile.path}</span>
              <span className="text-[10px] text-[#71717a] max-w-lg truncate">{activeFile.description}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-1 px-2.5 bg-[#111113] hover:bg-[#18181b] rounded border border-[#27272a] text-[#a1a1aa] hover:text-[#d4d4d8] font-mono text-[11px] flex items-center gap-1.5 transition active:scale-[0.97]"
                title="Copy code to clipboard"
              >
                {copied ? <Check size={12} className="text-[#c5a059]" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              
              <button
                onClick={handleDownloadFile}
                className="p-1.5 bg-[#111113] hover:bg-[#18181b] rounded border border-[#27272a] text-[#a1a1aa] hover:text-[#d4d4d8] transition active:scale-[0.97]"
                title="Download single file"
              >
                <Download size={13} />
              </button>
            </div>
          </div>

          {/* Code Viewer Area */}
          <div className="flex-1 p-4 overflow-auto max-h-[420px] bg-black/10">
            <pre className="font-mono text-[#d4d4d8] text-xs leading-relaxed selection:bg-[#c5a059]/30 select-text font-medium text-left">
              {activeFile.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
