@echo off
echo ============================================
echo   Setting up Git Repository for My_CV
echo ============================================

:: Check if git is available
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not found in your PATH.
    echo Please ensure Git is installed and you have restarted your terminal/computer.
    echo If you just installed it, try closing this window and opening it again.
    pause
    exit /b
)

:: Initialize Git
if not exist ".git" (
    echo [INFO] Initializing new Git repository...
    git init
) else (
    echo [INFO] Git repository already exists.
)

:: Add files
echo [INFO] Adding files to staging...
git add .

:: Commit
echo [INFO] Committing files...
git commit -m "Initial portfolio setup - Gallery and Certificates added"

echo.
echo ============================================
echo   SUCCESS! Local repository ready.
echo ============================================
echo.
echo Next steps:
echo 1. Go to https://github.com/new and create a repository (e.g. 'my-cv').
echo 2. Run the following commands (replace URL with your new repo URL):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
echo    git branch -M main
echo    git push -u origin main
echo.
pause
