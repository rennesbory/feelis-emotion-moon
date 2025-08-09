import { useEffect, useState } from 'react'

interface VideoTestResult {
  src: string
  status: 'loading' | 'success' | 'error'
  error?: string
}

export function VideoTest() {
  const [testResults, setTestResults] = useState<VideoTestResult[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const videoSources = [
    '/videos/emoly_intro_trim.mp4',
    '/videos/web_Animation_background_angry.mp4',
    '/videos/web_Animation_background_anxious.mp4',
    '/videos/web_Animation_background_calm.mp4',
    '/videos/web_Animation_background_empty.mp4',
    '/videos/web_Animation_background_excited.mp4',
    '/videos/web_Animation_background_grateful.mp4',
    '/videos/web_Animation_background_happy.mp4',
    '/videos/web_Animation_background_sad.mp4',
    '/videos/web_Animation_background_tired.mp4'
  ]

  useEffect(() => {
    const initialResults: VideoTestResult[] = videoSources.map(src => ({
      src,
      status: 'loading'
    }))
    setTestResults(initialResults)

    const testVideo = async (src: string, index: number): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.createElement('video')
        video.src = src
        video.muted = true
        video.playsInline = true
        video.preload = 'metadata'
        
        const timeoutId = setTimeout(() => {
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'error', error: 'Timeout' } : result
          ))
          resolve()
        }, 10000)

        video.onloadeddata = () => {
          clearTimeout(timeoutId)
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'success' } : result
          ))
          resolve()
        }

        video.onerror = () => {
          clearTimeout(timeoutId)
          const errorMsg = video.error?.code ? `Error ${video.error.code}` : 'Load failed'
          setTestResults(prev => prev.map((result, i) => 
            i === index ? { ...result, status: 'error', error: errorMsg } : result
          ))
          resolve()
        }
      })
    }

    const runTests = async () => {
      const promises = videoSources.map((src, index) => testVideo(src, index))
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
        <h3 className="font-bold text-sm">Video Test</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="text-xs space-y-1">
        <div>✅ Success: {successCount}</div>
        <div>❌ Errors: {errorCount}</div>
        <div>⏳ Loading: {loadingCount}</div>
      </div>

      {errorCount > 0 && (
        <div className="mt-2 text-xs">
          <div className="text-red-400 font-semibold">Failed videos:</div>
          {testResults.filter(r => r.status === 'error').map(result => (
            <div key={result.src} className="text-red-300">
              {result.src.split('/').pop()}: {result.error}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex gap-1">
        <button 
          onClick={() => window.location.reload()}
          className="px-2 py-1 bg-blue-600 rounded text-xs"
        >
          Reload
        </button>
        <button 
          onClick={() => window.open('/test-video.html', '_blank')}
          className="px-2 py-1 bg-green-600 rounded text-xs"
        >
          Test Page
        </button>
      </div>
    </div>
  )
}