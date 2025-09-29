import AuthPage from "pages/AuthPage/AuthPage";
import FormPage from "pages/FormPage/FormPage";

const { default: DocumentsPage } = require("pages/DocumentsPage/DocumentsPage");
const { default: MainPage } = require("pages/MainPage/MainPage");
const { default: MicrofloraPage } = require("pages/MicrofloraPage/MicrofloraPage");
const { default: NewsPage } = require("pages/NewsPage/NewsPage");
const { default: NewPage } = require("pages/NewPage/NewPage");
const { default: DocumentPage } = require("pages/DocumentPage/DocumentPage");
const { default: FloraPage } = require("pages/FloraPage/FloraPage");

export const routesConfig = [
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/login',
        element: <AuthPage/>
    },
    {
        path: '/open-news/',
        element: <NewsPage/>,
    },
    {
        path: '/open-document/',
        element: <DocumentsPage/>,
    },
    {
        path: '/open-microflora/',
        element: <MicrofloraPage/>,
    },
    {
        path: '/open-news/:id',
        element: <NewPage/>
    },
    {
        path: '/open-document/:id',
        element: <DocumentPage/>
    },
    {
        path: '/open-microflora/:id',
        element: <FloraPage/>
    },
    {
        path: '/open-microflora-create/:name',
        element: <FormPage/>
    },
]