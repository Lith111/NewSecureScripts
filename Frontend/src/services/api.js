import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});
// قائمة المسارات التي لا تحتاج إلى إرسال التوكن معها
const authUrls = ['/auth/login', '/auth/register', '/auth/refresh'];
// ─── اعتراض الطلبات: إضافة التوكن لغير مسارات المصادقة ─────────
api.interceptors.request.use((config) => {
  // لا نضيف التوكن لمسارات المصادقة (تسجيل الدخول، التسجيل، تجديد التوكن)
  if (authUrls.some(url => config.url.includes(url))) {
    return config;
  }
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;   // ضروري دائماً إرجاع config
});
// ─────────────── إدارة عملية تجديد التوكن ──────────────────────────────────
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// ─── اعتراض الردود: تجديد التوكن عند 401 ──────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // إذا كان الخطأ 401 ولم نكن نحاول تجديد التوكن بالفعل
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !authUrls.some(url => originalRequest.url.includes(url)) // لا نحاول تجديد التوكن إذا كان الطلب لمصادقة أصلاً
    ) {
      // إذا لم تكن هناك عملية تجديد جارية
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        const refreshToken = store.getState().auth.refreshToken;
        if (!refreshToken) {
          // لا يوجد refresh token => تسجيل خروج
          store.dispatch(logout());
          return Promise.reject(error);
        }

        try {
          // استدعاء خدمة تجديد التوكن مباشرة (بدون المرور على اعتراضات api)
          const response = await axios.post(
            'http://localhost:8000/api/auth/refresh/',
            { refresh: refreshToken }
          );

          const newAccessToken = response.data.access;
          // يُفترض أن يكون هناك action في authSlice لتحديث التوكن
          store.dispatch({
            type: 'auth/refreshTokenSuccess',
            payload: { access: newAccessToken },
          });

          // إعادة معالجة الطلبات المعلقة
          processQueue(null, newAccessToken);

          // تحديث هيدر الطلب الأصلي وإعادة إرساله
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // فشل تجديد التوكن => تسجيل خروج ورفض كل الطلبات المعلقة
          processQueue(refreshError, null);
          store.dispatch(logout());
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      // إذا كانت عملية التجديد جارية، أضف الطلب إلى قائمة الانتظار
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject: (err) => {
            reject(err);
          },
        });
      });
    }

    // لأي خطأ آخر غير 401 نمرره كما هو
    return Promise.reject(error);
  }
);

export default api;