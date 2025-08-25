import time
import jwt
from django.conf import settings
from django.http import JsonResponse
from .models import User, RequestLog
import threading

# Logging middleware
class LoggingMiddleware:
    """
    Logs every request method, path, status code, duration in ms,
    and optionally the authenticated user.
    Saves logs asynchronously to avoid slowing down requests.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = (time.time() - start_time) * 1000  # in milliseconds

        # Prepare user if authenticated
        user = getattr(request, "user", None)
        if user and user.is_authenticated:
            user_instance = user
        else:
            user_instance = None

        log_data = {
            "method": request.method,
            "path": request.path,
            "status_code": response.status_code,
            "duration_ms": duration,
            "user": user_instance
        }

        # Save asynchronously to database
        threading.Thread(target=self._save_log, args=(log_data,)).start()

        return response

    def _save_log(self, log_data):
            try:
                RequestLog.objects.create(**log_data)
            except Exception as e:
                print(f"Failed to save request log: {e}")

# JWT authentication decorator
from functools import wraps

def jwt_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JsonResponse({"error": "Authorization header missing"}, status=401)
        try:
            token = auth_header.split(" ")[1]  # Expect "Bearer <token>"
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            request.user = User.objects.get(id=payload["id"])
        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token expired"}, status=401)
        except Exception:
            return JsonResponse({"error": "Invalid token"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper
