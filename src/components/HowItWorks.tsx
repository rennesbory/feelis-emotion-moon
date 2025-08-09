import { Card } from '@/components/ui/card'

// Use direct paths for image assets
const ss01 = '/src/assets/images/ss01.jpeg'
const ss02 = '/src/assets/images/ss02.jpeg'
const ss03 = '/src/assets/images/ss03.jpeg'
const ss05 = '/src/assets/images/ss05.jpeg'
const ss06 = '/src/assets/images/ss06.jpeg'
const ss07 = '/src/assets/images/ss07.jpeg'
const ss08 = '/src/assets/images/ss08.jpeg'
const ss09 = '/src/assets/images/ss09.jpeg'

// Step-by-step data with two images per step
const howItWorksSteps = [
  {
    step: "01",
    title: "Check In With Yourself",
    description: "Start by choosing the feeling that best represents your moment. Our beautiful, expressive characters make it easy to identify and acknowledge your emotions.",
    images: [
      {
        src: ss03,
        alt: "Emotion selection screen with character grid"
      },
      {
        src: ss02, 
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
        src: ss05,
        alt: "Journaling interface with gentle prompts"
      },
      {
        src: ss01,
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
        src: ss06,
        alt: "Emotional patterns chart"
      },
      {
        src: ss07,
        alt: "Insights and analytics view"
      }
    ]
  },
  {
    step: "04",
    title: "Find a Moment of Calm",
    description: "Start or end your day with a thoughtful quote presented in a serene, interactive world. Personalize the scene to match your vibe and find a quiet, beautiful space for a moment of reflection.",
    images: [
      {
        src: ss08,
        alt: "Interactive calm world with thoughtful quote"
      },
      {
        src: ss09,
        alt: "Personalized serene reflection space"
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
        <div className="step-images">
          {images.map((image, index) => (
            <div key={index} className="step-image">
              <img 
                src={image.src} 
                alt={image.alt} 
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