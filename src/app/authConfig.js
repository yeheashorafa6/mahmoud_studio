export const authConfig = {
  providers: [],
  pages: {
    signIn: "/Login",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/Dashboard");
      const isOnHomepage = request.nextUrl.pathname === "/";
      const isOnProtectedPage =
        request.nextUrl.pathname.startsWith("/Blogger") ||
        request.nextUrl.pathname.startsWith("/Projects");

      if (!isLoggedIn && isOnDashboard) {
        return Response.redirect(new URL("/Login", request.nextUrl));
      }

      // إذا كان المستخدم مسجل الدخول ويحاول الوصول إلى صفحة تسجيل الدخول، أعد توجيهه إلى /Dashboard
      if (isLoggedIn && !isOnDashboard && !isOnHomepage && !isOnProtectedPage) {
        return Response.redirect(new URL("/Dashboard", request.nextUrl));
      }

      // إذا كان المستخدم مسجل الدخول ويحاول الوصول إلى صفحة محمية، لا تقم بإعادة توجيهه
      if (isLoggedIn && isOnProtectedPage) {
        return true;
      }

      // إذا كان المستخدم مسجل الدخول ويحاول الوصول إلى الصفحة الرئيسية، لا تقم بإعادة توجيهه
      if (isLoggedIn && isOnHomepage) {
        return true;
      }

      // للسماح بالوصول إلى أي مسار آخر
      return true;
    },
  },
};
