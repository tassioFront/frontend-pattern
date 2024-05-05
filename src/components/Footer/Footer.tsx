import Styles from './styles';

interface FooterTypes {
  children?: JSX.Element;
  href?: string;
}

const Footer = ({ children, href, ...rest }: FooterTypes): JSX.Element => {
  return (
    <Styles.Footer {...rest}>
      <Styles.SocialMedia>
        <a
          href="https://github.com/tassioFront/frontend-pattern"
          title="Go to web site source-code"
          aria-label="Web site source-code"
          className="secondary"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/tassio-front-end/"
          title="Go to web site creator Linkedin"
          aria-label="Web site creator Linkedin"
          className="secondary"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa fa-linkedin"></i>
        </a>
      </Styles.SocialMedia>
      <Styles.Author>
        <p>Made with ❤️ by Tássio Jordão </p>
        <a
          href="https://ko-fi.com/tjordao"
          title="Go to web site creator GitHub"
          className="secondary"
          target="_blank"
          rel="noreferrer"
        >
          Buy me a coffee ☕
          <i className="fa fa-external-link-square" aria-hidden="true"></i>
        </a>
      </Styles.Author>
    </Styles.Footer>
  );
};

export default Footer;
