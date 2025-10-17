import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface TravelBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    day: string;
    title: string;
    description: string;
    image?: string;
  }[];
}

const TravelBlogModal = ({ isOpen, onClose, title, content }: TravelBlogModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-garamond font-bold">{title}</DialogTitle>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-8 py-4">
            {content.map((page, index) => (
              <div key={index} className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-garamond font-semibold text-primary mb-1">
                    {page.day}
                  </h3>
                  <h4 className="text-lg font-garamond font-medium mb-3">{page.title}</h4>
                </div>
                {page.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {page.description}
                </p>
                {index < content.length - 1 && (
                  <div className="pt-6 border-b border-border"></div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TravelBlogModal;
