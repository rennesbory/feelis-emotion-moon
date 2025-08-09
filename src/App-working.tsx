import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Download, Play } from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { HowItWorks } from '@/components/HowItWorks'

// Import static assets
import feelisLogo from '@/assets/images/feelis_logo.png'

function App() {
  const [email, setEmail] = useState('')

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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    toast.success("Thanks! We'll notify you when Feelis launches.")
    setEmail('')
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center gap-3 font-bold text-lg"
            >
              <img 
                src={feelisLogo} 
                alt="Feelis logo" 
                className="w-9 h-9 rounded-xl"
              />
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
              <div className="hero-video-container">
                <div className="w-full aspect-[9/16] bg-muted rounded-[20px] flex flex-col items-center justify-center p-4">
                  <p className="text-muted-foreground text-center mb-2">Hero Video Coming Soon</p>
                  <p className="text-muted-foreground text-xs text-center opacity-70">
                    Beautiful Feelis preview
                  </p>
                </div>
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
              Breathe with Pearll, write down your feelings. Her cozy pastel world is like a warm hug for your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="gallery-video cursor-pointer group relative">
                <div className="w-full aspect-[9/16] bg-muted rounded-[20px] flex flex-col items-center justify-center p-4">
                  <p className="text-muted-foreground text-center mb-2">Gallery Video {index + 1}</p>
                  <p className="text-muted-foreground text-xs text-center opacity-70">
                    Emotion animation coming soon
                  </p>
                </div>
              </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
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
                <img 
                  src={feelisLogo} 
                  alt="Feelis logo" 
                  className="w-9 h-9 rounded-xl"
                />
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
    </div>
  )
}

export default App