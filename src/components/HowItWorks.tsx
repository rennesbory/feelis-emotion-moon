import { Card } from '@/components/ui/card'

// Step-by-step data with two images per step
const howItWorksSteps = [
  {
    step: "01",
    title: "Check In With Yourself",
    description: "Start by choosing the feeling that best represents your moment. Our beautiful, expressive characters make it easy to identify and acknowledge your emotions.",
    images: [
      {
        src: "https://picsum.photos/300/600?random=10",
        alt: "Emotion selection screen with character grid"
      },
      {
        src: "https://picsum.photos/300/600?random=11", 
        alt: "Character selection interface"
      }
    ]
  },
  {
    step: "02", 
    title: "Reflect in a Cozy Space",
    description: "Write as much or as little as you want. Our thoughtful, context-aware prompts help guide your reflection in a calm, pressure-free environment that adapts to your mood.",
    images: [
      {
        src: "https://picsum.photos/300/600?random=12",
        alt: "Journaling interface with gentle prompts"
      },
      {
        src: "https://picsum.photos/300/600?random=13",
        alt: "Writing screen with cozy background"
      }
    ]
  },
  {
    step: "03",
    title: "Discover Your Patterns", 
    description: "See your emotional world unfold through simple, beautiful charts. Understand your most frequent feelings and discover gentle insights over time.",
    images: [
      {
        src: "https://picsum.photos/300/600?random=14",
        alt: "Emotional patterns chart"
      },
      {
        src: "https://picsum.photos/300/600?random=15",
        alt: "Insights and analytics view"
      }
    ]
  }
]

interface StepProps {
  step: string
  title: string
  description: string
  images: Array<{
    src: string
    alt: string
  }>
  isReversed?: boolean
}

// Reusable Step component for each workflow step
function Step({ step, title, description, images, isReversed = false }: StepProps) {
  const flexDirection = isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'

  return (
    <div className={`flex flex-col ${flexDirection} items-center gap-12 lg:gap-24 my-16`}>
      {/* Text Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <span className="inline-block px-4 py-2 mb-4 text-sm font-bold text-primary bg-primary/10 rounded-full">
          Step {step}
        </span>
        <h3 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Side-by-side Images */}
      <div className="lg:w-1/2 w-full">
        <div className="flex gap-6 justify-center">
          {images.map((image, index) => (
            <div key={index} className="device-frame rounded-3xl p-3 shadow-2xl w-full max-w-[200px]">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-cover rounded-xl" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main "How It Works" section component
export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Your Daily Moment of Peace</h2>
          <p className="text-lg text-muted-foreground">
            Feelis is designed to be a simple, gentle, and beautiful flow.
          </p>
        </div>

        <div className="relative">
          {/* Dotted line connecting the steps - hidden on mobile, shown on desktop */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent -translate-x-1/2 hidden lg:block" 
            aria-hidden="true"
          />
          
          {howItWorksSteps.map((item, index) => (
            <Step
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              images={item.images}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}