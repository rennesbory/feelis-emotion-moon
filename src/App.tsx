import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Play, X, Download, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { HowItWorks } from '@/components/HowItWorks'
import heroVideo from '@/assets/video/emoly_intro_trim.mp4'

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxContent, setLightboxContent] = useState<{
    type: 'image' | 'video',
    src: string,
    alt?: string,
    index?: number
  } | null>(null)
  const [email, setEmail] = useState('')
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(-1)
  
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  // Gallery images - using placeholder URLs
  const galleryImages = [
    { src: 'https://picsum.photos/400/600?random=1', alt: 'Feelis onboarding' },
    { src: 'https://picsum.photos/400/600?random=2', alt: 'Breathing exercise' },
    { src: 'https://picsum.photos/400/600?random=3', alt: 'Emotion journaling' },
    { src: 'https://picsum.photos/400/600?random=4', alt: 'Daily prompts' },
    { src: 'https://picsum.photos/400/600?random=5', alt: 'Insights view' },
    { src: 'https://picsum.photos/400/600?random=6', alt: 'Calming visuals' },
  ]

  const features = [
    {
      title: 'Emotion Journaling',
      subtitle: 'Feelings in a Cozy Corner',
      description: 'Rest your feelings on a little cushion for the day—guided by gentle psychology.'
    },
    {
      title: 'Emotion Tracking',
      subtitle: 'Your Feelings, Gently Mapped',
      description: 'See the soft paths your emotions take, mapped with care and grounded in emotion science.'
    },
    {
      title: 'Gentle Reminders',
      subtitle: 'Little Moments, Big Calm',
      description: 'Even one mindful minute can ease your heart—rooted in simple, proven practices.'
    },
    {
      title: 'Daily Uplifting Words',
      subtitle: 'Tiny Words, Warm Lift',
      description: 'Small, cozy phrases crafted with a touch of positive psychology.'
    }
  ]

  const testimonials = [
    {
      quote: "In 60 seconds I go from spiraling to steady. It's shockingly kind.",
      author: "Beta user"
    },
    {
      quote: "The visuals make me want to breathe. My favorite ritual before bed.",
      author: "OTF fan (and now a Feelis fan)"
    },
    {
      quote: "No feeds, no noise. Just a tiny practice that actually sticks.",
      author: "Designer & mom"
    }
  ]

  const openLightbox = (content: typeof lightboxContent) => {
    setLightboxContent(content)
    setCurrentGalleryIndex(content?.index ?? -1)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxContent(null)
    setCurrentGalleryIndex(-1)
  }

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (currentGalleryIndex === -1) return
    
    const newIndex = direction === 'next' 
      ? (currentGalleryIndex + 1) % galleryImages.length
      : (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
    
    const newImage = galleryImages[newIndex]
    setLightboxContent({
      type: 'image',
      src: newImage.src,
      alt: newImage.alt,
      index: newIndex
    })
    setCurrentGalleryIndex(newIndex)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    // Simulate email signup
    toast.success("Thanks! We'll notify you when Feelis launches.")
    setEmail('')
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft' && currentGalleryIndex !== -1) {
        navigateGallery('prev')
      } else if (e.key === 'ArrowRight' && currentGalleryIndex !== -1) {
        navigateGallery('next')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentGalleryIndex])

  // Auto-pause hero video when out of view
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause()
          } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.play().catch(() => {})
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center gap-3 font-bold text-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                F
              </div>
              Feelis
            </button>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('features')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                How It Works
              </button>
              <button onClick={() => scrollToSection('gallery')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Gallery
              </button>
              <button onClick={() => scrollToSection('video')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Video
              </button>
              <Button 
                onClick={() => scrollToSection('download')}
                className="rounded-xl"
              >
                Get the App
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-18 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  A soft place for your feelings.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                A cozy little journaling hug for your heart, guided by Pearll.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('download')}
                  className="rounded-xl bg-accent hover:bg-accent/90"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download (iOS)
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('video')}
                  className="rounded-xl glass-card"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="glass-card px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  No sign-up required
                </span>
                <span className="glass-card px-4 py-2 rounded-full font-semibold">
                  Private by design
                </span>
                <span className="glass-card px-4 py-2 rounded-full font-semibold">
                  Tiny, daily wins
                </span>
              </div>
            </div>

            <div>
              <div className="device-frame rounded-3xl p-3 shadow-2xl">
                <video
                  ref={heroVideoRef}
                  className="w-full rounded-xl"
                  autoPlay
                  muted
                  playsInline
                  loop
                  poster="https://picsum.photos/300/600?random=7"
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Designed for gentle progress
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything in Feelis is crafted to help you show up for a minute, not a marathon. Tiny rituals compound into calm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3 opacity-90">
                  {feature.subtitle}
                </p>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A world that feels like a hug
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Soft 3D clay textures, pastel light, and a consistent character style make the journey inviting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="gallery-image cursor-pointer group"
                onClick={() => openLightbox({
                  type: 'image',
                  src: image.src,
                  alt: image.alt,
                  index
                })}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="device-frame rounded-3xl p-3 shadow-2xl">
              <video
                className="w-full rounded-xl"
                controls
                playsInline
                poster="https://picsum.photos/400/600?random=8"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                See Feelis in motion
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A short walkthrough of the breathing loop, emotion prompts, and the cozy visual system that makes you want to come back.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => openLightbox({
                    type: 'video',
                    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                  })}
                  className="rounded-xl"
                >
                  Open in Lightbox
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('features')}
                  className="rounded-xl glass-card"
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              People are feeling it
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card p-6">
                <blockquote className="text-lg mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-sm font-semibold text-muted-foreground not-italic">
                  — {testimonial.author}
                </cite>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get Feelis
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Launching soon on the App Store. Add your email and we'll ping you on day one.
          </p>

          <form onSubmit={handleEmailSubmit} className="glass-card p-4 rounded-2xl flex gap-3 items-center mb-6">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-0 bg-transparent"
              required
            />
            <Button type="submit" className="rounded-xl">
              Notify Me
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="glass-card px-4 py-2 rounded-full font-semibold">
              iPhone & iPad
            </span>
            <span className="glass-card px-4 py-2 rounded-full font-semibold">
              Made in LA
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t glass-card py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 font-bold text-lg mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  F
                </div>
                Feelis
              </div>
              <p className="text-muted-foreground mb-4">
                A tiny, lovely ritual for calmer days. Built with intention by BRDY Studios.
              </p>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BRDY Studios. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('features')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('gallery')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                </button>
                <button onClick={() => scrollToSection('video')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Video
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:hello@brdystudios.com" className="block text-muted-foreground hover:text-foreground transition-colors">
                  hello@brdystudios.com
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          <div className="relative">
            <Button
              size="icon"
              variant="outline"
              className="absolute -top-12 -right-12 rounded-full bg-white hover:bg-gray-100 z-10"
              onClick={closeLightbox}
            >
              <X className="w-4 h-4" />
            </Button>

            {currentGalleryIndex !== -1 && (
              <>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 z-10"
                  onClick={() => navigateGallery('prev')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 z-10"
                  onClick={() => navigateGallery('next')}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {lightboxContent?.type === 'image' && (
              <img
                src={lightboxContent.src}
                alt={lightboxContent.alt || ''}
                className="max-w-full max-h-[88vh] rounded-2xl"
              />
            )}

            {lightboxContent?.type === 'video' && (
              <video
                src={lightboxContent.src}
                controls
                autoPlay
                className="max-w-full max-h-[88vh] rounded-2xl"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App