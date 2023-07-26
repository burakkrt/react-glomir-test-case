import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "../components/ScrollTop.jsx";


// Pages
import MainLayout from "../pages/MainLayout.jsx";
import NotFound404 from "../pages/error/NotFound404.jsx";
import HomePageLayout from "../pages/home";
import PrivatePageLayout from "../auth/PrivatePage.jsx";
import UserLogin from "../pages/login/user";
import ServicesLayout from "../pages/services";
import ServicesWelcome from "../pages/services/welcome";
import Sentiment from "../pages/services/text-analysis/sentiment";
import TextAnalysisLayout from "../pages/services/text-analysis/";
import TextAnalysis from "../pages/services/text-analysis/welcome";
import Bots from "../pages/services/bots";

export const router = [
  {
    name: "Anasayfa",
    link: "/",
    path: "/",
    element: <><MainLayout />, <ScrollToTop /></>,
    errorElement: <NotFound404 />,
    breadcrumb: "Anasayfa",
    children: [
      {
        index: true,
        element: <HomePageLayout />
      }, {
        name: "Hizmetler",
        link: "/services",
        path: "/services",
        element: <ServicesLayout />,
        breadcrumb: "Hizmetler",
        children: [
          {
            index: true,
            element: <ServicesWelcome />
          },
          {
            name: "Text Analiz",
            link: "/services/text-analysis",
            path: "text-analysis",
            element: <TextAnalysisLayout />,
            breadcrumb: "Text Analysis",
            children: [
              {
                index: true,
                element: <TextAnalysis />
              },
              {
                name: "Sentiment Analiz",
                link: "/services/text-analysis/sentiment",
                path: "sentiment",
                element: <Sentiment />,
                breadcrumb: "Sentiment"
              }
            ]
          }, {
            name: "Bot Analiz",
            link: "/services/bots",
            path: "bots",
            element: <Bots />,
            breadcrumb: "Bots"
          }
        ]
      }
    ]
  }, {
    name: "Giriş Yap",
    link: "/user-login",
    path: "/user-login",
    element: <UserLogin />
  }
];

const authMap = router => router.map(route => {
  if (route?.auth) {
    route.element = <PrivatePageLayout>{route.element}</PrivatePageLayout>;
  }
  if (route?.children) {
    route.children = authMap(route.children);
  }
  return route;
});


export default createBrowserRouter(authMap(router));