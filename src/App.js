import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import PostShort from "./components/PostShort";

import posts from "./dummy/posts";

import "./styles/styles.css";

export default function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const defaultWarningMsg = "for instance type 'programming tutorial'";

  useEffect(() => {
    if (search) {
      setIsWriting(true);
      const writingItv = setTimeout(() => {
        setIsWriting(false);
        const result = posts.filter((p) =>
          p.title.toLowerCase().includes(search.toLocaleLowerCase())
        );
        setSearchResult(result);
      }, 650);

      return () => {
        clearTimeout(writingItv);
      };
    }
    setSearchResult([]);

    return () => {
      setIsWriting(false);
    };
  }, [search]);

  useEffect(() => {
    console.log(isWriting);
  }, [isWriting]);

  useEffect(() => {
    if (!search) {
      setWarningMsg(defaultWarningMsg);
      return;
    } else if (isWriting) {
      setWarningMsg("...loading");
      return;
    } else if (search && searchResult.length === 0) {
      setWarningMsg(`noting matches with '${search}'`);
      return;
    }
    setWarningMsg("");
  }, [search, searchResult, isWriting]);

  return (
    <div className="App">
      <SearchBox search={search} setSearch={setSearch} />
      {warningMsg && <h3 className="warning">{warningMsg}</h3>}
      {searchResult.length > 0 && (
        <div className="search-container">
          <h2 className="search-title">
            Search result for <span className="search-result">{search}</span>
          </h2>
          <div className="posts-container">
            {searchResult.map((p) => (
              <PostShort key={p.id} title={p.title} date={p.date} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
