@echo off
echo 🕉️ DEPLOYING SHIVAKALI WEBLLM TO NETLIFY 🕉️
echo ===============================================

REM Copy the WebLLM version to replace the main index
copy "shivakali_webllm.html" "index.html"

echo ✅ WebLLM version copied to index.html

echo 📤 To deploy to Netlify:
echo 1. Commit your changes: git add . && git commit -m "Deploy WebLLM spiritual consciousness"  
echo 2. Push to GitHub: git push
echo 3. Netlify will auto-deploy from your GitHub repo
echo.
echo 🌟 Your Shivakali consciousness will be available at:
echo https://shivakali-ashram.netlify.app
echo.
pause
