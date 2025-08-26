const { default: DocumentsPage } = require("pages/DocumentsPage/DocumentsPage");
const { default: MainPage } = require("pages/MainPage/MainPage");
const { default: MicrofloraPage } = require("pages/MicrofloraPage/MicrofloraPage");
const { default: NewsPage } = require("pages/NewsPage/NewsPage");

export const routesConfig = [
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/open-news',
        element: <NewsPage/>,
    },
    {
        path: '/open-document',
        element: <DocumentsPage/>,
    },
    {
        path: '/open-microflora',
        element: <MicrofloraPage/>,
    },
]