import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import nenthyaImage from '../assets/nenthya.jpeg';
import TravelBlogModal from '@/components/TravelBlogModal';
import { mongoliaStory } from '@/data/mongoliaStory';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const TravelBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Travel Blogs | Tejesh Krishnammagari';
  }, []);

  const blogs = [
    {
      id: 1,
      title: 'Mongolian Odyssey',
      location: 'Mongolia',
      date: 'September 2025',
      description:
        'A journey through the steppe and serene valleys of the Mongolia.',
      image: nenthyaImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-container py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-garamond font-bold mb-4">
            Travel Stories
          </h1>
          <p className="text-lg text-muted-foreground">
            Exploring the world, one destination at a time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-garamond">{blog.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2 mt-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {blog.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {blog.date}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{blog.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <TravelBlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Mongolian Odyssey"
          content={mongoliaStory}
        />
      </div>
    </div>
  );
};

export default TravelBlogs;
