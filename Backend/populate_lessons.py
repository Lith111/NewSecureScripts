import os
import django
import random

# إعداد بيئة Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'secure_platform.settings')
django.setup()

from courses.models import Lesson
from quizzes.models import Quiz, Question, Choice

# قائمة الدروس مع محتوى مبسط
lessons_data = [
    {
        "order": 1,
        "title": "مقدمة في أمن المعلومات",
        "theory_content": "<p>يُعنى أمن المعلومات بحماية البيانات من الوصول غير المصرح به والعبث بها.</p>",
        "vulnerable_code": 'printf("Hello " + user_input);',
        "secure_code": 'printf("Hello %s", user_input);',
        "questions": [
            {
                "text": "ما أخطر أنواع الثغرات وفقًا لـ OWASP Top 10؟",
                "choices": [
                    ("XSS", False),
                    ("SQL Injection", True),
                    ("CSRF", False),
                    ("DDoS", False),
                ],
            },
            {
                "text": "أي من التالي يعتبر دفاعًا ضد حقن SQL؟",
                "choices": [
                    ("Prepared Statements", True),
                    ("Eval", False),
                    ("Base64 encoding", False),
                    ("MD5 hashing", False),
                ],
            },
        ],
    },
    {
        "order": 2,
        "title": "حقن SQL (SQL Injection)",
        "theory_content": "<p>تحدث ثغرة SQL Injection عندما يقوم المهاجم بإدراج أوامر SQL خبيثة في حقل إدخال.</p>",
        "vulnerable_code": 'query = "SELECT * FROM users WHERE name = \'" + username + "\'"',
        "secure_code": 'query = "SELECT * FROM users WHERE name = %s"\ncursor.execute(query, [username])',
        "questions": [
            {
                "text": "أي حرف يستخدم غالبًا لإنهاء النص في SQL؟",
                "choices": [
                    ("علامة التعجب (!)", False),
                    ("الفاصلة المنقوطة (;)", False),
                    ("علامة الاقتباس المفرد (')", True),
                    ("الشرطة المائلة (/", False),
                ],
            },
            {
                "text": "ما أفضل طريقة لمنع SQL Injection في لغة Python مع MySQL؟",
                "choices": [
                    ("استخدام escape_string", False),
                    ("استخدام الدوال المجهولة", False),
                    ("استخدام Prepared Statements", True),
                    ("تشفير الباراميترات بـ MD5", False),
                ],
            },
        ],
    },
    {
        "order": 3,
        "title": "ثغرات XSS (Cross-Site Scripting)",
        "theory_content": "<p>تسمح ثغرات XSS للمهاجم بحقن سكريبتات خبيثة في صفحات الويب التي يشاهدها المستخدمون الآخرون.</p>",
        "vulnerable_code": '<div>Hello, <?php echo $_GET["name"]; ?></div>',
        "secure_code": '<div>Hello, <?php echo htmlspecialchars($_GET["name"]); ?></div>',
        "questions": [
            {
                "text": "ما نوع XSS الذي يحدث عند تخزين السكريبت في قاعدة البيانات؟",
                "choices": [
                    ("Reflected XSS", False),
                    ("Stored XSS", True),
                    ("DOM-based XSS", False),
                    ("Blind XSS", False),
                ],
            },
            {
                "text": "أي دالة PHP تستخدم لمنع XSS عند إخراج البيانات؟",
                "choices": [
                    ("htmlentities()", True),
                    ("str_replace()", False),
                    ("md5()", False),
                    ("json_encode()", False),
                ],
            },
        ],
    },
    {
        "order": 4,
        "title": "تزوير الطلب عبر المواقع (CSRF)",
        "theory_content": "<p>يخدع هجوم CSRF المستخدم لتقديم طلب غير مصرح به إلى موقع موثوق.</p>",
        "vulnerable_code": '<form action="https://bank.com/transfer" method="POST">\n  <input name="to" value="attacker">\n  <input name="amount" value="1000">\n</form>',
        "secure_code": "// إضافة رمز CSRF في النموذج (Django example)\n<form method='POST'>\n  {% csrf_token %}\n  ...\n</form>",
        "questions": [
            {
                "text": "ما أفضل وسيلة لمنع CSRF في Django؟",
                "choices": [
                    ("استخدام HTTPS فقط", False),
                    ("إضافة توكن CSRF في النماذج", True),
                    ("تشفير الكوكيز", False),
                    ("استخدام جلسات قصيرة", False),
                ],
            },
            {
                "text": "أي من الهجمات التالية لا علاقة له بـ CSRF؟",
                "choices": [
                    ("تضمين رابط خبيث في تعليق", False),
                    ("استغلال ثغرة XSS لسرقة الكوكيز", True),
                    ("إرسال بريد إلكتروني مزيف", False),
                    ("صفحة مخفية تقدم طلبًا", False),
                ],
            },
        ],
    },
    {
        "order": 5,
        "title": "ثغرات رفع الملفات (File Upload)",
        "theory_content": "<p>يمكن للمهاجم رفع ملف خبيث (PHP، JSP) وتنفيذه على الخادم.</p>",
        "vulnerable_code": 'move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $_FILES["file"]["name"]);',
        "secure_code": "// التحقق من الامتداد ونوع MIME وإعادة تسمية الملف\n$allowed = ['jpg','png','pdf'];\n$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);\nif (in_array($ext, $allowed)) {\n  $newName = uniqid() . '.' . $ext;\n  move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $newName);\n}",
        "questions": [
            {
                "text": "ما الخطر الأساسي من عدم التحقق من امتداد الملف المرفوع؟",
                "choices": [
                    ("استنزاف مساحة القرص", False),
                    ("تنفيذ كود خبيث على الخادم", True),
                    ("سرقة كلمات المرور", False),
                    ("هجمات DDoS", False),
                ],
            },
            {
                "text": "أي إجراء يزيد أمان رفع الملفات؟",
                "choices": [
                    ("السماح بجميع الامتدادات", False),
                    ("التحقق من نوع MIME", True),
                    ("رفع الملفات بدون صلاحيات", False),
                    ("استخدام FTP", False),
                ],
            },
        ],
    },
    {
        "order": 6,
        "title": "ثغرات المصادقة وإدارة الجلسات",
        "theory_content": "<p>ضعف في آليات تسجيل الدخول أو الجلسات يمكن أن يسمح للمهاجم بانتحال هوية مستخدم آخر.</p>",
        "vulnerable_code": 'if password == "admin": \n  session["role"] = "admin"',
        "secure_code": "// استخدام هاش كلمة المرور (bcrypt) وربط الجلسة بـ IP أو توقيع قوي\nif bcrypt.checkpw(password, hashed):\n  session['user_id'] = user.id",
        "questions": [
            {
                "text": "ما أفضل ممارسة لتخزين كلمات المرور؟",
                "choices": [
                    ("تشفير AES", False),
                    ("هاش مع salt (bcrypt)", True),
                    ("Base64", False),
                    ("ROT13", False),
                ],
            },
            {
                "text": "ماذا يجب أن يحدث عند تسجيل الخروج؟",
                "choices": [
                    ("حذف الكوكيز فقط", False),
                    ("إبطال الجلسة بالكامل", True),
                    ("إعادة توجيه المستخدم", False),
                    ("إخفاء زر الخروج", False),
                ],
            },
        ],
    },
    {
        "order": 7,
        "title": "ثغرات IDOR (Insecure Direct Object Reference)",
        "theory_content": "<p>يحدث IDOR عندما يستطيع المستخدم الوصول إلى موارد لا يملكها عبر تعديل معرف في الطلب.</p>",
        "vulnerable_code": '// يعرض ملف أي مستخدم\napp.get("/files/:id", (req, res) => {\n  db.get("SELECT * FROM files WHERE id = " + req.params.id);\n});',
        "secure_code": '// التحقق من أن الملف يخص المستخدم الحالي\napp.get("/files/:id", (req, res) => {\n  db.get("SELECT * FROM files WHERE id = ? AND owner_id = ?", [req.params.id, req.user.id]);\n});',
        "questions": [
            {
                "text": "ما سبب ظهور ثغرة IDOR؟",
                "choices": [
                    ("عدم التحقق من الصلاحيات على الكائن", True),
                    ("استخدام HTTP بدل HTTPS", False),
                    ("ثغرة XSS", False),
                    ("ضعف الخوارزميات", False),
                ],
            },
            {
                "text": "كيف تمنع IDOR في تطبيق Django؟",
                "choices": [
                    ("استخدام UUID بدلاً من id", False),
                    ("تصفية الكائنات بالمالك الحالي", True),
                    ("إخفاء الرابط", False),
                    ("استخدام POST فقط", False),
                ],
            },
        ],
    },
]

# بدء الإضافة
for data in lessons_data:
    # إنشاء الدرس
    lesson, created = Lesson.objects.get_or_create(
        order=data["order"],
        defaults={
            "title": data["title"],
            "theory_content": data["theory_content"],
            "vulnerable_code": data["vulnerable_code"],
            "secure_code": data["secure_code"],
            "is_published": True,
        }
    )
    if created:
        print(f"تم إنشاء الدرس {lesson.order}: {lesson.title}")
    else:
        print(f"الدرس {lesson.order} موجود مسبقًا، سيتم تحديث المحتوى")
        lesson.title = data["title"]
        lesson.theory_content = data["theory_content"]
        lesson.vulnerable_code = data["vulnerable_code"]
        lesson.secure_code = data["secure_code"]
        lesson.is_published = True
        lesson.save()

    # إنشاء الفحص إذا لم يكن موجودًا
    quiz, _ = Quiz.objects.get_or_create(lesson=lesson, defaults={"passing_score": 70})
    if _:
        print(f"  تم إنشاء فحص للدرس {lesson.order}")
    else:
        # إذا الفحص موجود، نحذف الأسئلة القديمة ونعيد بنائها لضمان النظافة
        quiz.questions.all().delete()
        print(f"  فحص موجود، جاري إعادة بناء الأسئلة للدرس {lesson.order}")

    # إضافة الأسئلة
    for q_data in data["questions"]:
        question = Question.objects.create(
            quiz=quiz,
            text=q_data["text"],
            order=1  # يمكن تعديل الترتيب إذا أردت
        )
        for choice_text, is_correct in q_data["choices"]:
            Choice.objects.create(
                question=question,
                text=choice_text,
                is_correct=is_correct
            )
        print(f"    أضيف سؤال: {q_data['text'][:50]}...")

print("\n✅ تم إضافة/تحديث 7 دروس مع فحوصاتها بنجاح.")