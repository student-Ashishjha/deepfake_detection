web: gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:$PORT app:app
uvicorn app:app --host 0.0.0.0 --port 8000
netstat -ano | findstr :8000
taskkill /PID 2124 /F