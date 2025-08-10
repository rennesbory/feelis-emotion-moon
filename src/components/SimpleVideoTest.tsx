// Test different video loading approaches
import { useState } from 'react'

// Try importing one video
import testVideo from '@/assets/videos/emoly_intro_trim.mp4'

// Also try direct public path
const testVideoPublic = '/videos/emoly_intro_trim.mp4'

// And try URL approach
const testVideoURL = new URL('../assets/videos/emoly_intro_trim.mp4', import.meta.url).href

export function SimpleVideoTest() {
  const [results, setResults] = useState<Record<string, string>>({})
  
  console.log('🎬 All video test approaches:')
  console.log('- Import:', testVideo)
  console.log('- Public:', testVideoPublic)
  console.log('- URL:', testVideoURL)
  
  const updateResult = (method: string, status: string) => {
    setResults(prev => ({ ...prev, [method]: status }))
  }
  
  return (
    <div className="fixed top-4 left-4 bg-white p-4 border rounded shadow-lg z-50 max-w-xs">
      <h3 className="font-bold mb-2 text-sm">Video Loading Test</h3>
      
      <div className="space-y-3 text-xs">
        {/* Test import approach */}
        <div>
          <p className="font-semibold">Import Method:</p>
          <p className="break-all mb-1">{testVideo || 'UNDEFINED'}</p>
          {testVideo ? (
            <video 
              src={testVideo}
              className="w-20 h-auto border"
              controls
              muted
              onError={() => updateResult('import', '❌ Failed')}
              onLoadedData={() => updateResult('import', '✅ Success')}
            />
          ) : (
            <p className="text-red-500">No import</p>
          )}
          <p className="text-xs">{results.import || '⏳ Testing...'}</p>
        </div>
        
        {/* Test public path approach */}
        <div>
          <p className="font-semibold">Public Path:</p>
          <p className="break-all mb-1">{testVideoPublic}</p>
          <video 
            src={testVideoPublic}
            className="w-20 h-auto border"
            controls
            muted
            onError={() => updateResult('public', '❌ Failed')}
            onLoadedData={() => updateResult('public', '✅ Success')}
          />
          <p className="text-xs">{results.public || '⏳ Testing...'}</p>
        </div>
        
        {/* Test URL approach */}
        <div>
          <p className="font-semibold">URL Method:</p>
          <p className="break-all mb-1 text-xs">{testVideoURL.substring(0, 40)}...</p>
          <video 
            src={testVideoURL}
            className="w-20 h-auto border"
            controls
            muted
            onError={() => updateResult('url', '❌ Failed')}
            onLoadedData={() => updateResult('url', '✅ Success')}
          />
          <p className="text-xs">{results.url || '⏳ Testing...'}</p>
        </div>
      </div>
    </div>
  )
}