import React from "react";
import Highlighter from "react-highlight-words";
import striptags from "striptags";
import Styles from "./HighlightText.scss";

const HighlightText: React.FC<{ searches: string[]; text: string; stripHtml?: boolean }> = ({ searches, text, stripHtml = false }) => {
    return (
        <Highlighter
            highlightClassName={Styles.Highlight}
            searchWords={searches}
            autoEscape={true}
            textToHighlight={stripHtml ? striptags(text) : text}
        />
    );
};

export default HighlightText;
