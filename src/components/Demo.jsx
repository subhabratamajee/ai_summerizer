import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummeryQuery } from "../services/article";
import send from '../assets/send.png'
function Demo() {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummery, { error, isFetching }] = useLazyGetSummeryQuery();

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummery({ articleUrl: article?.url });
    console.log(data);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      console.log(newArticle);
    }
  };
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

 

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            className="url_input peer"
            type="url"
            placeholder="Enter a URL "
            value={article?.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <img src={send} alt="ff" />
          </button>
        </form>

        <div className=" flex justify-end mr-10">
            <button
              type="button"
              className="black_btn"
              onClick={toggleShow}
            >
              {show ?  "Hide History" :"Show History"}
            </button>

        </div>
        <div className={show?'block':'hidden'}>
          {allArticles.map((item, index) => (
            <div
              className="link_card"
              key={`link-${index}`}
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_item"
                  className="w-[40%] h-[40%] ovject-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-19 max-w-full flex justify-center items.center">
          {isFetching ? (
            <p className="font-inter font-bold text-black text-gray-700">
              Well, that wasn't supposed to happen only text format is possible...
              <br />
              <span className="text-red-500">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient ">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm-text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Demo;
