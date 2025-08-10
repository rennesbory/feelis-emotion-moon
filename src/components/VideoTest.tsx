import { useEffect, useState } from 'react'

// Import videos to test them
import heroVideo from '@/assets/videos/emoly_intro_trim.mp4'
import webAngry from '@/assets/videos/web_Animation_background_angry.mp4'
import webAnxious from '@/assets/videos/web_Animation_background_anxious.mp4'
import webCalm from '@/assets/videos/web_Animation_background_calm.mp4'
import webEmpty from '@/assets/videos/web_Animation_background_empty.mp4'
import webExcited from '@/assets/videos/web_Animation_background_excited.mp4'
import webGrateful from '@/assets/videos/web_Animation_background_grateful.mp4'
import webHappy from '@/assets/videos/web_Animation_background_happy.mp4'
import webSad from '@/assets/videos/web_Animation_background_sad.mp4'
import webTired from '@/assets/videos/web_Animation_background_tired.mp4'

interface VideoTestResult {
  name: string
  src: string
  status: 'loading' | 'success' | 'error'
  error?: string
}

export function VideoTest() {
  const [testResults, setTestResults] = useState<VideoTestResult[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const videoImports = [
    { name: 'Hero Video', src: heroVideo },
    { name: 'Angry', src: webAngry },
    { name: 'Anxious', src: webAnxious },
    { name: 'Calm', src: webCalm },
    { name: 'Empty', src: webEmpty },
    { name: 'Excited', src: webExcited },
    { name: 'Grateful', src: webGrateful },
    { name: 'Happy', src: webHappy },
    { name: 'Sad', src: webSad },
    { name: 'Tired', src: webTired }
  ]

  useEffect(() => {
    console.log('🎬 VideoTest: Testing imported videos...')
    
    const initialResults: VideoTestResult[] = videoImports.map(video => ({
      name: video.name,
      src: video.src || 'UNDEFINED',
      status: 'loading'
    }))
    setTestResults(initialResults)

    const testVideo = async (video: { name: string, src: string }, index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!video.src || video.src === 'UNDEFINED') {
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'error', error: 'Import failed' } : result
          ))
          resolve()
          return
        }

        const videoElement = document.createElement('video')
        videoElement.src = video.src
        videoElement.muted = true
        videoElement.playsInline = true
        videoElement.preload = 'metadata'
        
        const timeoutId = setTimeout(() => {
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'error', error: 'Timeout' } : result
          ))
          resolve()
        }, 10000)

        videoElement.onloadeddata = () => {
          clearTimeout(timeoutId)
          console.log(`✅ ${video.name} loaded successfully`)
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'success' } : result
          ))
          resolve()
        }

        videoElement.onerror = () => {
          clearTimeout(timeoutId)
          const errorMsg = videoElement.error?.code ? `Error ${videoElement.error.code}` : 'Load failed'
          console.error(`❌ ${video.name} failed:`, errorMsg)
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'error', error: errorMsg } : result
          ))
          resolve()
        }
      })
    }

    const runTests = async () => {
      const promises = videoImports.map((video, index) => testVideo(video, index))
      await Promise.all(promises)
    }

    runTests()
  }, [])

  if (!isVisible) return null

  const successCount = testResults.filter(r => r.status === 'success').length
  const errorCount = testResults.filter(r => r.status === 'error').length
  const loadingCount = testResults.filter(r => r.status === 'loading').length

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Video Import Test</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="text-xs space-y-1">
        <div>Hero Video: {heroVideo ? '✅' : '❌'}</div>
        <div>✅ Success: {successCount}/10</div>
        <div>❌ Errors: {errorCount}/10</div>
        <div>⏳ Loading: {loadingCount}/10</div>
      </div>

      {errorCount > 0 && (
        <div className="mt-2 text-xs">
          <div className="text-red-400 font-semibold">Failed videos:</div>
          {testResults.filter(r => r.status === 'error').map(result => (
            <div key={result.name} className="text-red-300">
              {result.name}: {result.error}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-gray-400">
        <div>Overall: {successCount === 10 ? '✅ All working' : errorCount === 10 ? '❌ All failed' : '⚠️ Partial'}</div>
      </div>
    </div>
  )
}