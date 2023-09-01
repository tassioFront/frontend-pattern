import { useTransition } from 'react';
import BtnLink from '../BtnLink/BtnLink';
import Styles from './styles';
import Spinner from '../Spinner/Spinner';

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
  const [isPending, startTransition] = useTransition();
  const isHidden = open;

  (window.document.querySelector('body') as HTMLBodyElement).style.overflowY =
    open ? 'hidden' : 'auto';

  return (
    <>
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
      <Styles.OverLay
        className={open ? 'isOpen' : ''}
        onClick={() => setOpen(false)}
      />
      <Styles.Burger
        aria-label="Toggle menu"
        aria-expanded={open}
        open={open}
        onClick={() => startTransition(() => setOpen(!open))}
        {...props}
      >
        {isPending ? (
          <Spinner type="brand" />
        ) : (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </Styles.Burger>
    </>
  );
};

export default Burger;
