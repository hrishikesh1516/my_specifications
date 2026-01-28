@echo off
setlocal
echo ========================================================
echo   Upload to GitHub - Easy Mode
echo ========================================================
echo.
echo Step 1: Go to https://github.com/new and create your repo (make it Public).
echo Step 2: Copy the HTTPS URL (e.g. https://github.com/YourName/my-cv.git)
echo.
set /p REPO_URL="Paste your GitHub URL here and press Enter: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided. Please try again.
    pause
    exit /b
)

echo.
echo [INFO] Cleaning up old connections...
git remote remove origin 2>nul

echo [INFO] Connecting to %REPO_URL%...
git remote add origin %REPO_URL%

echo [INFO] Renaming branch to main...
git branch -M main

echo [INFO] Pushing your code to GitHub...
echo (If a popup asks for a login, please sign in with your GitHub account)
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Something went wrong. 
    echo Please check if the URL is correct and you are logged in.
) else (
    echo.
    echo ========================================================
    echo   SUCCESS! Your code is on GitHub.
    echo ========================================================
    echo Final Step:
    echo 1. Go to your GitHub Repo page.
    echo 2. Click 'Settings' (top bar) then 'Pages' (left sidebar).
    echo 3. Under 'Branch', select 'main' and click 'Save'.
)

echo.
pause
