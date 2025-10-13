import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TravelBlogs = () => {
  useEffect(() => {
    document.title = 'Travel Blogs | Tejesh Krishnammagari';
  }, []);

  const blogs = [
    {
      id: 1,
      title: 'Exploring the Himalayas',
      location: 'Himachal Pradesh, India',
      date: 'March 2024',
      description: 'A journey through the snow-capped mountains and serene valleys of the Himalayas.',
      image: '/lovable-uploads/02fbb8f6-1abc-4070-9228-1a4ac756417b.png'
    },
    {
      id: 2,
      title: 'Coastal Adventures',
      location: 'Goa, India',
      date: 'January 2024',
      description: 'Sun, sand, and sea - experiencing the vibrant culture and beaches of Goa.',
      image: '/lovable-uploads/4ecee192-1209-4c94-af7e-03e0516da815.png'
    },
    {
      id: 3,
      title: 'Urban Exploration',
      location: 'Mumbai, India',
      date: 'December 2023',
      description: 'Discovering the bustling streets and hidden gems of the city that never sleeps.',
      image: '/lovable-uploads/cab418db-d8d4-4f25-89d6-1280c19f9ac7.png'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-container py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-garamond font-semibold mb-4">Travel Stories</h1>
          <p className="text-lg text-muted-foreground">Exploring the world, one destination at a time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
      </div>
    </div>
  );
};

export default TravelBlogs;
