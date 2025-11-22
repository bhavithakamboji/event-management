@echo off
echo Starting Event Management Frontend...

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting development server...
call npm run dev

<<<<<<< HEAD
=======

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
