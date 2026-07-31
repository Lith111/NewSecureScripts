from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Quiz, Question, Choice, UserQuizAttempt
from progress.models import Progress
from courses.models import Lesson
from .serializers import QuizSerializer, QuizSubmissionSerializer

class QuizView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuizSerializer

    def get_object(self):
        lesson_order = self.kwargs['order']
        lesson = get_object_or_404(Lesson, order=lesson_order, is_published=True)
        # التحقق من أن المستخدم يمكنه الوصول للدرس (يجب أن يكون active أو completed)
        progress = get_object_or_404(Progress, user=self.request.user, lesson=lesson)
        if progress.status == 'locked':
            raise self.permission_denied("يجب إكمال الدرس السابق أولاً")
        quiz = get_object_or_404(Quiz, lesson=lesson)
        return quiz

class QuizSubmitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, order):
        lesson = get_object_or_404(Lesson, order=order, is_published=True)
        progress = get_object_or_404(Progress, user=request.user, lesson=lesson)
        if progress.status == 'locked':
            raise self.permission_denied("يجب إكمال الدرس السابق أولاً")
        quiz = get_object_or_404(Quiz, lesson=lesson)

        serializer = QuizSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answers = serializer.validated_data['answers']

        # تصحيح الإجابات
        total_questions = quiz.questions.count()
        correct_count = 0
        for ans in answers:
            question_id = ans['question_id']
            choice_id = ans['selected_choice_id']
            try:
                question = Question.objects.get(id=question_id, quiz=quiz)
                choice = Choice.objects.get(id=choice_id, question=question)
                if choice.is_correct:
                    correct_count += 1
            except (Question.DoesNotExist, Choice.DoesNotExist):
                continue

        score = (correct_count / total_questions * 100) if total_questions > 0 else 0
        passed = score >= quiz.passing_score

        # تسجيل المحاولة
        attempt = UserQuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            passed=passed
        )

        if passed:
            # تحديث Progress إلى completed
            progress.status = 'completed'
            progress.completed_at = timezone.now()
            progress.save()

            # فتح الدرس التالي
            next_lesson = Lesson.objects.filter(order=lesson.order + 1, is_published=True).first()
            if next_lesson:
                next_progress, _ = Progress.objects.get_or_create(user=request.user, lesson=next_lesson)
                if next_progress.status == 'locked':
                    next_progress.status = 'active'
                    next_progress.save()

            return Response({
                'message': 'تهانينا! لقد نجحت في الفحص.',
                'score': score,
                'passed': True,
                'next_lesson_order': next_lesson.order if next_lesson else None
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'للأسف، لم تنجح. يمكنك المحاولة مرة أخرى.',
                'score': score,
                'passed': False
            }, status=status.HTTP_200_OK)