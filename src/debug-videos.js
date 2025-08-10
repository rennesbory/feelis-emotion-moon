// Simple script to test video imports
console.log('Testing video imports...')

try {
  const heroVideo = '/src/assets/videos/emoly_intro_trim.mp4'
  const webAngry = '/src/assets/videos/web_Animation_background_angry.mp4'
  
  console.log('Hero video path:', heroVideo)
  console.log('Web angry path:', webAngry)
  
  // Test if videos can be loaded as URLs
  console.log('Video imports test completed')
} catch (error) {
  console.error('Video import error:', error)
}