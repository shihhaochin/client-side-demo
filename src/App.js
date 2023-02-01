import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NaviComponent from "./components/navi-component";
import HomePage from "./pages/Homepage";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import InformationPage from "./pages/InformationPage";
import MessagePage from "./pages/MessagePage";
import MyArticleComponent from "./components/myArticle-component";
import ArticlePage from "./pages/Articlepage";
import SearchArticleComponent from "./components/searchArticle-component";
import ExperiencePage from "./pages/Experience";
import BodyQuestionPage from "./pages/Body-question";
import MedicalTalkPage from "./pages/Medical-talk";
import VideoPage from "./pages/video";
import PostMessageComponent from "./components/postMessage-component";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/About";
import FooterComponent from "./components/footer-component";
import EntranceCheckComponent from "./components/entranceCheck-component";
import AuthService from "./services/auth.service";
import "./styles/style.css";

function App() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [say, setSay] = useState("");
  let [nickname, setNickname] = useState("");
  let [googleId, setGoogleId] = useState("");
  let [messageClose, setMessageClose] = useState(true);
  let navigate = useNavigate();
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [searchArticleData, setSearchArticleData] = useState(null);
  let [loading, setLoading] = useState(true);
  const API = "8ada18c60964437eb6c8b04dfa514ef4";
  const initialURL = `https://newsapi.org/v2/top-headlines?country=tw&category=health&pageSize=6&page=1&apiKey=${API}`;

  const searchURL = `https://newsapi.org/v2/everything?q=${input}&pageSize=4&page=1&apiKey=${API}&language=zh`;
  //fetch data from news api
  //放一個變數url會隨search的東西改變
  // eslint-disable-next-line
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url);
    const parsedData = await dataFetch.json();
    setData(parsedData.articles);
    navigate("/");
  };
  //看更多文章
  const moreNews = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://newsapi.org/v2/top-headlines?country=tw&category=health&pageSize=4&page=${page}&apiKey=${API}`;
    } else {
      newURL = `https://newsapi.org/v2/everything?q=${input}&pageSize=4&page=${page}&apiKey=${API}&language=zh`;
    }
    setPage(page + 1);
    let dataFetch = await fetch(newURL);
    let parsedData = await dataFetch.json();
    //把原本就已經有的data跟新fetch到的data串在一起
    setData(data.concat(parsedData.articles));
  };

  //首頁開啟後直接執行search()從newsapi爬新聞
  useEffect(() => {
    search(initialURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //改變sidenavi的state
  let [sidenaviChange, setSidenaviChange] = useState(true);
  //所有navibar 在移動時的state
  let [allnavibarChange, setAllnavibarChange] = useState(true);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset !== 0) {
      setAllnavibarChange(false);
    } else {
      setAllnavibarChange(true);
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <NaviComponent
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        sidenaviChange={sidenaviChange}
        setSidenaviChange={setSidenaviChange}
        googleId={googleId}
        setGoogleId={setGoogleId}
        searchArticleData={searchArticleData}
        setSearchArticleData={setSearchArticleData}
        allnavibarChange={allnavibarChange}
        setAllnavibarChange={setAllnavibarChange}
        loading={loading}
        setLoading={setLoading}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              sidenaviChange={sidenaviChange}
              setSidenaviChange={setSidenaviChange}
              data={data}
              moreNews={moreNews}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
            />
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              googleId={googleId}
              setGoogleId={setGoogleId}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfileComponent currentUser={currentUser} />}
        />
        <Route
          path="/profile/information"
          element={<InformationPage currentUser={currentUser} />}
        />
        <Route
          path="/profile/message"
          element={<MessagePage currentUser={currentUser} />}
        />
        <Route
          path="/profile/article"
          element={
            <MyArticleComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
              messageClose={messageClose}
              setMessageClose={setMessageClose}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/articles"
          element={
            <ArticlePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
              messageClose={messageClose}
              setMessageClose={setMessageClose}
              searchArticleData={searchArticleData}
              setSearchArticleData={setSearchArticleData}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/articles/experience"
          element={
            <ExperiencePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
              messageClose={messageClose}
              setMessageClose={setMessageClose}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/articles/bodyquestion"
          element={
            <BodyQuestionPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
              messageClose={messageClose}
              setMessageClose={setMessageClose}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/articles/medicaltalk"
          element={
            <MedicalTalkPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
              messageClose={messageClose}
              setMessageClose={setMessageClose}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/video"
          element={
            <VideoPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/articles/search"
          element={
            <SearchArticleComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              searchArticleData={searchArticleData}
              setSearchArticleData={setSearchArticleData}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
            />
          }
        />
        <Route
          path="/user/message"
          element={
            <PostMessageComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              say={say}
              setSay={setSay}
              nickname={nickname}
              setNickname={setNickname}
              allnavibarChange={allnavibarChange}
              setAllnavibarChange={setAllnavibarChange}
            />
          }
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <FooterComponent />
      <EntranceCheckComponent />
    </div>
  );
}

export default App;
