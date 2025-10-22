import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BookPage {
  type: 'cover' | 'content';
  title?: string;
  content?: string;
  image?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'full';
}

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author: string;
  coverImage: string;
  pages: BookPage[];
}

const BookModal = ({ isOpen, onClose, title, author, coverImage, pages }: BookModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const allPages = [
    { type: 'cover' as const, title, author, coverImage },
    ...pages
  ];

  const goToNextPage = () => {
    if (currentPage < allPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCoverPage = () => (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4 border-amber-200 dark:border-amber-800">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-garamond font-bold text-foreground">
            {title}
          </h1>
          <p className="text-lg font-garamond text-muted-foreground italic">
            by {author}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContentPage = (page: BookPage, index: number) => (
    <div className="h-full flex flex-col bg-amber-50 dark:bg-amber-950 p-12 overflow-y-auto">
      <div className="flex-1 max-w-3xl mx-auto w-full space-y-6">
        {page.title && (
          <h2 className="text-3xl font-garamond font-bold text-foreground mb-6 text-center">
            {page.title}
          </h2>
        )}
        
        {page.image && page.imagePosition === 'top' && (
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img 
              src={page.image} 
              alt={page.title || 'Page illustration'}
              className="w-full h-80 object-contain"
            />
          </div>
        )}

        {page.image && page.imagePosition === 'full' && (
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img 
              src={page.image} 
              alt={page.title || 'Page illustration'}
              className="w-full h-[500px] object-contain"
            />
          </div>
        )}

        <div className="prose prose-amber dark:prose-invert max-w-none">
          {page.content && page.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed font-garamond text-foreground mb-4 text-justify first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none">
              {paragraph}
            </p>
          ))}
        </div>

        {page.image && (page.imagePosition === 'bottom' || page.imagePosition === 'right') && (
          <div className="rounded-lg overflow-hidden shadow-lg mt-6">
            <img 
              src={page.image} 
              alt={page.title || 'Page illustration'}
              className="w-full h-80 object-contain"
            />
          </div>
        )}
      </div>
      
      {/* Page number */}
      <div className="text-center mt-6 font-garamond text-muted-foreground">
        {index}
      </div>
    </div>
  );

  const currentPageData = allPages[currentPage];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 gap-0">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 bg-background p-2 shadow-lg"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Book content */}
        <div className="h-full relative bg-amber-50 dark:bg-amber-950">
          {currentPage === 0 ? renderCoverPage() : renderContentPage(currentPageData, currentPage)}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="bg-background shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm font-garamond text-muted-foreground bg-background px-4 py-2 rounded-full shadow-lg">
            Page {currentPage} of {allPages.length - 1}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === allPages.length - 1}
            className="bg-background shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;
