/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import Textfit from "react-textfit";
import { render } from "react-dom"

export default function App() {
  return (
    <div
      css={{
        width: 1200,
        height: 630,
        backgroundImage: `linear-gradient(246deg, rgba(234, 234, 234, 0.04) 0%, rgba(234, 234, 234, 0.04) 33.3%, rgba(69, 69, 69, 0.04) 33.3%, rgba(69, 69, 69, 0.04) 66.6%, rgba(189, 189, 189, 0.04) 66.6%, rgba(189, 189, 189, 0.04) 99.9%), linear-gradient(81deg, rgba(126, 126, 126, 0.05) 0%, rgba(126, 126, 126, 0.05) 33.3%, rgba(237, 237, 237, 0.05) 33.3%, rgba(237, 237, 237, 0.05) 66.6%, rgba(74, 74, 74, 0.05) 66.6%, rgba(74, 74, 74, 0.05) 99.9%), linear-gradient(14deg, rgba(3, 3, 3, 0.08) 0%, rgba(3, 3, 3, 0.08) 33.3%, rgba(156, 156, 156, 0.08) 33.3%, rgba(156, 156, 156, 0.08) 66.6%, rgba(199, 199, 199, 0.08) 66.6%, rgba(199, 199, 199, 0.08) 99.9%), linear-gradient(323deg, rgba(82, 82, 82, 0.06) 0%, rgba(82, 82, 82, 0.06) 33.3%, rgba(179, 179, 179, 0.06) 33.3%, rgba(179, 179, 179, 0.06) 66.6%, rgba(212, 212, 212, 0.06) 66.6%, rgba(212, 212, 212, 0.06) 99.9%), linear-gradient(32deg, rgba(70, 70, 70, 0.02) 0%, rgba(70, 70, 70, 0.02) 33.3%, rgba(166, 166, 166, 0.02) 33.3%, rgba(166, 166, 166, 0.02) 66.6%, rgba(53, 53, 53, 0.02) 66.6%, rgba(53, 53, 53, 0.02) 99.9%), linear-gradient(38deg, rgba(129, 129, 129, 0.09) 0%, rgba(129, 129, 129, 0.09) 33.3%, rgba(38, 38, 38, 0.09) 33.3%, rgba(38, 38, 38, 0.09) 66.6%, rgba(153, 153, 153, 0.09) 66.6%, rgba(153, 153, 153, 0.09) 99.9%), linear-gradient(63deg, rgba(51, 51, 51, 0.02) 0%, rgba(51, 51, 51, 0.02) 33.3%, rgba(12, 12, 12, 0.02) 33.3%, rgba(12, 12, 12, 0.02) 66.6%, rgba(158, 158, 158, 0.02) 66.6%, rgba(158, 158, 158, 0.02) 99.9%), linear-gradient(227deg, rgba(63, 63, 63, 0.03) 0%, rgba(63, 63, 63, 0.03) 33.3%, rgba(9, 9, 9, 0.03) 33.3%, rgba(9, 9, 9, 0.03) 66.6%, rgba(85, 85, 85, 0.03) 66.6%, rgba(85, 85, 85, 0.03) 99.9%), linear-gradient(103deg, rgba(247, 247, 247, 0.07) 0%, rgba(247, 247, 247, 0.07) 33.3%, rgba(93, 93, 93, 0.07) 33.3%, rgba(93, 93, 93, 0.07) 66.6%, rgba(208, 208, 208, 0.07) 66.6%, rgba(208, 208, 208, 0.07) 99%), linear-gradient(0deg, rgb(11, 145, 215), rgb(110, 252, 41));`,
        position: "absolute",
        display: "flex",
        overflow: "hidden"
      }}
    >
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            fontFamily: "system-ui"
          }
        }}
      />
      <div
        css={{
          background: "#0a1505",
          margin: "40px",
          display: "flex",
          flex: "1",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 15,
          padding: "2rem",
          boxShadow: `
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07)`
        }}
      >
        <h1 css={{ color: "#F0FAEB", height: "100%" }}>
          <Textfit
            style={{
              height: "80%",
              minHeight: "80%",
              maxHeight: "80%",
              maxWidth: "75%",
              lineHeight: 1.1
            }}
            max={200}
            min={24}
          >
                       {window.title}
          </Textfit>
        </h1>
        <div
          css={{
            color: "#F0FAEB",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24
          }}
        >
          <ul
            css={{
              listStyleType: "none",
              display: "flex",
              fontSize: 24,
              "& li": {
                marginRight: ".5rem",
                "&:not(:last-child):after": {
                  content: "'•'",
                  marginLeft: "0.5rem"
                }
              }
            }}
          >
            {window.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span>{window.author}</span>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("corgi"))
