/**
 * Shares the current page URL using the native Web Share API.
 * Provides a fallback to copying the link if the API is unsupported.
 * @param {string} [title] - Optional title for the shared content.
 * @param {string} [text] - Optional descriptive text for the shared content.
*/

import { toast } from "sonner";

export const shareCurrentPage = async (title = 'Check out this page!', text = 'Wow!!. Check out this blog post') => {
  // Get the current page URL
  const url = document.location.href;

  // 1. Check if the Web Share API is supported by the browser
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
      console.log('Page shared successfully');
    } catch (err: any) {
      // If the user cancels the share, an AbortError is typically thrown
      if (err.name !== "AbortError") {
        console.error('Error sharing:', err.message);
      }
    }
  } else {
    // 2. Fallback for browsers that don't support the native API
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied to clipboard!');
      console.log('Link copied to clipboard as a fallback.');
    } catch (err: any) {
      console.error('Fallback: Could not copy text: ', err.message);
      toast('Your browser does not support automatic sharing or copying. Please copy the URL manually.');
    }
  }
};
