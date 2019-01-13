import React from "react";

function Footer() {
  return (
    <footer className="uk-section uk-section-secondary uk-section-small uk-flex uk-flex-between uk-flex-middle footer">
      <p className="uk-margin-remove uk-text-small">Made with React ❤</p>
      <ul className="uk-list uk-margin-remove uk-text-small">
        <li>
          <a
            href="https://twitter.com/agneymenon"
            className="uk-link-muted"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow me on Twitter
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
