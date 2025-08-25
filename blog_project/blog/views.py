import jwt
import datetime
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

from .models import User, Post
from .middleware import jwt_required

# Secret key for JWT (use Django's SECRET_KEY or env var)
JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = "HS256"

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "User already exists"}, status=400)

            user = User.objects.create(
                username=username,
                password=make_password(password) 
            )
            return JsonResponse({"message": "User registered successfully"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({"error": "Invalid credentials"}, status=401)

            if not check_password(password, user.password):
                return JsonResponse({"error": "Invalid credentials"}, status=401)

            payload = {
                "id": user.id,
                "username": user.username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=settings.JWT_EXPIRATION_HOURS),
                "iat": datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

            return JsonResponse({"token": token})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=405)

# -------------------- Post CRUD --------------------

def get_post_or_404(post_id):
    try:
        return Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return None

@csrf_exempt
def list_posts(request):
    posts = Post.objects.all().values("id", "title", "content", "author__username", "created_at")
    return JsonResponse(list(posts), safe=False)

@csrf_exempt
def post_detail(request, post_id):
    post = get_post_or_404(post_id)
    if not post:
        return JsonResponse({"error": "Post not found"}, status=404)
    data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "author": post.author.username,
        "created_at": post.created_at
    }
    return JsonResponse(data)

@csrf_exempt
@jwt_required
def create_post(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)
    try:
        data = json.loads(request.body)
        title = data.get("title")
        content = data.get("content")
        post = Post.objects.create(title=title, content=content, author=request.user)
        return JsonResponse({"message": "Post created", "id": post.id})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@jwt_required
def edit_post(request, post_id):
    if request.method != "PUT":
        return JsonResponse({"error": "Invalid request"}, status=405)
    post = get_post_or_404(post_id)
    if not post:
        return JsonResponse({"error": "Post not found"}, status=404)
    if post.author != request.user:
        return JsonResponse({"error": "Forbidden"}, status=403)
    try:
        data = json.loads(request.body)
        post.title = data.get("title", post.title)
        post.content = data.get("content", post.content)
        post.save()
        return JsonResponse({"message": "Post updated"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@jwt_required
def delete_post(request, post_id):
    if request.method != "DELETE":
        return JsonResponse({"error": "Invalid request"}, status=405)
    post = get_post_or_404(post_id)
    if not post:
        return JsonResponse({"error": "Post not found"}, status=404)
    if post.author != request.user:
        return JsonResponse({"error": "Forbidden"}, status=403)
    post.delete()
    return JsonResponse({"message": "Post deleted"})

