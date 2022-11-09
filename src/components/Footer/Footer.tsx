import { Link } from 'react-router-dom';
import Styles from './styles';

interface FooterTypes {
  children?: JSX.Element;
  href?: string;
}

const Footer = ({ children, href, ...rest }: FooterTypes): JSX.Element => {
  return (
    <Styles.Footer {...rest}>
      <Link
        to=""
        title="Go to web site creator GitHub"
        onClick={() => window.open('https://github.com/tassioFront', '_blank')}
        className="secondary"
        target="_blank"
      >
        Made with ❤️ by Tássio Jordão{' '}
        <i className="fa fa-external-link-square" aria-hidden="true"></i>
      </Link>
    </Styles.Footer>
  );
};

export default Footer;
