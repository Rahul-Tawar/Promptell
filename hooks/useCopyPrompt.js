import { useState, useCallback } from 'react';

export function useCopyFeedback() {
  const [copied, setCopied] = useState(false);
  const copyFn = useCallback((prompt) => {
    navigator.clipboard.writeText(prompt);
  },[]);

  const handleCopy = useCallback(() => {
    copyFn();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [copyFn]);

  return { copied, handleCopy };
}