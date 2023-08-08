import { useEffect } from 'react';
import BtnLink from '../BtnLink/BtnLink';
import Styles from './styles';

interface MenuTypes {
  open: boolean;
  setOpen: (value: boolean) => void;
  actions: Array<{
    title: string;
    to: string;
    icon?: string;
    label: string;
  }>;
}

const Burger = ({ open, actions, setOpen, ...props }: MenuTypes) => {
  const isHidden = open;

  useEffect(() => {
    (window.document.querySelector('body') as HTMLBodyElement).style.overflowY =
      open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <div>
      <Styles.Menu open={open} aria-hidden={!isHidden} {...props}>
        {actions.map((action) => {
          return (
            <BtnLink
              key={action.label}
              title={action.title}
              to={action.to}
              className="secondary"
              onClick={() => setOpen(false)}
            >
              {action.label}{' '}
              {action.icon && (
                <i className={`fa fa-${action.icon}`} aria-hidden="true"></i>
              )}
            </BtnLink>
          );
        })}
      </Styles.Menu>
      <Styles.Burger
        aria-label="Toggle menu"
        aria-expanded={open}
        open={open}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span />
        <span />
        <span />
      </Styles.Burger>
    </div>
  );
};

export default Burger;
